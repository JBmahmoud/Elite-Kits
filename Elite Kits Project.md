# Elite Kits Web Application

Elite Kits is a Flask, SQLite, and vanilla HTML/CSS/JavaScript football jersey e-commerce project. It started as a browser-storage storefront and has been upgraded into a backend-integrated application with persistent users, products, carts, wishlists, orders, reviews, coupons, messages, analytics, and admin tools.

The active runtime app is driven by `Backend.py`, `Elite Kits.db`, `app.js`, standalone HTML pages, and one shared stylesheet.

## Quick Start

Install Flask:

```bash
python -m pip install flask
```

Optional, only needed if importing legacy users with bcrypt password hashes from `elitekits.db`:

```bash
python -m pip install bcrypt
```

Run the application:

```bash
python Backend.py
```

Open:

```text
http://localhost:5000/
```

The root URL redirects to `Auth.html`, which is the sign-in/sign-up entry point.

Default seeded admin:

```text
Email:    admin@gmail.com
Password: Admin123@
```

## Project Structure

- `Backend.py` - single Flask backend, SQLite schema, migrations, auth, API routes, validation, CSV exports, static file serving, and startup seeding.
- `Elite Kits.db` - active SQLite database used at runtime.
- `Elite_Kits_Analysis.sql` - 15 SQL analysis queries for revenue, best sellers, stock, coupons, spin conversion, ratings, customer value, and monthly KPIs.
- `app.js` - frontend state bridge, product seed data, page controllers, API hydration, validation, modals, admin UI, account UI, cart/wishlist logic, payment flow, and spin wheel.
- `style.css` - global visual system and responsive styling.
- `images/` - jersey, logo, league, sign-in, and supporting assets.
- `*.html` pages - standalone static pages served from the project root.

## Runtime Architecture

- Backend: Flask in `Backend.py`
- Database: SQLite in `Elite Kits.db`
- Frontend: static HTML plus vanilla JavaScript in `app.js`
- Styling: one shared `style.css`
- Data source of truth: SQLite
- Browser storage role: temporary UI/navigation/cache state only
- Template engine: not used
- Alembic or external migrations: not used

`Backend.py` starts on `0.0.0.0:5000`, initializes or upgrades the database, seeds the default admin if needed, and serves static files from the project directory. The backend blocks direct HTTP access to `Backend.py`, `Elite Kits.db`, and `elitekits.db`.

## Pages

- `Auth.html` - sign in, sign up, guest browsing entry, protected redirect after login.
- `Home.html` - landing page, animated hero, trust signals, league navigation, features, collection entry points.
- `Premier League.html` - Premier League catalog page.
- `Laliga.html` - La Liga catalog page.
- `Serie A.html` - Serie A catalog page.
- `Bundesliga.html` - Bundesliga catalog page.
- `League 1.html` - Ligue 1 catalog page.
- `Rest Of The World.html` - international/rest-of-world catalog page.
- `Cart.html` - cart review, size selection, quantity controls, personalization, coupon totals, checkout handoff.
- `Wishlist.html` - saved jerseys with add-to-cart and clear actions.
- `Payment.html` - secure checkout form, card/address/phone validation, order creation, rating prompt.
- `Account.html` - profile, orders, wishlist, addresses, coupons, password, account deletion, ratings, product reviews.
- `Admin.html` - admin dashboard for orders, users, products, coupons, messages, applications, ratings, analytics, settings, and exports.
- `SpinWheel.html` - daily reward wheel and spin coupon history.
- `Size Guide.html` - smart size finder, adult/youth/goalkeeper charts, measuring guide.
- `Careers.html` - job listings, filters, and application entry points.
- `Contact Us.html` - contact form, application mode, CV upload, map, hours.
- `About Us.html` - brand story, mission, timeline, values, quality/support content.

## Storefront Features

- 330 seeded jersey products across six league groups.
- League pages support search, sort, stock filtering, team suggestions, stock-aware product cards, and back-to-top behavior.
- Product cards support wishlist toggling and add-to-cart actions.
- Product preview modal includes image, league, season, price, stock by size, size selection, personalization, and add-to-cart.
- Supported sizes: `XS`, `S`, `M`, `L`, `XL`, `2XL`, `3XL`.
- Jersey base price is `$25`.
- Delivery fee is `$5`.
- Personalization fee is `$5` per personalized cart line.
- Personalization validates name and number rules before checkout.
- Wishlist and cart are backend-backed for signed-in users and guest-cookie-backed for guests.
- Guest cart/wishlist rows merge into the user account after login.
- Legacy localStorage cart and wishlist data can be migrated once through `/api/migrate-local-storage`.

## Authentication And Sessions

- Users can sign up with name, email, birthdate, password, and confirmation.
- Sign-up enforces valid email, strong password, matching confirmation, and minimum age 15.
- Sign-in creates an HTTP-only session cookie backed by the `sessions` table.
- Logout revokes the backend session row and clears the session cookie.
- Guests receive an HTTP-only guest cookie for cart and wishlist persistence.
- Admin users are redirected to `Admin.html` after login.
- Normal users return to a protected redirect target when one exists, such as `Payment.html`.
- The frontend preserves the project rule that refresh/manual URL entry can revoke a session, while internal navigation keeps the session active.

## Security And Validation

- Unsafe authenticated requests use CSRF protection.
- CSRF token route: `GET /api/csrf-token`
- Required header: `X-CSRF-Token`
- Login and signup are exempt so a session can be created.
- Passwords are hashed with Werkzeug; legacy bcrypt hashes are supported if `bcrypt` is installed.
- Sensitive routes are protected with simple in-memory rate limiting.
- Rate-limited areas include login, signup, contact, checkout, spin, password change, account phone removal, account deletion, admin coupon changes, and product review submission.
- Form validation is enforced on both frontend and backend for critical workflows.
- Payment card numbers must be 16 digits and pass Luhn validation.
- Card expiry must use `MM/YY`, must not be expired, and cannot be more than 10 years in the future.
- CVV must be exactly 3 digits.
- Address fields validate city and road formats.
- Phone validation is country-based and server-authoritative.
- Account deletion is soft delete plus anonymization, not destructive deletion of historical orders.
- Admin actions are logged in `audit_logs`.

## Database

`Backend.py` owns the active schema in `ELITE_KITS_SCHEMA_SQL`.

Current schema version:

```text
11
```

Startup behavior:

- Creates `Elite Kits.db` if missing.
- Copies data from optional legacy `elitekits.db` only when creating a fresh active database.
- Leaves `elitekits.db` read-only and unused at runtime.
- Creates missing tables and indexes.
- Applies idempotent migrations in order.
- Stores schema version in `schema_meta`.
- Enables SQLite foreign keys per connection.
- Cleans stale unused spin coupons.
- Seeds default admin if missing.
- Seeds or merges frontend product rows.

Main tables:

- `users`
- `sessions`
- `guest_sessions`
- `products`
- `inventory`
- `cart_items`
- `guest_cart_items`
- `wishlist_items`
- `guest_wishlist_items`
- `orders`
- `order_items`
- `order_status_history`
- `ratings`
- `product_reviews`
- `saved_addresses`
- `coupons`
- `user_coupons`
- `spin_history`
- `messages`
- `admin_settings`
- `audit_logs`
- `schema_meta`

Migration highlights:

- Backend session and CSRF token support.
- Product reviews.
- Order status timeline/history.
- Saved addresses.
- Admin settings.
- Guest sessions, guest cart, and guest wishlist.
- Structured phone fields on users, orders, and saved addresses.
- Soft account deletion with `users.deleted_at`.
- Coupon source tracking for admin, spin, and admin-gifted coupons.
- Admin coupon assignment tracking with `user_coupons.source` and `assigned_by`.
- Foreign-key self-healing for older coupon table rebuilds.
- Coupon soft deletion with `coupons.deleted_at`.

## Backend API Surface

Utility and schema:

- `GET /api/health`
- `GET /api/schema`
- `GET /api/phone-countries`
- `POST /api/migrate-local-storage`

Auth and account:

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/auth/merge-guest`
- `GET /api/csrf-token`
- `GET /api/account/profile`
- `PATCH /api/account/profile`
- `PATCH /api/account/password`
- `DELETE /api/account/phone`
- `DELETE /api/account`

Products and inventory:

- `GET /api/products`
- `GET /api/products/<product_id>`
- `GET /api/leagues`
- `GET /api/inventory`
- `PATCH /api/inventory/<product_id>`
- `PATCH /api/products/<product_id>/active`

Cart:

- `GET /api/cart`
- `POST /api/cart/items`
- `PATCH /api/cart/items/<cart_item_id>`
- `DELETE /api/cart/items/<cart_item_id>`
- `DELETE /api/cart`
- `POST /api/cart/validate`
- `GET /api/cart/summary`

Wishlist:

- `GET /api/wishlist`
- `POST /api/wishlist/<product_id>`
- `DELETE /api/wishlist/<product_id>`
- `DELETE /api/wishlist`

Orders, receipts, and ratings:

- `POST /api/orders/checkout`
- `GET /api/orders`
- `GET /api/orders/<order_code>`
- `GET /api/orders/<order_code>/receipt`
- `PATCH /api/orders/<order_code>/status`
- `GET /api/ratings`
- `POST /api/orders/<order_code>/rating`
- `PATCH /api/orders/<order_code>/rating`

Product reviews:

- `GET /api/products/<product_id>/reviews`
- `POST /api/products/<product_id>/reviews`
- `PATCH /api/products/<product_id>/reviews/<review_id>`
- `DELETE /api/products/<product_id>/reviews/<review_id>`

Addresses:

- `GET /api/addresses`
- `POST /api/addresses`
- `PATCH /api/addresses/<addr_id>`
- `PATCH /api/addresses/<addr_id>/default`
- `DELETE /api/addresses/<addr_id>`
- `GET /api/addresses/default`

Coupons and spin:

- `GET /api/coupons`
- `POST /api/coupons/apply`
- `POST /api/spin`
- `GET /api/spin/status`

Messages and applications:

- `POST /api/messages`
- `GET /api/messages`
- `PATCH /api/messages/<msg_id>/read`
- `DELETE /api/messages/<msg_id>`
- `GET /api/messages/<msg_id>/cv`

Admin:

- `GET /api/admin/overview`
- `GET /api/admin/analytics`
- `GET /api/admin/users`
- `GET /api/admin/users/search`
- `GET /api/admin/products`
- `POST /api/admin/products`
- `PATCH /api/admin/products/<product_id>`
- `GET /api/admin/coupons`
- `POST /api/admin/coupons`
- `PATCH /api/admin/coupons/<coupon_id>`
- `DELETE /api/admin/coupons/<coupon_id>`
- `POST /api/admin/coupons/<coupon_id>/assign`
- `GET /api/admin/coupons/<coupon_id>/assignments`
- `GET /api/admin/export/<kind>.csv`
- `GET /api/admin/settings`
- `PATCH /api/admin/settings`

## Checkout And Orders

Checkout creates an order inside a database transaction.

Checkout responsibilities:

- Validates signed-in user.
- Validates cart lines, sizes, stock, personalization, payment fields, address, and phone.
- Applies coupon rules server-side.
- Calculates subtotal, customization fee, delivery fee, discount, and grand total.
- Decrements size-specific inventory.
- Inserts `orders` and `order_items`.
- Inserts initial order timeline events.
- Saves or deduplicates the checkout address.
- Mirrors accepted phone data to the user profile and default address.
- Clears the cart after successful order creation.
- Preserves order history for account and admin views.

Order statuses:

```text
Pending, Confirmed, Shipped, Delivered, Cancelled
```

Receipts are printable HTML from:

```text
GET /api/orders/<order_code>/receipt
```

Receipts include order code, user, date, items, size, personalization, subtotal, customization, delivery, discount, total, address, status, and contact phone.

## Phone System

Payment, account profile, and saved addresses use structured phone fields:

- `phone_country`
- `phone_country_code`
- `phone_dial_code`
- `phone_national`
- `phone_e164`

Supported phone countries are defined in `PHONE_COUNTRY_RULES` in `Backend.py` and mirrored by `PHONE_COUNTRIES` in `app.js`.

Supported groups:

- Arab countries.
- European Union countries.
- United States, Canada, Mexico, and Australia.

Phone validation rules:

- Country must be supported.
- Spaces, dashes, parentheses, and dots are normalized away.
- National number must contain digits only after normalization.
- Digit length must match the selected country's rule.
- Obvious fake values such as repeated digits and simple sequences are rejected.
- Backend validation is authoritative at checkout and profile/address save time.

Payment autofill order:

- User profile phone from `/api/auth/me`.
- Default saved address from `/api/addresses/default`.
- Default country Lebanon with an empty national number.

## Coupons And Daily Spin

Coupon types:

- Percent discount.
- Fixed amount discount.
- Free delivery.

Coupon sources:

- `admin` - created by admin.
- `spin` - minted by daily spin.
- `admin_gift` - assigned by an admin to a user through `user_coupons`.

Daily Spin behavior:

- One spin per signed-in user per local calendar day.
- Prizes include 10 percent off, 15 percent off, 5 percent off, free delivery, and try again.
- Spin coupon codes are minted uniquely, for example `ELITE10-AB12CD`.
- Unused spin coupons expire at the next local midnight.
- Used spin coupons remain preserved for historical orders.
- Stale unused spin coupons are expired during spin status checks, spin attempts, coupon apply, checkout, and startup cleanup.

Admin coupon behavior:

- Admin can create, edit, activate/deactivate, delete, export, and gift coupons.
- Unused coupons can be hard-deleted.
- Coupons referenced by historical orders or used coupon rows are soft-deleted instead.
- Soft-deleted coupons are hidden from the default admin list and cannot be used at checkout.
- `GET /api/admin/coupons?include_deleted=1` can include archived rows.

## Account Area

The account page is backend-driven and includes:

- Profile summary.
- Profile editing for name, birthdate, and structured phone.
- Password change with current-password verification.
- Profile phone removal.
- Soft account deletion after typing `DELETE`.
- Orders list with item details, totals, status, and timelines.
- Printable receipt links.
- Order experience rating.
- Product review modal for purchased products.
- Wishlist management.
- Saved address CRUD.
- Default saved address selection.
- Active coupon display from spin or admin gifts.

Product review rules:

- Only verified buyers can review a product.
- Rating must be 1 to 5.
- Comment is optional.
- One review per user/product/order item.
- Users can update or delete their own reviews.

Order experience ratings are separate from product reviews.

## Admin Dashboard

Admin features implemented in `Admin.html`, `app.js`, and backend routes:

- Overview KPIs for revenue, orders, users, ratings, jerseys, stock risk, and messages.
- Date range filters: `all`, `today`, `7d`, `30d`, `month`, and backend support for custom ranges.
- Orders table and detail modal.
- Order status updates and timeline history.
- Users table with role badges and order/spend summaries.
- Product management with create, edit, image path/URL, price, team/name, league, season, and active-status display.
- Size-specific stock management.
- Ratings table.
- Messages table with unread state, view modal, mark-as-read, and delete.
- Career applications with role, CV metadata, CV download, read handling, and delete.
- Coupon management tab with CRUD, active/archive behavior, gift modal, user search, and assignments.
- Analytics tab with deeper backend metrics.
- Settings tab backed by `admin_settings`.
- CSV exports.

Admin CSV export kinds:

- `orders`
- `products`
- `users`
- `messages`
- `ratings`
- `coupons`

Example:

```text
/api/admin/export/orders.csv
```

CSV responses stream from memory and do not create files on disk.

## Analytics And SQL Work

Runtime analytics routes:

- `GET /api/admin/overview?range=...`
- `GET /api/admin/analytics?range=...`

Implemented analytics include:

- Revenue summary.
- Order counts.
- Registered users.
- Average rating.
- Low-stock counts.
- Revenue trends.
- Order status mix.
- Revenue by league.
- Top-selling kits.
- Customer spend.
- Rating spread.
- Inventory risk.
- Average order value.
- Repeat customer rate.
- Most wishlisted products.
- Open carts.

`Elite_Kits_Analysis.sql` adds 15 standalone SQL analysis queries:

- Revenue summary.
- Top 10 best-selling teams.
- Revenue breakdown by league.
- Customer lifetime value.
- Geographic sales by Lebanese governorate.
- Size popularity.
- Custom printing uptake.
- Daily sales trend.
- Low-stock alert.
- Coupon effectiveness.
- Spin wheel conversion funnel.
- Average rating per league.
- Repeat vs one-time customers.
- Product popularity ranking within each league.
- Monthly KPI dashboard.

## Messages And Careers

Contact messages and career applications are stored in the shared `messages` table.

Contact form:

- Name, email, subject, and message validation.
- Backend rate limiting.
- Admin unread tracking.
- Admin view/read/delete workflow.

Career application flow:

- Careers page lists open roles and filters them by job type.
- Apply links open Contact page in application mode.
- Application mode stores `type='application'` and the selected role.
- CV uploads accept PDF and DOCX up to 5 MB.
- Backend stores CV filename, MIME type, size, and blob.
- Admin can download CVs through `/api/messages/<msg_id>/cv`.

## Size Guide

`Size Guide.html` includes:

- Smart size finder using chest, height, and fit preference.
- Adult jersey size chart.
- Youth jersey size chart.
- Goalkeeper kit size chart.
- Measurement instructions with diagram.
- Fit advice for choosing between sizes.

## Frontend Behavior

`app.js` hydrates frontend memory from backend APIs before page-specific initialization.

Key frontend modules:

- Backend bridge for API calls and CSRF headers.
- Local legacy migration bridge.
- Product normalization and stock syncing.
- Navbar cart/wishlist/account state.
- League filtering, sorting, suggestions, and product rendering.
- Product preview modal.
- Cart and wishlist rendering.
- Auth page logic and inline field errors.
- Payment validation, phone selector, coupon banner, and checkout submit.
- Spin wheel canvas, result modal, confetti, and daily reset.
- Account dashboard rendering.
- Admin dashboard rendering and enhancement tabs.
- Premium custom select UI.
- Toast messages.
- Floating quick actions and contextual helper widget.
- Escape/backdrop modal closing where supported.

## Browser Storage

SQLite is the source of truth. Browser storage is only used for temporary state and compatibility.

Current intended keys:

- `sessionStorage.elitekits_internal_navigation_v1` - tracks internal app navigation.
- `sessionStorage.elitekits_applied_coupon_v1` - temporary coupon state between spin, cart, and payment.
- `localStorage.elitekits_redirect_after_login` - protected page redirect target.
- `localStorage.elitekits_db_migrated_v1` - one-time legacy migration flag.
- Legacy `elitekits_cart_v1` and `elitekits_wishlist_v1` may be read once, migrated to the backend, then removed.

Obsolete localStorage business data is not authoritative.

## UI And Accessibility

Implemented UI work includes:

- Premium dark navy, royal blue, cyan, white, and light grey identity.
- Responsive layout for storefront, cart, payment, account, admin, and content pages.
- Skip links.
- Icon buttons and Font Awesome icons.
- Visible focus states.
- Toast notifications.
- Product and account empty states.
- Product stock chips and badges.
- Custom dropdowns for payment phone country and admin filters.
- Inline validation messages on Auth and Payment fields.
- Modals with close buttons and Escape/backdrop support where implemented.
- Account tabs for desktop and mobile.
- Admin sidebar and mobile overlay.
- Receipt print styling.
- CV upload UI.
- Daily spin canvas UI and result states.

Note: Font Awesome and Google Fonts are loaded from CDNs in the HTML files.

## Known Limitations

- This is a local/exam-style Flask app, not a production deployment.
- The rate limiter is in-memory and resets when the Flask process restarts.
- There is no real payment gateway; card validation is simulated.
- Receipts are printable HTML, not generated PDFs.
- CSV exports stream responses but do not persist generated export files.
- Product creation starts with zero stock unless stock is added per size.
- Some frontend assets and fonts rely on external CDN access.
- There is no automated test suite in the repository.
