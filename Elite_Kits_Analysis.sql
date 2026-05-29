-- =====================================================================
-- ELITE KITS - DATABASE ANALYSIS QUERIES
-- 15 analytical queries demonstrating SQL skills across the full schema
-- Run each query separately in DB Browser for SQLite
-- =====================================================================


-- ---------------------------------------------------------------------
-- Q1.  REVENUE SUMMARY (the executive one-liner)
-- ---------------------------------------------------------------------
-- A single dashboard row: how many orders, how much revenue, average
-- order value, total discounts given, and effective discount rate.
SELECT
    COUNT(*)                                       AS total_orders,
    ROUND(SUM(grand_total), 2)                     AS total_revenue,
    ROUND(AVG(grand_total), 2)                     AS avg_order_value,
    ROUND(SUM(discount_total), 2)                  AS total_discounts_given,
    ROUND(SUM(discount_total) * 100.0
          / NULLIF(SUM(subtotal + print_total + delivery_fee), 0), 2)
                                                   AS effective_discount_pct
FROM orders;


-- ---------------------------------------------------------------------
-- Q2.  TOP 10 BEST-SELLING TEAMS  (units + revenue)
-- ---------------------------------------------------------------------
SELECT
    team,
    league,
    SUM(qty)                          AS units_sold,
    COUNT(DISTINCT order_id)          AS orders_appeared_in,
    ROUND(SUM(line_total), 2)         AS revenue
FROM order_items
GROUP BY team, league
ORDER BY units_sold DESC, revenue DESC
LIMIT 10;


-- ---------------------------------------------------------------------
-- Q3.  REVENUE BREAKDOWN BY LEAGUE  (with % of total)
-- ---------------------------------------------------------------------
-- Uses a window function over the full table to compute share of revenue
-- per league. Shows how leagues compare in popularity.
SELECT
    league,
    SUM(qty)                                                AS units_sold,
    ROUND(SUM(line_total), 2)                               AS revenue,
    ROUND(SUM(line_total) * 100.0
          / SUM(SUM(line_total)) OVER (), 2)                AS pct_of_total_revenue
FROM order_items
GROUP BY league
ORDER BY revenue DESC;


-- ---------------------------------------------------------------------
-- Q4.  CUSTOMER LIFETIME VALUE  (top spenders)
-- ---------------------------------------------------------------------
-- Joins users <-> orders to rank real spenders, including the date of
-- their last order so you can see who's active vs dormant.
SELECT
    u.id                                       AS user_id,
    u.name,
    u.email,
    COUNT(o.id)                                AS orders_placed,
    ROUND(SUM(o.grand_total), 2)               AS lifetime_spend,
    ROUND(AVG(o.grand_total), 2)               AS avg_order_value,
    MAX(o.created_at)                          AS last_order_at
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE u.is_deleted = 0
GROUP BY u.id, u.name, u.email
ORDER BY lifetime_spend DESC
LIMIT 10;


-- ---------------------------------------------------------------------
-- Q5.  GEOGRAPHIC SALES DISTRIBUTION  (Lebanon governorates)
-- ---------------------------------------------------------------------
SELECT
    state                              AS governorate,
    COUNT(*)                           AS orders,
    ROUND(SUM(grand_total), 2)         AS revenue,
    ROUND(AVG(grand_total), 2)         AS avg_order_value
FROM orders
WHERE state IS NOT NULL AND state <> ''
GROUP BY state
ORDER BY revenue DESC;


-- ---------------------------------------------------------------------
-- Q6.  SIZE POPULARITY  (which sizes actually sell?)
-- ---------------------------------------------------------------------
-- Useful for stocking decisions. The CASE ORDER BY keeps sizes in
-- proper order (XS, S, M, L, XL, 2XL, 3XL) instead of alphabetical.
SELECT
    size,
    SUM(qty)                                      AS units_sold,
    COUNT(DISTINCT order_id)                      AS orders,
    ROUND(SUM(qty) * 100.0
          / (SELECT SUM(qty) FROM order_items), 2) AS pct_of_units
FROM order_items
GROUP BY size
ORDER BY CASE size
    WHEN 'XS'  THEN 1
    WHEN 'S'   THEN 2
    WHEN 'M'   THEN 3
    WHEN 'L'   THEN 4
    WHEN 'XL'  THEN 5
    WHEN '2XL' THEN 6
    WHEN '3XL' THEN 7
    ELSE 99 END;


-- ---------------------------------------------------------------------
-- Q7.  CUSTOM PRINTING UPTAKE  (do customers pay for personalization?)
-- ---------------------------------------------------------------------
SELECT
    CASE print_enabled WHEN 1 THEN 'Personalized' ELSE 'Plain' END
                                                    AS jersey_type,
    SUM(qty)                                        AS units,
    ROUND(SUM(line_total), 2)                       AS revenue,
    ROUND(SUM(qty) * 100.0
          / (SELECT SUM(qty) FROM order_items), 2)  AS pct_of_units
FROM order_items
GROUP BY print_enabled
ORDER BY units DESC;


-- ---------------------------------------------------------------------
-- Q8.  DAILY SALES TREND  (last 30 days of activity)
-- ---------------------------------------------------------------------
SELECT
    DATE(created_at)            AS order_date,
    COUNT(*)                    AS orders,
    SUM(
        (SELECT SUM(qty) FROM order_items WHERE order_id = orders.id)
    )                           AS items_sold,
    ROUND(SUM(grand_total), 2)  AS daily_revenue
FROM orders
WHERE DATE(created_at) >= DATE('now', '-30 days')
GROUP BY DATE(created_at)
ORDER BY order_date DESC;


-- ---------------------------------------------------------------------
-- Q9.  LOW STOCK ALERT  (products with <= 5 units left in any size)
-- ---------------------------------------------------------------------
-- Joins inventory with products to give human-readable names. Critical
-- for an admin dashboard - shows what to reorder.
SELECT
    p.team,
    p.league,
    p.product_name,
    i.size,
    i.quantity                            AS units_left,
    CASE
        WHEN i.quantity = 0 THEN 'OUT OF STOCK'
        WHEN i.quantity <= 2 THEN 'CRITICAL'
        ELSE 'LOW'
    END                                   AS alert_level
FROM inventory i
JOIN products p ON p.id = i.product_id
WHERE i.quantity <= 5
  AND p.is_active = 1
ORDER BY i.quantity ASC, p.team
LIMIT 25;


-- ---------------------------------------------------------------------
-- Q10.  COUPON & DISCOUNT EFFECTIVENESS
-- ---------------------------------------------------------------------
-- Compares orders that used a coupon vs orders that did not.
-- Does the coupon program actually drive bigger baskets?
SELECT
    CASE
        WHEN coupon_code IS NULL OR coupon_code = '' THEN 'No coupon'
        ELSE 'Coupon used'
    END                                AS segment,
    COUNT(*)                           AS orders,
    ROUND(AVG(subtotal), 2)            AS avg_subtotal,
    ROUND(AVG(grand_total), 2)         AS avg_grand_total,
    ROUND(AVG(discount_total), 2)      AS avg_discount,
    ROUND(SUM(grand_total), 2)         AS total_revenue
FROM orders
GROUP BY segment;


-- ---------------------------------------------------------------------
-- Q11.  SPIN WHEEL CONVERSION FUNNEL
-- ---------------------------------------------------------------------
-- Of the coupons handed out by the spin wheel, how many were claimed,
-- how many were actually redeemed at checkout, and what % redeem?
-- LEFT JOIN keeps unused coupons in the count.
SELECT
    sh.prize_label,
    COUNT(*)                                       AS prizes_awarded,
    SUM(CASE WHEN uc.used = 1 THEN 1 ELSE 0 END)   AS prizes_redeemed,
    ROUND(
        SUM(CASE WHEN uc.used = 1 THEN 1 ELSE 0 END) * 100.0
        / COUNT(*), 1
    )                                              AS redemption_pct
FROM spin_history sh
LEFT JOIN user_coupons uc ON uc.coupon_id = sh.coupon_id
WHERE sh.prize_label IS NOT NULL
GROUP BY LOWER(TRIM(sh.prize_label))
ORDER BY prizes_awarded DESC;


-- ---------------------------------------------------------------------
-- Q12.  AVERAGE RATING PER LEAGUE  (cross-table analysis)
-- ---------------------------------------------------------------------
-- Links ratings -> orders -> order_items -> the league of items in the
-- order to find which leagues' customers are happiest. Uses DISTINCT
-- inside the join so an order with 3 items doesn't multiply the rating.
SELECT
    oi.league,
    COUNT(DISTINCT r.id)              AS ratings_received,
    ROUND(AVG(r.rating), 2)           AS avg_rating,
    MIN(r.rating)                     AS worst,
    MAX(r.rating)                     AS best
FROM ratings r
JOIN orders o      ON o.id = r.order_id
JOIN order_items oi ON oi.order_id = o.id
GROUP BY oi.league
ORDER BY avg_rating DESC;


-- ---------------------------------------------------------------------
-- Q13.  REPEAT vs ONE-TIME CUSTOMERS  (cohort split)
-- ---------------------------------------------------------------------
-- Classifies every paying customer and reports volume + revenue.
-- Shows what fraction of revenue comes from loyal customers.
WITH customer_stats AS (
    SELECT
        user_id,
        COUNT(*)         AS order_count,
        SUM(grand_total) AS total_spent
    FROM orders
    WHERE user_id IS NOT NULL
    GROUP BY user_id
)
SELECT
    CASE
        WHEN order_count = 1 THEN '1. One-time'
        WHEN order_count BETWEEN 2 AND 3 THEN '2. Repeat (2-3)'
        ELSE '3. Loyal (4+)'
    END                                AS segment,
    COUNT(*)                           AS customers,
    SUM(order_count)                   AS total_orders,
    ROUND(SUM(total_spent), 2)         AS revenue_from_segment,
    ROUND(AVG(total_spent), 2)         AS avg_lifetime_value
FROM customer_stats
GROUP BY segment
ORDER BY segment;


-- ---------------------------------------------------------------------
-- Q14.  PRODUCT POPULARITY RANKING WITHIN EACH LEAGUE  (window function)
-- ---------------------------------------------------------------------
-- DENSE_RANK() ranks every team by units sold inside its own league.
-- Returns the top 3 teams per league - perfect for a "league leaders"
-- widget on the admin dashboard.
WITH team_sales AS (
    SELECT
        league,
        team,
        SUM(qty)              AS units,
        SUM(line_total)       AS revenue,
        DENSE_RANK() OVER (
            PARTITION BY league
            ORDER BY SUM(qty) DESC
        )                     AS rank_in_league
    FROM order_items
    GROUP BY league, team
)
SELECT
    league,
    rank_in_league,
    team,
    units,
    ROUND(revenue, 2)         AS revenue
FROM team_sales
WHERE rank_in_league <= 3
ORDER BY league, rank_in_league;


-- ---------------------------------------------------------------------
-- Q15.  MONTHLY KPI DASHBOARD  (everything in one view)
-- ---------------------------------------------------------------------
-- One row per month with: new signups, orders, revenue, units, unique
-- customers, average order value, and the rolling running total of
-- revenue. This is the kind of query a real BI dashboard runs.
WITH monthly_orders AS (
    SELECT
        STRFTIME('%Y-%m', o.created_at) AS month,
        COUNT(*)                        AS orders,
        SUM(o.grand_total)              AS revenue,
        COUNT(DISTINCT o.user_id)       AS unique_buyers,
        (SELECT SUM(qty)
           FROM order_items oi
           WHERE STRFTIME('%Y-%m', oi.created_at)
                 = STRFTIME('%Y-%m', o.created_at))  AS units
    FROM orders o
    GROUP BY STRFTIME('%Y-%m', o.created_at)
),
monthly_signups AS (
    SELECT
        STRFTIME('%Y-%m', created_at) AS month,
        COUNT(*)                      AS new_signups
    FROM users
    WHERE is_deleted = 0
    GROUP BY STRFTIME('%Y-%m', created_at)
)
SELECT
    COALESCE(mo.month, ms.month)               AS month,
    COALESCE(ms.new_signups, 0)                AS new_signups,
    COALESCE(mo.orders, 0)                     AS orders,
    COALESCE(mo.unique_buyers, 0)              AS unique_buyers,
    COALESCE(mo.units, 0)                      AS units_sold,
    ROUND(COALESCE(mo.revenue, 0), 2)          AS revenue,
    ROUND(COALESCE(mo.revenue, 0)
          / NULLIF(mo.orders, 0), 2)           AS avg_order_value,
    ROUND(SUM(COALESCE(mo.revenue, 0)) OVER (
        ORDER BY COALESCE(mo.month, ms.month)
    ), 2)                                      AS revenue_running_total
FROM monthly_orders mo
FULL OUTER JOIN monthly_signups ms ON ms.month = mo.month
ORDER BY month;
