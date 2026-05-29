"""
Backend.py - Elite Kits Web Application Backend
================================================

Single-file Flask + SQLite backend that converts the previously localStorage-only
Elite Kits frontend into a real database-backed application.

Run:
    pip install flask
    python Backend.py

Then open:
    http://localhost:5000/Home.html

Default admin login (seeded if missing):
    email:    admin@gmail.com
    password: Admin123@
"""

from __future__ import annotations

import base64
import csv
import io
import json
import os
import re
import secrets
import sqlite3
import sys
import time
import uuid
from datetime import datetime, timedelta, date, timezone
from html import escape as html_escape

def utcnow_naive():
    """Return current UTC time as a naive datetime (no tzinfo).

    Python 3.12 deprecates datetime.utcnow(); use datetime.now(UTC).replace(tzinfo=None)
    to keep the same semantics while silencing the warning.
    """
    return datetime.now(timezone.utc).replace(tzinfo=None)
from functools import wraps
from pathlib import Path

try:
    from flask import (
        Flask,
        request,
        jsonify,
        send_from_directory,
        make_response,
        abort,
        g,
        redirect,
    )
    from werkzeug.security import generate_password_hash, check_password_hash
except ImportError:
    print("Flask is not installed. Please run: pip install flask")
    sys.exit(1)

# Optional bcrypt support for password hashes copied from the original elitekits.db
try:
    import bcrypt as _bcrypt
    HAS_BCRYPT = True
except ImportError:
    _bcrypt = None
    HAS_BCRYPT = False


def verify_password(hash_str, password):
    """
    Verify a password against a stored hash.

    Supports two formats:
      - werkzeug ("pbkdf2:..." / "scrypt:..." / "method$salt$hash")
      - bcrypt   ("$2a$..", "$2b$..", "$2y$..") — used by the legacy elitekits.db rows
    """
    if not hash_str or not password:
        return False
    s = str(hash_str)
    # bcrypt detection
    if s.startswith(("$2a$", "$2b$", "$2y$")):
        if not HAS_BCRYPT:
            return False
        try:
            return _bcrypt.checkpw(password.encode("utf-8"), s.encode("utf-8"))
        except Exception:
            return False
    # werkzeug format
    try:
        return check_password_hash(s, password)
    except Exception:
        return False


# =====================================================================
# CONFIG
# =====================================================================

APP_ROOT = Path(__file__).resolve().parent
# Active runtime database. This is the ONLY database the app reads from or
# writes to at runtime. Created/upgraded on startup via ELITE_KITS_SCHEMA_SQL.
NEW_DB_PATH = APP_ROOT / "Elite Kits.db"
# Legacy database (reverse-engineered original). Optional. If present on first
# startup of a fresh Elite Kits.db, rows are copied READ-ONLY into the new DB
# and the file is left untouched. Once the upgrade is complete this file can
# be removed; runtime never depends on it.
ORIGINAL_DB_PATH = APP_ROOT / "elitekits.db"

# Cookie names
SESSION_COOKIE = "ek_session"
GUEST_COOKIE = "ek_guest"
COOKIE_MAX_AGE = 60 * 60 * 24 * 30  # 30 days
CSRF_HEADER = "X-CSRF-Token"
CURRENT_SCHEMA_VERSION = 11
RATE_LIMITS = {}

ADMIN_EMAIL = "admin@gmail.com"
ADMIN_PASSWORD_DEFAULT = "Admin123@"

VALID_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
VALID_ORDER_STATUSES = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"]

# Canonical league mapping. Maps any seen variant (lowercased) to (key, display_name).
LEAGUE_KEYS = {
    "premier league": ("premier", "Premier League"),
    "premier":        ("premier", "Premier League"),
    "laliga":         ("laliga", "La Liga"),
    "la liga":        ("laliga", "La Liga"),
    "serie a":        ("seriea", "Serie A"),
    "seriea":         ("seriea", "Serie A"),
    "bundesliga":     ("bundesliga", "Bundesliga"),
    "ligue 1":        ("ligue1", "Ligue 1"),
    "league 1":       ("ligue1", "Ligue 1"),
    "ligue1":         ("ligue1", "Ligue 1"),
    "rest of the world": ("rest", "Rest of the World"),
    "rest of world":  ("rest", "Rest of the World"),
    "rest":           ("rest", "Rest of the World"),
}

LEAGUE_LOGOS = {
    "premier":    "images/premier.webp",
    "laliga":     "images/laliga.png",
    "seriea":     "images/seriea.png",
    "bundesliga": "images/bundesligalogo.png",
    "ligue1":     "images/ligue 1 logo.png",
    "rest":       "images/restoftheworl.png",
}

LEAGUE_PAGE_FILES = {
    "premier":    "Premier League.html",
    "laliga":     "Laliga.html",
    "seriea":     "Serie A.html",
    "bundesliga": "Bundesliga.html",
    "ligue1":     "League 1.html",
    "rest":       "Rest Of The World.html",
}

DELIVERY_FEE = 5.0
CUSTOMIZATION_FEE = 5.0  # per personalized line


# =====================================================================
# ORIGINAL DATABASE SCHEMA  --  DOCUMENTATION ONLY, NOT EXECUTED
# =====================================================================
# Reverse-engineered from the legacy elitekits.db. Kept here so a developer
# can see the original shape without opening the legacy file.
#
# WARNING: This SQL is NEVER executed by the running app. The active
# runtime schema is ELITE_KITS_SCHEMA_SQL (below). Do not call
# `con.executescript(ORIGINAL_SCHEMA_SQL)` anywhere -- it would conflict
# with the upgraded shape used by every API in this file.

ORIGINAL_SCHEMA_SQL = """
-- Reverse-engineered original schema (elitekits.db) -- documentation only.

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  birthdate TEXT,
  is_admin INTEGER NOT NULL DEFAULT 0,
  is_deleted INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  auth_provider TEXT NOT NULL DEFAULT 'local',
  google_sub TEXT,
  email_verified INTEGER NOT NULL DEFAULT 0,
  email_confirmation_sent_at TEXT,
  last_login_at TEXT
);
CREATE UNIQUE INDEX idx_users_google_sub ON users(google_sub);

CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team TEXT NOT NULL,
  league TEXT NOT NULL,
  product_name TEXT NOT NULL,
  image_url TEXT,
  base_price REAL NOT NULL DEFAULT 25.00,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE UNIQUE INDEX idx_products_team_league ON products(team, league);

CREATE TABLE inventory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  size TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 14 CHECK (quantity >= 0),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(product_id, size),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
CREATE INDEX idx_inventory_product_size ON inventory(product_id, size);

CREATE TABLE cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  size TEXT,
  qty INTEGER NOT NULL DEFAULT 1 CHECK (qty > 0),
  print_enabled INTEGER NOT NULL DEFAULT 0,
  print_text TEXT,
  print_number_value TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, product_id, size, print_enabled, print_text, print_number_value),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
CREATE INDEX idx_cart_user_id ON cart_items(user_id);

CREATE TABLE wishlist_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
CREATE INDEX idx_wishlist_user_id ON wishlist_items(user_id);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_code TEXT NOT NULL UNIQUE,
  user_id INTEGER NOT NULL,
  user_name TEXT NOT NULL,
  email TEXT NOT NULL,
  state TEXT,
  city TEXT,
  road TEXT,
  subtotal REAL NOT NULL DEFAULT 0,
  print_total REAL NOT NULL DEFAULT 0,
  delivery_fee REAL NOT NULL DEFAULT 4,
  discount_total REAL NOT NULL DEFAULT 0,
  grand_total REAL NOT NULL DEFAULT 0,
  rating INTEGER,
  status TEXT NOT NULL DEFAULT 'Confirmed',
  coupon_code TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);
CREATE INDEX idx_orders_user_id ON orders(user_id);

CREATE TABLE order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  team TEXT NOT NULL,
  league TEXT NOT NULL,
  qty INTEGER NOT NULL DEFAULT 1 CHECK (qty > 0),
  size TEXT,
  unit_price REAL NOT NULL DEFAULT 25,
  print_enabled INTEGER NOT NULL DEFAULT 0,
  print_text TEXT,
  print_number TEXT,
  line_total REAL NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);

CREATE TABLE coupons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('percent', 'delivery')),
  value REAL NOT NULL DEFAULT 0,
  expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE user_coupons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  coupon_id INTEGER NOT NULL,
  code TEXT UNIQUE,
  expires_at TEXT,
  prize_label TEXT,
  used INTEGER NOT NULL DEFAULT 0,
  assigned_at TEXT NOT NULL DEFAULT (datetime('now')),
  used_at TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (coupon_id) REFERENCES coupons(id) ON DELETE CASCADE
);
CREATE INDEX idx_user_coupons_user_id ON user_coupons(user_id);
CREATE UNIQUE INDEX idx_user_coupons_code ON user_coupons(code);

CREATE TABLE spin_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  spin_date TEXT NOT NULL,
  prize_id TEXT NOT NULL,
  prize_label TEXT NOT NULL,
  emoji TEXT,
  coupon_id INTEGER,
  coupon_code TEXT,
  expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, spin_date),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (coupon_id) REFERENCES coupons(id) ON DELETE SET NULL
);
CREATE INDEX idx_spin_history_user_id ON spin_history(user_id);

CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'contact' CHECK (type IN ('contact', 'application')),
  role TEXT,
  cv_file TEXT,
  is_read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_messages_is_read ON messages(is_read);
"""


# =====================================================================
# ACTIVE RUNTIME SCHEMA  (Elite Kits.db)  --  THIS IS WHAT EXECUTES
# =====================================================================
# `_ensure_schema()` runs this SQL on every startup against Elite Kits.db
# (IF NOT EXISTS clauses make it idempotent). All API routes target the
# tables/columns declared below.
#
# Preserves every original table + adds the missing tables required by the
# current website behavior (sessions, ratings, addresses, admin settings,
# audit logs, guest sessions/cart/wishlist, product_code for app.js IDs).
# Uses real foreign keys, indexes, and UNIQUE constraints so it browses
# cleanly in DB Browser for SQLite.

ELITE_KITS_SCHEMA_SQL = """
-- USERS ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  birthdate TEXT,
  phone TEXT,
  deleted_at TEXT,
  is_admin INTEGER NOT NULL DEFAULT 0,
  is_deleted INTEGER NOT NULL DEFAULT 0,
  auth_provider TEXT NOT NULL DEFAULT 'local',
  google_sub TEXT,
  email_verified INTEGER NOT NULL DEFAULT 0,
  email_confirmation_sent_at TEXT,
  last_login_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_google_sub ON users(google_sub) WHERE google_sub IS NOT NULL;

-- SCHEMA VERSIONING ------------------------------------------------------
CREATE TABLE IF NOT EXISTS schema_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- PRODUCTS ---------------------------------------------------------------
-- product_code holds the original app.js string ID (e.g. "premier-001-arsenal-home")
-- so the frontend keeps working unchanged.
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_code TEXT UNIQUE,
  team TEXT NOT NULL,
  league TEXT NOT NULL,
  league_key TEXT NOT NULL,
  product_name TEXT NOT NULL,
  image_url TEXT,
  base_price REAL NOT NULL DEFAULT 25.00,
  season TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  sales_rank INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_products_team_league ON products(team, league);
CREATE INDEX IF NOT EXISTS idx_products_league_key ON products(league_key);

-- INVENTORY (stock per product per size) ---------------------------------
CREATE TABLE IF NOT EXISTS inventory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  size TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 14 CHECK (quantity >= 0),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(product_id, size),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_inventory_product_size ON inventory(product_id, size);

-- CART -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  size TEXT,
  qty INTEGER NOT NULL DEFAULT 1 CHECK (qty > 0),
  print_enabled INTEGER NOT NULL DEFAULT 0,
  print_text TEXT,
  print_number_value TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, product_id, size, print_enabled, print_text, print_number_value),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart_items(user_id);

-- WISHLIST ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS wishlist_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist_items(user_id);

-- ORDERS -----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_code TEXT NOT NULL UNIQUE,
  user_id INTEGER NOT NULL,
  user_name TEXT NOT NULL,
  email TEXT NOT NULL,
  state TEXT,
  city TEXT,
  road TEXT,
  subtotal REAL NOT NULL DEFAULT 0,
  print_total REAL NOT NULL DEFAULT 0,
  delivery_fee REAL NOT NULL DEFAULT 5,
  discount_total REAL NOT NULL DEFAULT 0,
  grand_total REAL NOT NULL DEFAULT 0,
  rating INTEGER,
  status TEXT NOT NULL DEFAULT 'Confirmed' CHECK (status IN ('Pending','Confirmed','Shipped','Delivered','Cancelled')),
  coupon_code TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  team TEXT NOT NULL,
  league TEXT NOT NULL,
  qty INTEGER NOT NULL DEFAULT 1 CHECK (qty > 0),
  size TEXT,
  unit_price REAL NOT NULL DEFAULT 25,
  print_enabled INTEGER NOT NULL DEFAULT 0,
  print_text TEXT,
  print_number TEXT,
  line_total REAL NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- COUPONS ----------------------------------------------------------------
-- type values:
--   'percent'  -> percent off subtotal+print_total (value 0-100)
--   'fixed'    -> flat dollar discount off subtotal+print_total
--   'delivery' -> waives the delivery fee (also called "free_delivery" in the admin UI)
-- is_active=0 is a soft-delete flag used for historical coupons that should
-- remain on existing orders but cannot be applied to new ones.
CREATE TABLE IF NOT EXISTS coupons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('percent', 'fixed', 'delivery')),
  value REAL NOT NULL DEFAULT 0,
  expires_at TEXT,
  source TEXT NOT NULL DEFAULT 'admin',
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  deleted_at TEXT
);

CREATE TABLE IF NOT EXISTS user_coupons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  coupon_id INTEGER NOT NULL,
  code TEXT UNIQUE,
  expires_at TEXT,
  prize_label TEXT,
  used INTEGER NOT NULL DEFAULT 0,
  assigned_at TEXT NOT NULL DEFAULT (datetime('now')),
  used_at TEXT,
  source TEXT NOT NULL DEFAULT 'spin',
  assigned_by INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (coupon_id) REFERENCES coupons(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_user_coupons_user_id ON user_coupons(user_id);
-- NOTE: not unique. Spin-issued codes are globally unique by construction;
-- admin gifts intentionally share the admin coupon code across recipients.
CREATE INDEX IF NOT EXISTS idx_user_coupons_code ON user_coupons(code);

-- SPIN HISTORY -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS spin_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  spin_date TEXT NOT NULL,
  prize_id TEXT NOT NULL,
  prize_label TEXT NOT NULL,
  emoji TEXT,
  coupon_id INTEGER,
  coupon_code TEXT,
  expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, spin_date),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (coupon_id) REFERENCES coupons(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_spin_history_user_id ON spin_history(user_id);

-- MESSAGES / CAREER APPLICATIONS ----------------------------------------
-- Career application CV is stored as a BLOB inside SQLite (no uploads folder).
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'contact' CHECK (type IN ('contact', 'application')),
  role TEXT,
  cv_file TEXT,
  cv_mime TEXT,
  cv_size INTEGER,
  cv_blob BLOB,
  is_read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);
CREATE INDEX IF NOT EXISTS idx_messages_type ON messages(type);

-- ========================================================================
-- NEW TABLES added for proper backend support
-- ========================================================================

-- SESSIONS (backend session tokens; replaces localStorage session) -------
CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT NOT NULL UNIQUE,
  user_id INTEGER NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user','admin')),
  csrf_token TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL,
  revoked INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);

-- RATINGS (one per order per user) --------------------------------------
CREATE TABLE IF NOT EXISTS ratings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(order_id, user_id),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id)  REFERENCES users(id)  ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_ratings_user_id ON ratings(user_id);

-- PRODUCT REVIEWS (verified purchasers only) ----------------------------
CREATE TABLE IF NOT EXISTS product_reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  order_id INTEGER NOT NULL,
  order_item_id INTEGER NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, product_id, order_item_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_product_reviews_product ON product_reviews(product_id);

-- ORDER STATUS HISTORY --------------------------------------------------
CREATE TABLE IF NOT EXISTS order_status_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Pending','Confirmed','Shipped','Delivered','Cancelled')),
  note TEXT,
  created_by INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_order_status_history_order ON order_status_history(order_id, created_at);

-- SAVED ADDRESSES --------------------------------------------------------
CREATE TABLE IF NOT EXISTS saved_addresses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  state TEXT NOT NULL,
  city TEXT NOT NULL,
  road TEXT NOT NULL,
  is_default INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, state, city, road),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_saved_addresses_user_id ON saved_addresses(user_id);

-- ADMIN SETTINGS (key/JSON value) ---------------------------------------
CREATE TABLE IF NOT EXISTS admin_settings (
  key TEXT PRIMARY KEY,
  value_json TEXT NOT NULL DEFAULT '{}',
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- AUDIT LOGS ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  actor_role TEXT,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  details_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);

-- GUEST SESSIONS / GUEST CART / GUEST WISHLIST --------------------------
CREATE TABLE IF NOT EXISTS guest_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_guest_sessions_token ON guest_sessions(token);

CREATE TABLE IF NOT EXISTS guest_cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guest_token TEXT NOT NULL,
  product_id INTEGER NOT NULL,
  size TEXT,
  qty INTEGER NOT NULL DEFAULT 1 CHECK (qty > 0),
  print_enabled INTEGER NOT NULL DEFAULT 0,
  print_text TEXT,
  print_number_value TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(guest_token, product_id, size, print_enabled, print_text, print_number_value),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_guest_cart_token ON guest_cart_items(guest_token);

CREATE TABLE IF NOT EXISTS guest_wishlist_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guest_token TEXT NOT NULL,
  product_id INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(guest_token, product_id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_guest_wishlist_token ON guest_wishlist_items(guest_token);
"""


# =====================================================================
# FRONTEND PRODUCT CATALOG (mirrors PRODUCT_ROWS in app.js)
# =====================================================================
# Each row: (product_code, team_with_variant, base_team, league_display, league_key,
#            season, base_price, image_url, stock_seed, display_order, sales_rank)
# This is the authoritative source for products if a row is missing in
# elitekits.db. Stock_seed is only used when the product is *new* (no rows
# exist in inventory yet); on existing inventory it is ignored.
#
# We embed this list inside Backend.py rather than reading app.js, so the
# database can be created cleanly without parsing JavaScript.

def load_frontend_product_rows():
    """Returns the canonical list of products used by app.js.

    Read straight from app.js so the Python and JS catalogs cannot drift.
    Falls back to an empty list if app.js is not present.
    """
    path = APP_ROOT / "app.js"
    if not path.exists():
        return []
    try:
        src = path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return []

    # Find the PRODUCT_ROWS array
    m = re.search(r"const\s+PRODUCT_ROWS\s*=\s*\[(.*?)\];", src, re.DOTALL)
    if not m:
        return []
    body = m.group(1)

    rows = []
    # Each row is a [..]-bracketed list. Use a non-greedy regex per line/row.
    for row_match in re.finditer(r"\[([^\[\]]+)\]", body):
        items_raw = row_match.group(1).strip()
        # Split on commas that are not inside quotes.
        parts = []
        cur = ""
        in_str = False
        quote_char = ""
        for ch in items_raw:
            if in_str:
                cur += ch
                if ch == quote_char:
                    in_str = False
            else:
                if ch in ('"', "'"):
                    in_str = True
                    quote_char = ch
                    cur += ch
                elif ch == ",":
                    parts.append(cur.strip())
                    cur = ""
                else:
                    cur += ch
        if cur.strip():
            parts.append(cur.strip())

        if len(parts) < 11:
            continue

        def unq(v):
            v = v.strip()
            if (v.startswith('"') and v.endswith('"')) or (v.startswith("'") and v.endswith("'")):
                return v[1:-1]
            return v

        def to_int(v, default=0):
            try:
                return int(float(unq(v)))
            except Exception:
                return default

        def to_float(v, default=0.0):
            try:
                return float(unq(v))
            except Exception:
                return default

        rows.append({
            "product_code": unq(parts[0]),
            "team": unq(parts[1]),       # display team incl. "(Home)" suffix
            "base_team": unq(parts[2]),  # base team name
            "league_display": unq(parts[3]),
            "league_key_hint": unq(parts[4]),
            "season": unq(parts[5]),
            "base_price": to_float(parts[6], 25.0),
            "image_url": unq(parts[7]),
            "stock_seed": to_int(parts[8], 14),
            "display_order": to_int(parts[9], 0),
            "sales_rank": to_int(parts[10], 0),
        })
    return rows


# =====================================================================
# DATABASE INIT / MIGRATION
# =====================================================================

def _canonical_league(name):
    key = LEAGUE_KEYS.get(str(name or "").strip().lower())
    if key:
        return key
    return ("rest", "Rest of the World")


def connect_new_db():
    """Open a connection to Elite Kits.db with foreign keys ON."""
    con = sqlite3.connect(NEW_DB_PATH, detect_types=sqlite3.PARSE_DECLTYPES, timeout=10)
    con.row_factory = sqlite3.Row
    con.execute("PRAGMA foreign_keys = ON;")
    con.execute("PRAGMA journal_mode = WAL;")
    return con


def _connect_original_readonly():
    """Read-only connection to elitekits.db. Never written."""
    if not ORIGINAL_DB_PATH.exists():
        return None
    uri = f"file:{ORIGINAL_DB_PATH.as_posix()}?mode=ro"
    con = sqlite3.connect(uri, uri=True, detect_types=sqlite3.PARSE_DECLTYPES, timeout=10)
    con.row_factory = sqlite3.Row
    return con


def _table_columns(con, table):
    try:
        return {r["name"] for r in con.execute(f"PRAGMA table_info({table})").fetchall()}
    except sqlite3.OperationalError:
        return set()


def _table_exists(con, table):
    row = con.execute(
        "SELECT name FROM sqlite_master WHERE type='table' AND name=?", (table,)
    ).fetchone()
    return bool(row)


def _ensure_schema(con):
    """Apply ELITE_KITS_SCHEMA_SQL with IF NOT EXISTS so it is idempotent.

    Also apply safe ALTER TABLE migrations for adding missing columns to
    existing tables.
    """
    con.executescript(ELITE_KITS_SCHEMA_SQL)

    # Safe column additions for existing installs ---------------------------
    migrations = [
        ("products", "product_code", "TEXT"),
        ("products", "league_key", "TEXT NOT NULL DEFAULT ''"),
        ("products", "season", "TEXT"),
        ("products", "display_order", "INTEGER NOT NULL DEFAULT 0"),
        ("products", "sales_rank", "INTEGER NOT NULL DEFAULT 0"),
        ("users", "phone", "TEXT"),
        ("sessions", "csrf_token", "TEXT"),
        ("messages", "cv_mime", "TEXT"),
        ("messages", "cv_size", "INTEGER"),
        ("messages", "cv_blob", "BLOB"),
        ("coupons", "is_active", "INTEGER NOT NULL DEFAULT 1"),
    ]
    for table, col, decl in migrations:
        cols = _table_columns(con, table)
        if col not in cols:
            try:
                con.execute(f"ALTER TABLE {table} ADD COLUMN {col} {decl}")
            except sqlite3.OperationalError:
                pass

    # Backfill league_key for products that came from the old db -----------
    rows = con.execute("SELECT id, league FROM products WHERE league_key = '' OR league_key IS NULL").fetchall()
    for r in rows:
        key, _disp = _canonical_league(r["league"])
        con.execute("UPDATE products SET league_key=? WHERE id=?", (key, r["id"]))

    # Widen the CHECK constraint on coupons.type so the admin CRUD can issue
    # 'fixed' (flat amount) coupons in addition to the legacy 'percent' and
    # 'delivery' types. SQLite cannot ALTER a CHECK constraint in place, so
    # if the existing table still has the narrow constraint we recreate it.
    sql_row = con.execute(
        "SELECT sql FROM sqlite_master WHERE type='table' AND name='coupons'"
    ).fetchone()
    if sql_row and "'fixed'" not in (sql_row["sql"] or ""):
        try:
            con.execute("PRAGMA foreign_keys = OFF")
            con.execute("BEGIN")
            con.execute("ALTER TABLE coupons RENAME TO coupons_old__migrate")
            con.execute(
                """
                CREATE TABLE coupons (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  code TEXT NOT NULL UNIQUE,
                  type TEXT NOT NULL CHECK (type IN ('percent','fixed','delivery')),
                  value REAL NOT NULL DEFAULT 0,
                  expires_at TEXT,
                  is_active INTEGER NOT NULL DEFAULT 1,
                  created_at TEXT NOT NULL DEFAULT (datetime('now'))
                )
                """
            )
            con.execute(
                """
                INSERT INTO coupons (id, code, type, value, expires_at, is_active, created_at)
                SELECT id, code, type, value, expires_at,
                       COALESCE(is_active, 1), created_at
                FROM coupons_old__migrate
                """
            )
            con.execute("DROP TABLE coupons_old__migrate")
            con.commit()
        except sqlite3.OperationalError:
            con.rollback()
        finally:
            con.execute("PRAGMA foreign_keys = ON")

    con.commit()


def _get_schema_version(con):
    con.execute(
        "CREATE TABLE IF NOT EXISTS schema_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)"
    )
    row = con.execute("SELECT value FROM schema_meta WHERE key='schema_version'").fetchone()
    try:
        return int(row["value"]) if row else 0
    except Exception:
        return 0


def _set_schema_version(con, version):
    con.execute(
        """INSERT INTO schema_meta(key, value) VALUES('schema_version', ?)
           ON CONFLICT(key) DO UPDATE SET value=excluded.value""",
        (str(version),),
    )


def _run_schema_migrations(con):
    """Run manual, idempotent SQLite migrations in version order.

    No Alembic and no external migration files: every migration lives here.
    A schema_version is written only after the migration transaction commits.
    """
    version = _get_schema_version(con)
    migrations = []

    def migration_1(db):
        cols = _table_columns(db, "users")
        if "phone" not in cols:
            db.execute("ALTER TABLE users ADD COLUMN phone TEXT")
        cols = _table_columns(db, "sessions")
        if "csrf_token" not in cols:
            db.execute("ALTER TABLE sessions ADD COLUMN csrf_token TEXT")

    def migration_2(db):
        db.executescript(
            """
            CREATE TABLE IF NOT EXISTS product_reviews (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_id INTEGER NOT NULL,
              product_id INTEGER NOT NULL,
              order_id INTEGER NOT NULL,
              order_item_id INTEGER NOT NULL,
              rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
              comment TEXT,
              created_at TEXT NOT NULL DEFAULT (datetime('now')),
              updated_at TEXT NOT NULL DEFAULT (datetime('now')),
              UNIQUE(user_id, product_id, order_item_id),
              FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
              FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
              FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
              FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE CASCADE
            );
            CREATE INDEX IF NOT EXISTS idx_product_reviews_product ON product_reviews(product_id);

            CREATE TABLE IF NOT EXISTS order_status_history (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              order_id INTEGER NOT NULL,
              status TEXT NOT NULL CHECK (status IN ('Pending','Confirmed','Shipped','Delivered','Cancelled')),
              note TEXT,
              created_by INTEGER,
              created_at TEXT NOT NULL DEFAULT (datetime('now')),
              FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
              FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
            );
            CREATE INDEX IF NOT EXISTS idx_order_status_history_order ON order_status_history(order_id, created_at);
            """
        )

    def migration_3(db):
        orders = db.execute("SELECT id, status, created_at FROM orders ORDER BY id").fetchall()
        for order in orders:
            exists = db.execute(
                "SELECT 1 FROM order_status_history WHERE order_id=? LIMIT 1",
                (order["id"],),
            ).fetchone()
            if exists:
                continue
            created = order["created_at"] or "datetime('now')"
            db.execute(
                """INSERT INTO order_status_history(order_id, status, note, created_at)
                   VALUES(?,?,?,?)""",
                (order["id"], "Pending", "Order created", created),
            )
            status = order["status"] if order["status"] in VALID_ORDER_STATUSES else "Confirmed"
            if status != "Pending":
                db.execute(
                    """INSERT INTO order_status_history(order_id, status, note, created_at)
                       VALUES(?,?,?,?)""",
                    (order["id"], status, "Imported current status", created),
                )

    def migration_4(db):
        db.executescript(
            """
            CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
            CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);
            CREATE INDEX IF NOT EXISTS idx_inventory_quantity ON inventory(quantity);
            CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(is_active);
            CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);
            """
        )

    def migration_5(db):
        rows = db.execute(
            "SELECT id FROM sessions WHERE csrf_token IS NULL OR csrf_token=''"
        ).fetchall()
        for row in rows:
            db.execute(
                "UPDATE sessions SET csrf_token=? WHERE id=?",
                (secrets.token_urlsafe(32), row["id"]),
            )

    def migration_6(db):
        # Add structured phone columns to orders, saved_addresses, and users so
        # the Payment phone field can be persisted, autofilled, and exported.
        # users.phone (free-text) is preserved for backward compatibility.
        phone_cols = (
            ("phone_country",      "TEXT"),
            ("phone_country_code", "TEXT"),
            ("phone_dial_code",    "TEXT"),
            ("phone_national",     "TEXT"),
            ("phone_e164",         "TEXT"),
        )
        for table in ("orders", "saved_addresses", "users"):
            existing = _table_columns(db, table)
            for col, ctype in phone_cols:
                if col not in existing:
                    db.execute(f"ALTER TABLE {table} ADD COLUMN {col} {ctype}")

    def migration_7(db):
        cols = _table_columns(db, "users")
        if "deleted_at" not in cols:
            db.execute("ALTER TABLE users ADD COLUMN deleted_at TEXT")

    def migration_8(db):
        cols = _table_columns(db, "coupons")
        if "source" not in cols:
            db.execute("ALTER TABLE coupons ADD COLUMN source TEXT NOT NULL DEFAULT 'admin'")
        db.execute(
            """UPDATE coupons
                  SET source='spin'
                WHERE code IN (
                    SELECT coupon_code
                      FROM spin_history
                     WHERE coupon_code IS NOT NULL AND coupon_code<>''
                )"""
        )

    def migration_9(db):
        # Track WHERE a user_coupons row came from (admin gift vs spin) and who
        # assigned it. Required so the admin coupon list can show ownership and
        # so coupon validation can enforce "this coupon belongs to user X".
        uc_cols = _table_columns(db, "user_coupons")
        if "source" not in uc_cols:
            db.execute(
                "ALTER TABLE user_coupons ADD COLUMN source TEXT NOT NULL DEFAULT 'spin'"
            )
        if "assigned_by" not in uc_cols:
            db.execute("ALTER TABLE user_coupons ADD COLUMN assigned_by INTEGER")
        # Existing rows pre-migration were all spin-issued; tag them explicitly.
        db.execute(
            "UPDATE user_coupons SET source='spin' WHERE source IS NULL OR source=''"
        )
        # The original unique index on user_coupons.code was designed for
        # spin-issued unique codes. Admin gifts intentionally share the
        # admin coupon's code across multiple users (e.g. gift WELCOME10 to
        # two different users), so a global UNIQUE on .code now blocks
        # legitimate use cases. Drop the unique index and replace it with a
        # plain index for lookup performance. Uniqueness of an active
        # (coupon_id, user_id) pair is still enforced in code at
        # /api/admin/coupons/<id>/assign.
        db.execute("DROP INDEX IF EXISTS idx_user_coupons_code")
        db.execute(
            "CREATE INDEX IF NOT EXISTS idx_user_coupons_code ON user_coupons(code)"
        )

    def migration_10(db):
        # ROOT CAUSE FIX for "admin coupons cannot be deleted".
        # An earlier ALTER TABLE on the `coupons` table (run by a previous
        # Backend version) left dependent tables (`user_coupons`, `spin_history`)
        # pointing their FOREIGN KEY at a stale rename-shadow table
        # "coupons_old__migrate" that no longer exists. Any DELETE on coupons
        # then fails with `no such table: main.coupons_old__migrate` because
        # SQLite tries to cascade through the dead reference.
        #
        # This migration rebuilds the affected tables so their FKs point at
        # the real `coupons` table. We rebuild ONLY if the broken reference
        # is detected so this is safe to re-run on healthy databases.
        def _table_fks(name):
            try:
                rows = db.execute(f"PRAGMA foreign_key_list({name})").fetchall()
            except sqlite3.Error:
                return []
            return [r["table"] if isinstance(r, sqlite3.Row) else r[2] for r in rows]

        needs_uc = "coupons_old__migrate" in _table_fks("user_coupons")
        needs_sh = "coupons_old__migrate" in _table_fks("spin_history")
        if not (needs_uc or needs_sh):
            return

        # Pause FK enforcement during the rebuild (still inside the migration
        # transaction; pragma scope is the connection).
        db.execute("PRAGMA foreign_keys=OFF")

        if needs_uc:
            db.executescript(
                """
                CREATE TABLE user_coupons_new (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  user_id INTEGER NOT NULL,
                  coupon_id INTEGER NOT NULL,
                  code TEXT,
                  expires_at TEXT,
                  prize_label TEXT,
                  used INTEGER NOT NULL DEFAULT 0,
                  assigned_at TEXT NOT NULL DEFAULT (datetime('now')),
                  used_at TEXT,
                  source TEXT NOT NULL DEFAULT 'spin',
                  assigned_by INTEGER,
                  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                  FOREIGN KEY (coupon_id) REFERENCES coupons(id) ON DELETE CASCADE,
                  FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL
                );
                INSERT INTO user_coupons_new
                       (id, user_id, coupon_id, code, expires_at, prize_label,
                        used, assigned_at, used_at, source, assigned_by)
                SELECT id, user_id, coupon_id, code, expires_at, prize_label,
                       used, assigned_at, used_at,
                       COALESCE(source, 'spin'),
                       assigned_by
                  FROM user_coupons;
                DROP TABLE user_coupons;
                ALTER TABLE user_coupons_new RENAME TO user_coupons;
                CREATE INDEX IF NOT EXISTS idx_user_coupons_user_id ON user_coupons(user_id);
                CREATE INDEX IF NOT EXISTS idx_user_coupons_code ON user_coupons(code);
                """
            )

        if needs_sh:
            db.executescript(
                """
                CREATE TABLE spin_history_new (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  user_id INTEGER NOT NULL,
                  spin_date TEXT NOT NULL,
                  prize_id TEXT NOT NULL,
                  prize_label TEXT NOT NULL,
                  emoji TEXT,
                  coupon_id INTEGER,
                  coupon_code TEXT,
                  expires_at TEXT,
                  created_at TEXT NOT NULL DEFAULT (datetime('now')),
                  UNIQUE(user_id, spin_date),
                  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                  FOREIGN KEY (coupon_id) REFERENCES coupons(id) ON DELETE SET NULL
                );
                INSERT INTO spin_history_new
                       (id, user_id, spin_date, prize_id, prize_label, emoji,
                        coupon_id, coupon_code, expires_at, created_at)
                SELECT id, user_id, spin_date, prize_id, prize_label, emoji,
                       coupon_id, coupon_code, expires_at, created_at
                  FROM spin_history;
                DROP TABLE spin_history;
                ALTER TABLE spin_history_new RENAME TO spin_history;
                CREATE INDEX IF NOT EXISTS idx_spin_history_user_id ON spin_history(user_id);
                """
            )

        # Drop any stale shadow table that lingered (defensive).
        db.execute('DROP TABLE IF EXISTS "coupons_old__migrate"')
        db.execute("PRAGMA foreign_keys=ON")

    def migration_11(db):
        # Distinguish "admin manually deactivated this coupon" from
        # "admin DELETED this coupon and it should no longer appear in the
        # management list". The DELETE route already soft-deletes when the
        # coupon is referenced by historical orders / redemptions; we now
        # also stamp coupons.deleted_at so the admin list query can hide
        # those rows while keeping merely-paused coupons visible (with the
        # Activate button still available).
        cols = _table_columns(db, "coupons")
        if "deleted_at" not in cols:
            db.execute("ALTER TABLE coupons ADD COLUMN deleted_at TEXT")

    migrations.extend([
        (1, migration_1),
        (2, migration_2),
        (3, migration_3),
        (4, migration_4),
        (5, migration_5),
        (6, migration_6),
        (7, migration_7),
        (8, migration_8),
        (9, migration_9),
        (10, migration_10),
        (11, migration_11),
    ])

    for target, fn in migrations:
        if version >= target:
            continue
        try:
            con.execute("BEGIN")
            fn(con)
            _set_schema_version(con, target)
            con.commit()
            version = target
        except Exception:
            con.rollback()
            raise


def _seed_default_coupons(con):
    """Seed baseline coupons ONLY when the coupons table has never been
    populated. Once any row exists (or has existed and been deleted), this
    function is a no-op so admin deletions are not silently undone on every
    server restart.

    Business rule: coupons are created in only three ways at runtime --
      1. Admin manually creates a coupon (POST /api/admin/coupons)
      2. Admin gifts an existing coupon to a user (POST .../assign)
      3. A logged-in user wins one on the daily Spin Wheel (POST /api/spin)
    No other code path may create coupons, and previously deleted defaults
    must NEVER reappear.
    """
    # An admin-touched database is identified by the presence of an audit_log
    # row for any coupon mutation, OR by any historical orders.coupon_code,
    # OR by the bare existence of any coupons row. The coupons.is_active=0
    # soft-delete also counts as "previously seeded" -- we must NOT recreate
    # a row admin already archived.
    has_any_coupon_row = con.execute("SELECT 1 FROM coupons LIMIT 1").fetchone()
    if has_any_coupon_row:
        return
    has_coupon_audit = False
    try:
        has_coupon_audit = bool(con.execute(
            "SELECT 1 FROM audit_log WHERE entity='coupons' LIMIT 1"
        ).fetchone())
    except Exception:
        # audit_log may not exist on a brand-new database; that's fine.
        has_coupon_audit = False
    if has_coupon_audit:
        return
    defaults = [
        ("WELCOME10", "percent", 10.0),
        ("FREESHIP", "delivery", 0.0),
        ("FREEDEL", "delivery", 0.0),
        ("ELITE5", "percent", 5.0),
        ("ELITE7", "percent", 7.0),
        ("ELITE10", "percent", 10.0),
        ("ELITE15", "percent", 15.0),
        ("ELITE25", "percent", 25.0),
    ]
    for code, ctype, value in defaults:
        con.execute(
            "INSERT OR IGNORE INTO coupons(code, type, value) VALUES(?,?,?)",
            (code, ctype, value),
        )
    con.commit()


def _seed_admin(con):
    """Ensure admin@gmail.com / Admin123@ exists with a werkzeug-format password hash.

    We always rewrite the admin password hash to a werkzeug-format hash of
    ADMIN_PASSWORD_DEFAULT so that the canonical admin login works regardless
    of whether the bcrypt package is installed. Legacy bcrypt hashes for other
    users still work via verify_password().
    """
    admin_hash = generate_password_hash(ADMIN_PASSWORD_DEFAULT)
    row = con.execute("SELECT id, is_admin FROM users WHERE email = ?", (ADMIN_EMAIL,)).fetchone()
    if row is None:
        con.execute(
            """INSERT INTO users (name, email, password_hash, is_admin, auth_provider, email_verified)
               VALUES (?,?,?,1,'local',1)""",
            ("Admin", ADMIN_EMAIL, admin_hash),
        )
    else:
        con.execute(
            "UPDATE users SET password_hash=?, is_admin=1 WHERE id=?",
            (admin_hash, row["id"]),
        )
    con.commit()


def _copy_original_data(new_con):
    """One-time copy of compatible rows from elitekits.db into Elite Kits.db.

    Runs only when Elite Kits.db is being created for the first time and
    elitekits.db is available. Original database is read-only.
    """
    orig = _connect_original_readonly()
    if orig is None:
        return

    try:
        # users -------------------------------------------------------------
        users_rows = orig.execute(
            "SELECT name, email, password_hash, birthdate, is_admin, is_deleted, "
            "auth_provider, google_sub, email_verified, email_confirmation_sent_at, "
            "last_login_at, created_at, updated_at FROM users"
        ).fetchall()
        for u in users_rows:
            new_con.execute(
                """INSERT OR IGNORE INTO users
                   (name, email, password_hash, birthdate, is_admin, is_deleted,
                    auth_provider, google_sub, email_verified, email_confirmation_sent_at,
                    last_login_at, created_at, updated_at)
                   VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)""",
                (
                    u["name"], u["email"], u["password_hash"], u["birthdate"],
                    u["is_admin"] or 0, u["is_deleted"] or 0,
                    u["auth_provider"] or "local", u["google_sub"],
                    u["email_verified"] or 0, u["email_confirmation_sent_at"],
                    u["last_login_at"], u["created_at"], u["updated_at"],
                ),
            )

        # products ----------------------------------------------------------
        # Use canonical league mapping to avoid duplicates ("Laliga" vs "LaLiga").
        for p in orig.execute(
            "SELECT team, league, product_name, image_url, base_price, is_active, "
            "created_at, updated_at FROM products"
        ).fetchall():
            league_key, league_display = _canonical_league(p["league"])
            existing = new_con.execute(
                "SELECT id FROM products WHERE team=? AND league=?",
                (p["team"], league_display),
            ).fetchone()
            if existing is None:
                new_con.execute(
                    """INSERT INTO products
                       (team, league, league_key, product_name, image_url, base_price,
                        is_active, created_at, updated_at)
                       VALUES (?,?,?,?,?,?,?,?,?)""",
                    (
                        p["team"], league_display, league_key, p["product_name"],
                        p["image_url"], p["base_price"] or 25.0,
                        p["is_active"] if p["is_active"] is not None else 1,
                        p["created_at"], p["updated_at"],
                    ),
                )

        new_con.commit()
    finally:
        orig.close()


def _seed_or_merge_frontend_products(con):
    """Insert app.js products that are missing in the database.

    Match against (team, league) using the display variants in app.js
    (e.g. 'Arsenal (Home)') because that is the user-visible team string.
    """
    rows = load_frontend_product_rows()
    if not rows:
        return

    for row in rows:
        league_key, league_display = _canonical_league(row["league_display"])

        # Try to find by product_code first, then by team+league.
        existing = con.execute(
            "SELECT id, product_code, image_url, season, display_order, sales_rank "
            "FROM products WHERE product_code = ?",
            (row["product_code"],),
        ).fetchone()

        if existing is None:
            existing = con.execute(
                "SELECT id, product_code, image_url, season, display_order, sales_rank "
                "FROM products WHERE team = ? AND league = ?",
                (row["team"], league_display),
            ).fetchone()

        if existing is None:
            # Insert new product
            cur = con.execute(
                """INSERT INTO products
                   (product_code, team, league, league_key, product_name, image_url,
                    base_price, season, display_order, sales_rank, is_active)
                   VALUES (?,?,?,?,?,?,?,?,?,?,1)""",
                (
                    row["product_code"], row["team"], league_display, league_key,
                    row["team"] + " Jersey", row["image_url"], row["base_price"],
                    row["season"], row["display_order"], row["sales_rank"],
                ),
            )
            product_id = cur.lastrowid
        else:
            product_id = existing["id"]
            # Backfill missing metadata
            con.execute(
                """UPDATE products SET
                       product_code = COALESCE(NULLIF(product_code, ''), ?),
                       image_url    = COALESCE(NULLIF(image_url, ''), ?),
                       season       = COALESCE(NULLIF(season, ''), ?),
                       display_order = CASE WHEN display_order = 0 THEN ? ELSE display_order END,
                       sales_rank    = CASE WHEN sales_rank = 0 THEN ? ELSE sales_rank END,
                       league_key   = COALESCE(NULLIF(league_key, ''), ?),
                       league       = COALESCE(NULLIF(league, ''), ?),
                       updated_at   = datetime('now')
                   WHERE id = ?""",
                (
                    row["product_code"], row["image_url"], row["season"],
                    row["display_order"], row["sales_rank"],
                    league_key, league_display, product_id,
                ),
            )

        # Ensure inventory rows per size exist (seed with stock_seed only if
        # this product currently has zero inventory rows).
        inv_count = con.execute(
            "SELECT COUNT(*) AS c FROM inventory WHERE product_id = ?",
            (product_id,),
        ).fetchone()["c"]
        if inv_count == 0:
            per_size = max(0, int(row["stock_seed"] or 0))
            for sz in VALID_SIZES:
                con.execute(
                    "INSERT OR IGNORE INTO inventory(product_id, size, quantity) VALUES(?,?,?)",
                    (product_id, sz, per_size),
                )

    # For any DB product without inventory, seed defaults (14 per size).
    rows_no_inv = con.execute(
        """SELECT p.id FROM products p
           LEFT JOIN inventory i ON i.product_id = p.id
           WHERE i.id IS NULL
           GROUP BY p.id"""
    ).fetchall()
    for r in rows_no_inv:
        for sz in VALID_SIZES:
            con.execute(
                "INSERT OR IGNORE INTO inventory(product_id, size, quantity) VALUES(?,?,14)",
                (r["id"], sz),
            )

    con.commit()


def _copy_secondary_original_data(new_con):
    """Copy inventory/orders/order_items/coupons/messages/spin_history/user_coupons
    from elitekits.db on first creation. Skipped if no original DB exists.
    """
    orig = _connect_original_readonly()
    if orig is None:
        return

    try:
        # email -> new user_id (since IDs may diverge)
        user_map = {}
        for r in new_con.execute("SELECT id, email FROM users").fetchall():
            user_map[r["email"].lower()] = r["id"]

        # (team, league_display) -> new product_id, with canonical league
        product_map = {}
        for r in new_con.execute("SELECT id, team, league FROM products").fetchall():
            product_map[(r["team"], r["league"])] = r["id"]

        def map_old_product(team, league):
            _, league_display = _canonical_league(league)
            return product_map.get((team, league_display))

        # inventory --------------------------------------------------------
        if _table_exists(orig, "inventory"):
            # Build old_product_id -> (team, league)
            old_products = {r["id"]: (r["team"], r["league"]) for r in orig.execute(
                "SELECT id, team, league FROM products").fetchall()}
            for inv in orig.execute("SELECT product_id, size, quantity, updated_at FROM inventory").fetchall():
                if inv["product_id"] not in old_products:
                    continue
                team, league = old_products[inv["product_id"]]
                new_pid = map_old_product(team, league)
                if not new_pid:
                    continue
                size = (inv["size"] or "").upper()
                if size not in VALID_SIZES:
                    continue
                # Overwrite seeded default with the original quantity.
                new_con.execute(
                    """INSERT INTO inventory(product_id, size, quantity, updated_at)
                       VALUES(?,?,?,?)
                       ON CONFLICT(product_id, size)
                       DO UPDATE SET quantity=excluded.quantity, updated_at=excluded.updated_at""",
                    (new_pid, size, max(0, int(inv["quantity"] or 0)), inv["updated_at"]),
                )

        # orders + order_items --------------------------------------------
        if _table_exists(orig, "orders"):
            old_users = {r["id"]: r["email"].lower() for r in orig.execute(
                "SELECT id, email FROM users").fetchall()}
            old_products = {r["id"]: (r["team"], r["league"]) for r in orig.execute(
                "SELECT id, team, league FROM products").fetchall()}
            old_to_new_order = {}
            for o in orig.execute(
                "SELECT id, order_code, user_id, user_name, email, state, city, road, "
                "subtotal, print_total, delivery_fee, discount_total, grand_total, rating, "
                "status, coupon_code, created_at FROM orders"
            ).fetchall():
                user_email = old_users.get(o["user_id"], "").lower()
                new_uid = user_map.get(user_email)
                if not new_uid:
                    continue
                # Skip if order_code already exists.
                if new_con.execute("SELECT 1 FROM orders WHERE order_code=?", (o["order_code"],)).fetchone():
                    new_id = new_con.execute(
                        "SELECT id FROM orders WHERE order_code=?", (o["order_code"],)
                    ).fetchone()["id"]
                    old_to_new_order[o["id"]] = new_id
                    continue
                status = o["status"] if o["status"] in VALID_ORDER_STATUSES else "Confirmed"
                cur = new_con.execute(
                    """INSERT INTO orders
                       (order_code, user_id, user_name, email, state, city, road,
                        subtotal, print_total, delivery_fee, discount_total, grand_total,
                        rating, status, coupon_code, created_at)
                       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
                    (
                        o["order_code"], new_uid, o["user_name"], o["email"],
                        o["state"], o["city"], o["road"],
                        o["subtotal"] or 0, o["print_total"] or 0, o["delivery_fee"] or 5,
                        o["discount_total"] or 0, o["grand_total"] or 0,
                        o["rating"], status, o["coupon_code"], o["created_at"],
                    ),
                )
                old_to_new_order[o["id"]] = cur.lastrowid

                # If order had a rating, mirror it into ratings table.
                if o["rating"] is not None:
                    try:
                        new_con.execute(
                            """INSERT OR IGNORE INTO ratings
                               (order_id, user_id, rating, created_at, updated_at)
                               VALUES (?,?,?,?,?)""",
                            (cur.lastrowid, new_uid, int(o["rating"]),
                             o["created_at"], o["created_at"]),
                        )
                    except Exception:
                        pass

            for oi in orig.execute(
                "SELECT order_id, product_id, team, league, qty, size, unit_price, "
                "print_enabled, print_text, print_number, line_total, created_at "
                "FROM order_items"
            ).fetchall():
                new_oid = old_to_new_order.get(oi["order_id"])
                if not new_oid:
                    continue
                team_league = old_products.get(oi["product_id"])
                if team_league:
                    new_pid = map_old_product(*team_league)
                else:
                    new_pid = None
                if new_pid is None:
                    # Skip line - product missing
                    continue
                new_con.execute(
                    """INSERT INTO order_items
                       (order_id, product_id, team, league, qty, size, unit_price,
                        print_enabled, print_text, print_number, line_total, created_at)
                       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)""",
                    (
                        new_oid, new_pid, oi["team"], oi["league"], oi["qty"] or 1,
                        oi["size"], oi["unit_price"] or 25,
                        oi["print_enabled"] or 0, oi["print_text"], oi["print_number"],
                        oi["line_total"] or 0, oi["created_at"],
                    ),
                )

        # coupons ----------------------------------------------------------
        if _table_exists(orig, "coupons"):
            for c in orig.execute("SELECT code, type, value, expires_at, created_at FROM coupons").fetchall():
                new_con.execute(
                    """INSERT OR IGNORE INTO coupons(code, type, value, expires_at, created_at)
                       VALUES(?,?,?,?,?)""",
                    (c["code"], c["type"], c["value"] or 0, c["expires_at"], c["created_at"]),
                )

        # user_coupons -----------------------------------------------------
        if _table_exists(orig, "user_coupons"):
            old_users = {r["id"]: r["email"].lower() for r in orig.execute(
                "SELECT id, email FROM users").fetchall()}
            for uc in orig.execute(
                "SELECT user_id, code, expires_at, prize_label, used, assigned_at, used_at FROM user_coupons"
            ).fetchall():
                email = old_users.get(uc["user_id"], "").lower()
                new_uid = user_map.get(email)
                if not new_uid or not uc["code"]:
                    continue
                cp = new_con.execute("SELECT id FROM coupons WHERE code=?", (uc["code"].split("-")[0] or uc["code"],)).fetchone()
                if cp is None:
                    cp = new_con.execute("SELECT id FROM coupons WHERE code=?", (uc["code"],)).fetchone()
                coupon_id = cp["id"] if cp else None
                if coupon_id is None:
                    # Best-effort: create a percent coupon with 10% default
                    new_con.execute(
                        "INSERT OR IGNORE INTO coupons(code, type, value) VALUES(?,?,?)",
                        (uc["code"], "percent", 10.0),
                    )
                    cp = new_con.execute("SELECT id FROM coupons WHERE code=?", (uc["code"],)).fetchone()
                    coupon_id = cp["id"] if cp else None
                if coupon_id is None:
                    continue
                new_con.execute(
                    """INSERT OR IGNORE INTO user_coupons
                       (user_id, coupon_id, code, expires_at, prize_label, used, assigned_at, used_at)
                       VALUES(?,?,?,?,?,?,?,?)""",
                    (new_uid, coupon_id, uc["code"], uc["expires_at"], uc["prize_label"],
                     uc["used"] or 0, uc["assigned_at"], uc["used_at"]),
                )

        # spin_history -----------------------------------------------------
        if _table_exists(orig, "spin_history"):
            old_users = {r["id"]: r["email"].lower() for r in orig.execute(
                "SELECT id, email FROM users").fetchall()}
            for sh in orig.execute(
                "SELECT user_id, spin_date, prize_id, prize_label, emoji, coupon_code, "
                "expires_at, created_at FROM spin_history"
            ).fetchall():
                email = old_users.get(sh["user_id"], "").lower()
                new_uid = user_map.get(email)
                if not new_uid:
                    continue
                coupon_id = None
                if sh["coupon_code"]:
                    cp = new_con.execute("SELECT id FROM coupons WHERE code=?",
                                         (sh["coupon_code"],)).fetchone()
                    coupon_id = cp["id"] if cp else None
                new_con.execute(
                    """INSERT OR IGNORE INTO spin_history
                       (user_id, spin_date, prize_id, prize_label, emoji,
                        coupon_id, coupon_code, expires_at, created_at)
                       VALUES (?,?,?,?,?,?,?,?,?)""",
                    (new_uid, sh["spin_date"], sh["prize_id"], sh["prize_label"],
                     sh["emoji"], coupon_id, sh["coupon_code"], sh["expires_at"],
                     sh["created_at"]),
                )

        # messages ---------------------------------------------------------
        if _table_exists(orig, "messages"):
            for m in orig.execute(
                "SELECT name, email, subject, message, type, role, cv_file, is_read, created_at FROM messages"
            ).fetchall():
                new_con.execute(
                    """INSERT INTO messages
                       (name, email, subject, message, type, role, cv_file, is_read, created_at)
                       VALUES (?,?,?,?,?,?,?,?,?)""",
                    (m["name"], m["email"], m["subject"], m["message"], m["type"],
                     m["role"], m["cv_file"], m["is_read"] or 0, m["created_at"]),
                )

        new_con.commit()
    finally:
        orig.close()


def initialize_database():
    """Create or upgrade Elite Kits.db (the only runtime DB).

    The legacy elitekits.db is OPTIONAL. If it is present AND Elite Kits.db
    is being created for the very first time, rows are copied from it
    READ-ONLY. Once the new DB exists, the legacy file can be removed and
    this function never reads from it again.

    Returns a tuple (fresh: bool, copied_from_original: bool).
    """
    fresh = not NEW_DB_PATH.exists()
    con = connect_new_db()
    try:
        _ensure_schema(con)
        _run_schema_migrations(con)
        copied = False
        if fresh and ORIGINAL_DB_PATH.exists():
            _copy_original_data(con)
            copied = True
        _seed_or_merge_frontend_products(con)
        _seed_default_coupons(con)
        _seed_admin(con)
        expire_stale_spin_coupons(con)
        if fresh and ORIGINAL_DB_PATH.exists():
            # Secondary copy depends on products+users existing in new DB.
            _copy_secondary_original_data(con)
        con.commit()
        return fresh, copied
    finally:
        con.close()


# =====================================================================
# FLASK APP
# =====================================================================

app = Flask(__name__, static_folder=None)
# Make sure Flask doesn't send 'no-store' on static files in dev
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0


# ---- DB connection per request --------------------------------------

def get_db():
    if "db" not in g:
        g.db = connect_new_db()
    return g.db


@app.teardown_appcontext
def close_db(_error):
    db = g.pop("db", None)
    if db is not None:
        db.close()


# ---- JSON helpers ---------------------------------------------------

def ok(data=None, status=200):
    return jsonify({"ok": True, "data": data if data is not None else {}}), status


def err(message, status=400, extra=None):
    body = {"ok": False, "error": str(message)}
    if extra:
        body.update(extra)
    return jsonify(body), status


# ---- Errors ---------------------------------------------------------

@app.errorhandler(404)
def _404(_e):
    if request.path.startswith("/api/"):
        return err("Not found", 404)
    return _e


@app.errorhandler(405)
def _405(_e):
    return err("Method not allowed", 405)


@app.errorhandler(500)
def _500(_e):
    return err("Server error", 500)


# =====================================================================
# VALIDATION HELPERS
# =====================================================================

EMAIL_RE = re.compile(
    r"^(?=.{1,254}$)"                                          # total length 1..254
    r"(?=[^@]{1,64}@)"                                         # local part length 1..64
    r"(?=[^@]*[A-Za-z])"                                       # local must contain a letter
    r"[A-Za-z0-9_%+\-]+(?:\.[A-Za-z0-9_%+\-]+)*"               # local: no leading/trailing/consecutive dots
    r"@"
    r"(?:[A-Za-z0-9](?:[A-Za-z0-9\-]{0,61}[A-Za-z0-9])?\.)+"   # domain labels: alnum start/end
    r"[A-Za-z]{2,63}$"                                         # TLD: 2-63 letters
)
NAME_RE = re.compile(r"^[A-Za-z][A-Za-z .'\-]{1,49}$")
PRINT_NAME_RE = re.compile(r"^(?=.*[A-Za-z])[A-Za-z0-9 .'\-]{1,18}$")
CITY_RE = re.compile(r"^[A-Za-z][A-Za-z .'\-]{1,49}$")
ROAD_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9 .'\-#/,]{1,79}$")

def valid_name(v):       return bool(v and NAME_RE.match(v.strip()))
def valid_email(v):      return bool(v and EMAIL_RE.match(v.strip()))
def valid_city(v):       return bool(v and CITY_RE.match(v.strip()))
def valid_road(v):       return bool(v and ROAD_RE.match(v.strip()))
def valid_print_name(v): return bool(v and PRINT_NAME_RE.match(v.strip()))

def email_problem_message(v):
    """Return a specific message describing why an email is invalid (or generic if it passes)."""
    s = (v or "").strip()
    if not s:
        return "Email is required."
    if s.count("@") != 1:
        return "Email must contain exactly one '@'."
    local, domain = s.split("@", 1)
    if not local:
        return "Email is missing the part before '@'."
    if not domain:
        return "Email is missing the part after '@'."
    if not re.search(r"[A-Za-z]", local):
        return "Email must contain at least one letter before the '@'."
    if local.startswith(".") or local.endswith("."):
        return "Email cannot start or end with a dot before '@'."
    if ".." in local or ".." in domain:
        return "Email cannot contain consecutive dots."
    if " " in s:
        return "Email cannot contain spaces."
    if "." not in domain:
        return "Email domain must contain a dot (e.g. gmail.com)."
    if domain.startswith(".") or domain.endswith(".") or domain.startswith("-") or domain.endswith("-"):
        return "Email domain cannot start or end with '.' or '-'."
    tld = domain.rsplit(".", 1)[-1]
    if len(tld) < 2 or not tld.isalpha():
        return "Email must end with a valid domain (e.g. .com, .net)."
    return "Please enter a valid email address."


def truthy_flag(v):
    if isinstance(v, bool):
        return v
    if isinstance(v, (int, float)):
        return v != 0
    return str(v or "").strip().lower() in ("1", "true", "yes", "on")

def valid_birthdate_age15(v):
    if not v: return False
    s = str(v).strip()
    d = None
    # Try several common formats sent from the frontend
    for fmt in ("%Y-%m-%d", "%d/%m/%Y", "%m/%d/%Y", "%Y/%m/%d", "%d-%m-%Y"):
        try:
            d = datetime.strptime(s, fmt).date()
            break
        except Exception:
            continue
    if d is None:
        return False
    today = date.today()
    age = today.year - d.year - ((today.month, today.day) < (d.month, d.day))
    return age >= 15 and d <= today

PASSWORD_STRONG_RE = re.compile(
    r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$"
)

def valid_password(v):
    return bool(v and PASSWORD_STRONG_RE.match(v))


def luhn_valid(card_number):
    # Lebanon-only project: card number must be EXACTLY 16 digits and pass Luhn.
    digits = re.sub(r"\D", "", str(card_number or ""))
    if len(digits) != 16:
        return False
    total = 0
    parity = (len(digits) - 2) % 2
    for i, ch in enumerate(digits):
        n = int(ch)
        if i % 2 == parity:
            n *= 2
            if n > 9: n -= 9
        total += n
    return total % 10 == 0


def valid_cvv(v):
    # Lebanon-only project: CVV must be EXACTLY 3 digits.
    return bool(v and re.match(r"^\d{3}$", str(v).strip()))


def valid_expiry(v):
    return expiry_validation_message(v) == ""


# Card-expiry policy:
#   * Must be valid MM/YY (or MM/YYYY).
#   * Must be the current month or any future month.
#   * Must NOT be more than 10 years past the current month -- this rejects
#     unrealistic far-future expiries like 12/2082 that scammers sometimes
#     submit. Real-world Visa/Mastercard issuance maxes out around 8 years.
EXPIRY_MAX_YEARS_AHEAD = 10


def expiry_validation_message(v):
    if not v:
        return "Card expiry is required."
    m = re.match(r"^(\d{2})\s*[/\-]\s*(\d{2,4})$", str(v).strip())
    if not m:
        return "Enter card expiry as MM/YY."
    month = int(m.group(1))
    year_raw = int(m.group(2))
    if month < 1 or month > 12:
        return "Enter a valid expiry month between 01 and 12."
    year = 2000 + year_raw if year_raw < 100 else year_raw
    today = date.today()
    if (year < today.year) or (year == today.year and month < today.month):
        return "Card expiry cannot be in the past."
    max_year = today.year + EXPIRY_MAX_YEARS_AHEAD
    if year > max_year or (year == max_year and month > today.month):
        return f"Card expiry cannot be more than {EXPIRY_MAX_YEARS_AHEAD} years from now."
    return ""


def normalize_address_field(v):
    return re.sub(r"\s+", " ", str(v or "").strip())


# =====================================================================
# PHONE COUNTRY RULES (Arab + EU + US/CA/MX/AU)
# =====================================================================
# Length rule is national subscriber length (digits after the country dial
# code). Frontend (app.js) mirrors this table — keep them in sync.

PHONE_COUNTRY_RULES = {
    # Arab countries
    "DZ": {"name": "Algeria",              "dial": "+213", "flag": "\U0001F1E9\U0001F1FF", "lengths": [9]},
    "BH": {"name": "Bahrain",              "dial": "+973", "flag": "\U0001F1E7\U0001F1ED", "lengths": [8]},
    "KM": {"name": "Comoros",              "dial": "+269", "flag": "\U0001F1F0\U0001F1F2", "lengths": [7]},
    "DJ": {"name": "Djibouti",             "dial": "+253", "flag": "\U0001F1E9\U0001F1EF", "lengths": [8]},
    "EG": {"name": "Egypt",                "dial": "+20",  "flag": "\U0001F1EA\U0001F1EC", "lengths": [10]},
    "IQ": {"name": "Iraq",                 "dial": "+964", "flag": "\U0001F1EE\U0001F1F6", "lengths": [10]},
    "JO": {"name": "Jordan",               "dial": "+962", "flag": "\U0001F1EF\U0001F1F4", "lengths": [9]},
    "KW": {"name": "Kuwait",               "dial": "+965", "flag": "\U0001F1F0\U0001F1FC", "lengths": [8]},
    "LB": {"name": "Lebanon",              "dial": "+961", "flag": "\U0001F1F1\U0001F1E7", "lengths": [7, 8]},
    "LY": {"name": "Libya",                "dial": "+218", "flag": "\U0001F1F1\U0001F1FE", "lengths": [9]},
    "MR": {"name": "Mauritania",           "dial": "+222", "flag": "\U0001F1F2\U0001F1F7", "lengths": [8]},
    "MA": {"name": "Morocco",              "dial": "+212", "flag": "\U0001F1F2\U0001F1E6", "lengths": [9]},
    "OM": {"name": "Oman",                 "dial": "+968", "flag": "\U0001F1F4\U0001F1F2", "lengths": [8]},
    "PS": {"name": "Palestine",            "dial": "+970", "flag": "\U0001F1F5\U0001F1F8", "lengths": [9]},
    "QA": {"name": "Qatar",                "dial": "+974", "flag": "\U0001F1F6\U0001F1E6", "lengths": [8]},
    "SA": {"name": "Saudi Arabia",         "dial": "+966", "flag": "\U0001F1F8\U0001F1E6", "lengths": [9]},
    "SO": {"name": "Somalia",              "dial": "+252", "flag": "\U0001F1F8\U0001F1F4", "lengths": [7, 8, 9]},
    "SD": {"name": "Sudan",                "dial": "+249", "flag": "\U0001F1F8\U0001F1E9", "lengths": [9]},
    "SY": {"name": "Syria",                "dial": "+963", "flag": "\U0001F1F8\U0001F1FE", "lengths": [9]},
    "TN": {"name": "Tunisia",              "dial": "+216", "flag": "\U0001F1F9\U0001F1F3", "lengths": [8]},
    "AE": {"name": "United Arab Emirates", "dial": "+971", "flag": "\U0001F1E6\U0001F1EA", "lengths": [9]},
    "YE": {"name": "Yemen",                "dial": "+967", "flag": "\U0001F1FE\U0001F1EA", "lengths": [9]},
    # European Union
    "AT": {"name": "Austria",              "dial": "+43",  "flag": "\U0001F1E6\U0001F1F9", "lengths": [10, 11, 12, 13]},
    "BE": {"name": "Belgium",              "dial": "+32",  "flag": "\U0001F1E7\U0001F1EA", "lengths": [9]},
    "BG": {"name": "Bulgaria",             "dial": "+359", "flag": "\U0001F1E7\U0001F1EC", "lengths": [9]},
    "HR": {"name": "Croatia",              "dial": "+385", "flag": "\U0001F1ED\U0001F1F7", "lengths": [8, 9]},
    "CY": {"name": "Cyprus",               "dial": "+357", "flag": "\U0001F1E8\U0001F1FE", "lengths": [8]},
    "CZ": {"name": "Czech Republic",       "dial": "+420", "flag": "\U0001F1E8\U0001F1FF", "lengths": [9]},
    "DK": {"name": "Denmark",              "dial": "+45",  "flag": "\U0001F1E9\U0001F1F0", "lengths": [8]},
    "EE": {"name": "Estonia",              "dial": "+372", "flag": "\U0001F1EA\U0001F1EA", "lengths": [7, 8]},
    "FI": {"name": "Finland",              "dial": "+358", "flag": "\U0001F1EB\U0001F1EE", "lengths": [9, 10]},
    "FR": {"name": "France",               "dial": "+33",  "flag": "\U0001F1EB\U0001F1F7", "lengths": [9]},
    "DE": {"name": "Germany",              "dial": "+49",  "flag": "\U0001F1E9\U0001F1EA", "lengths": [10, 11]},
    "GR": {"name": "Greece",               "dial": "+30",  "flag": "\U0001F1EC\U0001F1F7", "lengths": [10]},
    "HU": {"name": "Hungary",              "dial": "+36",  "flag": "\U0001F1ED\U0001F1FA", "lengths": [9]},
    "IE": {"name": "Ireland",              "dial": "+353", "flag": "\U0001F1EE\U0001F1EA", "lengths": [9]},
    "IT": {"name": "Italy",                "dial": "+39",  "flag": "\U0001F1EE\U0001F1F9", "lengths": [9, 10]},
    "LV": {"name": "Latvia",               "dial": "+371", "flag": "\U0001F1F1\U0001F1FB", "lengths": [8]},
    "LT": {"name": "Lithuania",            "dial": "+370", "flag": "\U0001F1F1\U0001F1F9", "lengths": [8]},
    "LU": {"name": "Luxembourg",           "dial": "+352", "flag": "\U0001F1F1\U0001F1FA", "lengths": [9]},
    "MT": {"name": "Malta",                "dial": "+356", "flag": "\U0001F1F2\U0001F1F9", "lengths": [8]},
    "NL": {"name": "Netherlands",          "dial": "+31",  "flag": "\U0001F1F3\U0001F1F1", "lengths": [9]},
    "PL": {"name": "Poland",               "dial": "+48",  "flag": "\U0001F1F5\U0001F1F1", "lengths": [9]},
    "PT": {"name": "Portugal",             "dial": "+351", "flag": "\U0001F1F5\U0001F1F9", "lengths": [9]},
    "RO": {"name": "Romania",              "dial": "+40",  "flag": "\U0001F1F7\U0001F1F4", "lengths": [9]},
    "SK": {"name": "Slovakia",             "dial": "+421", "flag": "\U0001F1F8\U0001F1F0", "lengths": [9]},
    "SI": {"name": "Slovenia",             "dial": "+386", "flag": "\U0001F1F8\U0001F1EE", "lengths": [8]},
    "ES": {"name": "Spain",                "dial": "+34",  "flag": "\U0001F1EA\U0001F1F8", "lengths": [9]},
    "SE": {"name": "Sweden",               "dial": "+46",  "flag": "\U0001F1F8\U0001F1EA", "lengths": [7, 8, 9, 10]},
    # Additional
    "US": {"name": "United States",        "dial": "+1",   "flag": "\U0001F1FA\U0001F1F8", "lengths": [10]},
    "CA": {"name": "Canada",               "dial": "+1",   "flag": "\U0001F1E8\U0001F1E6", "lengths": [10]},
    "MX": {"name": "Mexico",               "dial": "+52",  "flag": "\U0001F1F2\U0001F1FD", "lengths": [10]},
    "AU": {"name": "Australia",            "dial": "+61",  "flag": "\U0001F1E6\U0001F1FA", "lengths": [9]},
}

# Aliases so the frontend can post either the ISO code or the country name.
_PHONE_NAME_INDEX = {v["name"].lower(): k for k, v in PHONE_COUNTRY_RULES.items()}


def normalize_phone_digits(v):
    """Strip everything except digits from a phone string."""
    return re.sub(r"\D", "", str(v or ""))


def resolve_phone_country(code_or_name):
    """Resolve an ISO-2 code or a country name to its PHONE_COUNTRY_RULES entry.

    Returns (iso_code, rule_dict) or (None, None).
    """
    if not code_or_name:
        return (None, None)
    key = str(code_or_name).strip()
    if key.upper() in PHONE_COUNTRY_RULES:
        iso = key.upper()
        return (iso, PHONE_COUNTRY_RULES[iso])
    iso = _PHONE_NAME_INDEX.get(key.lower())
    if iso:
        return (iso, PHONE_COUNTRY_RULES[iso])
    return (None, None)


def validate_phone_payload(country_in, phone_in):
    """Validate + normalize a (country, phone) pair.

    Returns (normalized_dict, error_message). normalized_dict has keys:
      phone_country, phone_country_code, phone_dial_code,
      phone_national, phone_e164.
    """
    iso, rule = resolve_phone_country(country_in)
    if not rule:
        return None, "Please choose a supported country for the phone number."
    national = normalize_phone_digits(phone_in)
    if not national:
        return None, "Enter a valid phone number for the selected country."
    if not national.isdigit():
        return None, "Enter a valid phone number for the selected country."
    # Reject "all the same digit" and trivial sequential placeholders.
    if len(set(national)) == 1:
        return None, "Enter a valid phone number for the selected country."
    if national in ("0123456789", "12345678", "123456789", "1234567890"):
        return None, "Enter a valid phone number for the selected country."
    if len(national) not in rule["lengths"]:
        return None, "Enter a valid phone number for the selected country."
    e164 = rule["dial"] + national
    return {
        "phone_country": rule["name"],
        "phone_country_code": iso,
        "phone_dial_code": rule["dial"],
        "phone_national": national,
        "phone_e164": e164,
    }, None


def _parse_iso_datetime(value):
    text = str(value or "").strip()
    if not text:
        return None
    try:
        parsed = datetime.fromisoformat(text.replace("Z", "+00:00").replace(" ", "T"))
        if parsed.tzinfo is not None:
            parsed = parsed.astimezone().replace(tzinfo=None)
        return parsed
    except Exception:
        return None


def _local_midnight_iso(day_value):
    return datetime.combine(day_value, datetime.min.time()).isoformat(timespec="seconds")


def _next_local_midnight_iso():
    return _local_midnight_iso(date.today() + timedelta(days=1))


def coupon_is_expired(expires_at):
    parsed = _parse_iso_datetime(expires_at)
    return bool(parsed and parsed <= datetime.now())


def expire_stale_spin_coupons(db, user_id=None):
    """Expire unused spin-generated coupons from previous local calendar days.

    Used coupons and coupons referenced by orders are preserved for history.
    """
    coupon_cols = _table_columns(db, "coupons")
    today = date.today().isoformat()
    params = []
    user_clause = ""
    if user_id is not None:
        user_clause = " AND uc.user_id=?"
        params.append(user_id)
    expired_at = _local_midnight_iso(date.today())
    count = 0
    if "source" in coupon_cols:
        rows = db.execute(
            f"""SELECT DISTINCT c.code,
                       c.expires_at AS coupon_expires_at,
                       uc.expires_at AS user_expires_at,
                       sh.spin_date
                  FROM coupons c
                  JOIN user_coupons uc ON uc.code=c.code
                  LEFT JOIN spin_history sh ON sh.coupon_code=c.code AND sh.user_id=uc.user_id
                 WHERE COALESCE(c.source,'admin')='spin'
                   AND COALESCE(uc.used,0)=0
                   {user_clause}
                   AND NOT EXISTS (
                        SELECT 1 FROM orders o WHERE o.coupon_code=c.code
                   )""",
            params,
        ).fetchall()
        for row in rows:
            code = row["code"]
            should_expire = (
                coupon_is_expired(row["coupon_expires_at"])
                or coupon_is_expired(row["user_expires_at"])
                or (row["spin_date"] and row["spin_date"] < today)
            )
            if not should_expire:
                continue
            db.execute(
                "UPDATE user_coupons SET expires_at=? WHERE code=? AND COALESCE(used,0)=0",
                (expired_at, code),
            )
            db.execute(
                """UPDATE coupons
                      SET expires_at=?, is_active=0
                    WHERE code=?
                      AND COALESCE(source,'admin')='spin'
                      AND NOT EXISTS (SELECT 1 FROM orders o WHERE o.coupon_code=coupons.code)""",
                (expired_at, code),
            )
            count += 1
        return count

    # Backward-compatible path for databases that have not yet run migration 8.
    rows = db.execute(
        f"""SELECT DISTINCT sh.coupon_code
              FROM spin_history sh
              JOIN user_coupons uc ON uc.user_id=sh.user_id AND uc.code=sh.coupon_code
             WHERE sh.coupon_code IS NOT NULL
               AND sh.spin_date < ?
               AND COALESCE(uc.used,0)=0
               {user_clause.replace('uc.user_id', 'sh.user_id')}
               AND NOT EXISTS (
                    SELECT 1 FROM orders o WHERE o.coupon_code=sh.coupon_code
               )""",
        [today] + params,
    ).fetchall()
    for row in rows:
        code = row["coupon_code"]
        db.execute(
            "UPDATE user_coupons SET expires_at=? WHERE code=? AND COALESCE(used,0)=0",
            (expired_at, code),
        )
        db.execute(
            """UPDATE coupons
                  SET expires_at=?, is_active=0
                WHERE code=?
                  AND NOT EXISTS (SELECT 1 FROM orders o WHERE o.coupon_code=coupons.code)""",
            (expired_at, code),
        )
        count += 1
    return count


# =====================================================================
# AUTH / SESSION HELPERS
# =====================================================================

def _get_session_token():
    return request.cookies.get(SESSION_COOKIE)


def _get_guest_token():
    return request.cookies.get(GUEST_COOKIE)


def _ensure_guest_token(response, db):
    """Return existing guest token, or create a new one + set the cookie on response."""
    token = _get_guest_token()
    if token:
        row = db.execute("SELECT token FROM guest_sessions WHERE token=?", (token,)).fetchone()
        if row:
            return token
    token = secrets.token_urlsafe(24)
    db.execute("INSERT INTO guest_sessions(token) VALUES(?)", (token,))
    db.commit()
    response.set_cookie(
        GUEST_COOKIE, token,
        max_age=COOKIE_MAX_AGE, httponly=True, samesite="Lax", path="/",
    )
    return token


def current_session_row(db=None):
    """Return the (sessions row + users row joined) or None."""
    token = _get_session_token()
    if not token:
        return None
    db = db or get_db()
    row = db.execute(
        """SELECT s.id AS session_id, s.token, s.user_id, s.role, s.expires_at, s.csrf_token,
                  s.revoked, u.name, u.email, u.is_admin, u.is_deleted
           FROM sessions s
           JOIN users u ON u.id = s.user_id
           WHERE s.token = ?""",
        (token,),
    ).fetchone()
    if not row: return None
    if row["revoked"]: return None
    if row["is_deleted"]: return None
    try:
        exp = datetime.fromisoformat(row["expires_at"])
        if exp < utcnow_naive():
            return None
    except Exception:
        pass
    return row


def current_user_id():
    s = current_session_row()
    return s["user_id"] if s else None


def is_admin():
    s = current_session_row()
    return bool(s and s["role"] == "admin")


def login_required(fn):
    @wraps(fn)
    def wrapper(*a, **kw):
        s = current_session_row()
        if not s:
            return err("Authentication required", 401)
        if s["role"] != "user" and s["role"] != "admin":
            return err("Forbidden", 403)
        return fn(*a, **kw)
    return wrapper


def admin_required(fn):
    @wraps(fn)
    def wrapper(*a, **kw):
        s = current_session_row()
        if not s:
            return err("Authentication required", 401)
        if s["role"] != "admin":
            return err("Admin access required", 403)
        return fn(*a, **kw)
    return wrapper


def create_session(db, user_id, role):
    token = secrets.token_urlsafe(32)
    csrf_token = secrets.token_urlsafe(32)
    expires = (utcnow_naive() + timedelta(days=30)).isoformat(timespec="seconds")
    db.execute(
        "INSERT INTO sessions(token, user_id, role, csrf_token, expires_at) VALUES(?,?,?,?,?)",
        (token, user_id, role, csrf_token, expires),
    )
    db.commit()
    return token, expires


def set_session_cookie(resp, token):
    resp.set_cookie(
        SESSION_COOKIE, token,
        max_age=COOKIE_MAX_AGE, httponly=True, samesite="Lax", path="/",
    )


def clear_session_cookie(resp):
    resp.set_cookie(SESSION_COOKIE, "", expires=0, path="/")


def audit(db, action, entity_type=None, entity_id=None, details=None):
    s = current_session_row(db)
    try:
        db.execute(
            """INSERT INTO audit_logs(user_id, actor_role, action, entity_type, entity_id, details_json)
               VALUES(?,?,?,?,?,?)""",
            (
                s["user_id"] if s else None,
                s["role"] if s else None,
                action, entity_type, str(entity_id) if entity_id is not None else None,
                json.dumps(details) if details is not None else None,
            ),
        )
    except Exception:
        pass


def client_ip():
    forwarded = (request.headers.get("X-Forwarded-For") or "").split(",")[0].strip()
    return forwarded or request.remote_addr or "unknown"


def rate_limit(scope, limit=10, window=60, subject=None):
    """Simple in-memory rate limiter for exam/dev use.

    Keyed by IP + route scope + optional subject (email/code). It is deliberately
    dependency-free and resets when the Flask process restarts.
    """
    now = time.time()
    ident = "|".join([client_ip(), scope, str(subject or "").lower()])
    bucket = [ts for ts in RATE_LIMITS.get(ident, []) if now - ts < window]
    if len(bucket) >= limit:
        retry = max(1, int(window - (now - bucket[0])))
        return err("Too many attempts. Please try again later.", 429, {"retry_after": retry})
    bucket.append(now)
    RATE_LIMITS[ident] = bucket
    return None


def ensure_session_csrf_token(db, session_row):
    token = session_row["csrf_token"] if "csrf_token" in session_row.keys() else None
    if token:
        return token
    token = secrets.token_urlsafe(32)
    db.execute("UPDATE sessions SET csrf_token=? WHERE id=?", (token, session_row["session_id"]))
    db.commit()
    return token


@app.before_request
def csrf_guard():
    if request.method in ("GET", "HEAD", "OPTIONS"):
        return None
    if not request.path.startswith("/api/"):
        return None
    # Login/signup must bootstrap a session before a session-bound CSRF token exists.
    if request.endpoint in {"api_login", "api_signup"}:
        return None
    db = get_db()
    session_row = current_session_row(db)
    if not session_row:
        return None
    expected = ensure_session_csrf_token(db, session_row)
    sent = request.headers.get(CSRF_HEADER) or request.headers.get("X-CSRF")
    if not sent or not secrets.compare_digest(str(sent), str(expected)):
        return err("Invalid or missing CSRF token.", 403)
    return None


# =====================================================================
# CART/WISHLIST HELPERS (user OR guest)
# =====================================================================

def get_cart_owner(db, response=None):
    """Returns ('user', user_id) when signed in, else ('guest', token).

    If guest and no cookie yet, mints one and attaches it to `response`.
    """
    uid = current_user_id()
    if uid:
        return ("user", uid)
    if response is None:
        # Read-only call - just return existing guest token if present.
        token = _get_guest_token()
        return ("guest", token) if token else ("guest", None)
    token = _ensure_guest_token(response, db)
    return ("guest", token)


def cart_table_for(owner_kind):
    return "cart_items" if owner_kind == "user" else "guest_cart_items"


def cart_id_col_for(owner_kind):
    return "user_id" if owner_kind == "user" else "guest_token"


def wishlist_table_for(owner_kind):
    return "wishlist_items" if owner_kind == "user" else "guest_wishlist_items"


def wishlist_id_col_for(owner_kind):
    return "user_id" if owner_kind == "user" else "guest_token"


def serialize_product(p, stock_by_size=None):
    if p is None:
        return None
    return {
        "id": p["product_code"] or f"db-{p['id']}",  # frontend ID
        "db_id": p["id"],
        "product_code": p["product_code"],
        "team": p["team"],
        "league": p["league"],
        "league_key": p["league_key"],
        "product_name": p["product_name"],
        "image_url": p["image_url"],
        "base_price": p["base_price"],
        "season": p["season"],
        "display_order": p["display_order"],
        "sales_rank": p["sales_rank"],
        "is_active": bool(p["is_active"]),
        "total_stock": sum((stock_by_size or {}).values()),
        "stock_by_size": stock_by_size or {},
    }


def product_by_code(db, code):
    """Resolve a frontend product code OR numeric db id to the products row."""
    if code is None:
        return None
    # If looks like "db-123" or "12", fall back to numeric id
    if isinstance(code, int) or (isinstance(code, str) and code.isdigit()):
        return db.execute("SELECT * FROM products WHERE id=?", (int(code),)).fetchone()
    if isinstance(code, str) and code.startswith("db-") and code[3:].isdigit():
        return db.execute("SELECT * FROM products WHERE id=?", (int(code[3:]),)).fetchone()
    return db.execute("SELECT * FROM products WHERE product_code=?", (str(code),)).fetchone()


def get_stock_by_size(db, product_id):
    rows = db.execute("SELECT size, quantity FROM inventory WHERE product_id=?", (product_id,)).fetchall()
    return {r["size"]: r["quantity"] for r in rows}


def total_stock(db, product_id):
    row = db.execute("SELECT COALESCE(SUM(quantity),0) AS s FROM inventory WHERE product_id=?",
                     (product_id,)).fetchone()
    return int(row["s"])


# =====================================================================
# STATIC FILE SERVING
# =====================================================================

@app.route("/")
def root_redirect():
    # The website always opens on Sign In. Sign In is the entry point;
    # the form itself offers "Continue browsing as guest" for visitors who
    # do not want to authenticate, and successful login dispatches the
    # appropriate redirect (Admin -> Admin.html, normal user -> the saved
    # protected redirect target or Home.html, guest -> Home.html via the
    # explicit guest button). Direct deep-links to /Home.html, /Account.html,
    # etc. continue to work and follow the existing per-page session rules.
    return redirect("/Auth.html", code=302)


# =====================================================================
# /api/health, /api/schema
# =====================================================================

@app.route("/api/health")
def api_health():
    return ok({
        "app": "Elite Kits",
        "status": "ok",
        "db_path": str(NEW_DB_PATH),
        "db_exists": NEW_DB_PATH.exists(),
        "original_db_exists": ORIGINAL_DB_PATH.exists(),
        "time": utcnow_naive().isoformat(),
    })


@app.route("/api/schema")
def api_schema():
    if not is_admin():
        return err("Admin access required", 403)
    db = get_db()
    info = {}
    for r in db.execute(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
    ).fetchall():
        cols = [{"name": c["name"], "type": c["type"], "notnull": bool(c["notnull"]), "pk": bool(c["pk"])}
                for c in db.execute(f"PRAGMA table_info({r['name']})").fetchall()]
        info[r["name"]] = cols
    return ok({"tables": info})


# =====================================================================
# AUTH ROUTES
# =====================================================================

def _serialize_user(u):
    cols = u.keys()
    return {
        "id": u["id"],
        "name": u["name"],
        "email": u["email"],
        "role": "admin" if u["is_admin"] else "user",
        "birthdate": u["birthdate"] if "birthdate" in cols else None,
        "phone": u["phone"] if "phone" in cols else None,
        "phone_country":      u["phone_country"]      if "phone_country"      in cols else None,
        "phone_country_code": u["phone_country_code"] if "phone_country_code" in cols else None,
        "phone_dial_code":    u["phone_dial_code"]    if "phone_dial_code"    in cols else None,
        "phone_national":     u["phone_national"]     if "phone_national"     in cols else None,
        "phone_e164":         u["phone_e164"]         if "phone_e164"         in cols else None,
        "created_at":   u["created_at"]   if "created_at"   in cols else None,
        "updated_at":   u["updated_at"]   if "updated_at"   in cols else None,
        "last_login_at": u["last_login_at"] if "last_login_at" in cols else None,
    }


@app.route("/api/auth/signup", methods=["POST"])
def api_signup():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip().lower()
    birthdate = (data.get("birthdate") or "").strip()
    password = data.get("password") or ""
    confirm = data.get("confirm_password") or data.get("confirmPassword") or data.get("confirm") or ""
    limited = rate_limit("auth_signup", 6, 600, email)
    if limited: return limited

    if not valid_name(name):
        return err("Please enter a valid name (letters, 2-50 chars).")
    if not valid_email(email):
        return err(email_problem_message(email))
    if birthdate and not valid_birthdate_age15(birthdate):
        return err("You must be at least 15 years old.")
    if not valid_password(password):
        return err("Password must be 8+ chars and include upper, lower, digit, and symbol.")
    # If the client supplied a confirm value, enforce it; otherwise trust the client-side check.
    if confirm and password != confirm:
        return err("Passwords do not match.")

    db = get_db()
    if db.execute("SELECT 1 FROM users WHERE email=?", (email,)).fetchone():
        return err("An account with that email already exists.", 409)

    cur = db.execute(
        """INSERT INTO users(name, email, password_hash, birthdate, is_admin, auth_provider, email_verified)
           VALUES(?,?,?,?,0,'local',0)""",
        (name, email, generate_password_hash(password), birthdate or None),
    )
    user_id = cur.lastrowid
    db.commit()

    token, _exp = create_session(db, user_id, "user")
    audit(db, "signup", "users", user_id)
    db.commit()

    u = db.execute("SELECT * FROM users WHERE id=?", (user_id,)).fetchone()
    resp = make_response(jsonify({"ok": True, "data": {"user": _serialize_user(u), "redirect": "Home.html"}}), 201)
    set_session_cookie(resp, token)
    return resp


@app.route("/api/auth/login", methods=["POST"])
def api_login():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    limited = rate_limit("auth_login", 8, 300, email)
    if limited: return limited
    if not email or not password:
        return err("Email and password are required.")

    db = get_db()
    u = db.execute("SELECT * FROM users WHERE email=? AND is_deleted=0", (email,)).fetchone()
    if not u or not verify_password(u["password_hash"], password):
        return err("Invalid email or password.", 401)

    role = "admin" if u["is_admin"] else "user"
    token, _exp = create_session(db, u["id"], role)
    db.execute("UPDATE users SET last_login_at=datetime('now') WHERE id=?", (u["id"],))
    audit(db, "login", "users", u["id"])
    db.commit()
    u = db.execute("SELECT * FROM users WHERE id=?", (u["id"],)).fetchone()

    redirect_target = "Admin.html" if role == "admin" else "Home.html"
    resp = make_response(jsonify({"ok": True, "data": {
        "user": _serialize_user(u),
        "redirect": redirect_target,
        "role": role,
    }}))
    set_session_cookie(resp, token)
    return resp


@app.route("/api/auth/logout", methods=["POST"])
def api_logout():
    db = get_db()
    token = _get_session_token()
    if token:
        db.execute("UPDATE sessions SET revoked=1 WHERE token=?", (token,))
        db.commit()
    resp = make_response(jsonify({"ok": True, "data": {}}))
    clear_session_cookie(resp)
    return resp


@app.route("/api/auth/me")
def api_me():
    s = current_session_row()
    if not s:
        return ok({"user": None, "role": "guest"})
    db = get_db()
    u = db.execute("SELECT * FROM users WHERE id=?", (s["user_id"],)).fetchone()
    return ok({"user": _serialize_user(u), "role": s["role"]})


@app.route("/api/csrf-token")
def api_csrf_token():
    db = get_db()
    s = current_session_row(db)
    if not s:
        return ok({"csrf_token": None, "authenticated": False})
    return ok({"csrf_token": ensure_session_csrf_token(db, s), "authenticated": True})


@app.route("/api/account/profile")
@login_required
def api_account_profile():
    db = get_db()
    u = db.execute("SELECT * FROM users WHERE id=?", (current_user_id(),)).fetchone()
    return ok({"user": _serialize_user(u)})


@app.route("/api/account/profile", methods=["PATCH"])
@login_required
def api_account_profile_update():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    birthdate = (data.get("birthdate") or "").strip() or None
    phone_country_in = (data.get("phone_country_code") or data.get("phone_country") or "").strip()
    phone_number_in = (data.get("phone_national") or data.get("phone") or data.get("phone_number") or "").strip()
    legacy_phone = (data.get("phone") or "").strip() or None
    if not valid_name(name):
        return err("Please enter a valid name (letters, 2-50 chars).")
    if birthdate and not valid_birthdate_age15(birthdate):
        return err("Birthdate must belong to a customer who is at least 15 years old.")

    phone_fields = None
    if phone_country_in or phone_number_in:
        phone_fields, phone_err = validate_phone_payload(phone_country_in, phone_number_in)
        if phone_err: return err(phone_err)

    db = get_db(); uid = current_user_id()
    if phone_fields:
        db.execute(
            """UPDATE users
                  SET name=?, birthdate=?, phone=?,
                      phone_country=?, phone_country_code=?, phone_dial_code=?,
                      phone_national=?, phone_e164=?,
                      updated_at=datetime('now')
                WHERE id=?""",
            (name, birthdate, phone_fields["phone_e164"],
             phone_fields["phone_country"], phone_fields["phone_country_code"],
             phone_fields["phone_dial_code"], phone_fields["phone_national"],
             phone_fields["phone_e164"], uid),
        )
    else:
        # No phone supplied (or supplied as legacy free-text only) — preserve previous behavior.
        if legacy_phone and not re.match(r"^[+0-9][0-9 .()\-]{5,24}$", legacy_phone):
            return err("Please enter a valid phone number.")
        db.execute(
            "UPDATE users SET name=?, birthdate=?, phone=?, updated_at=datetime('now') WHERE id=?",
            (name, birthdate, legacy_phone, uid),
        )
    audit(db, "profile_update", "users", uid, {"fields": ["name", "birthdate", "phone"]})
    db.commit()
    u = db.execute("SELECT * FROM users WHERE id=?", (uid,)).fetchone()
    return ok({"user": _serialize_user(u)})


@app.route("/api/account/password", methods=["PATCH"])
@login_required
def api_account_password_update():
    limited = rate_limit("account_password", 5, 300, current_user_id())
    if limited: return limited
    data = request.get_json(silent=True) or {}
    current_password = data.get("current_password") or data.get("currentPassword") or ""
    new_password = data.get("new_password") or data.get("newPassword") or ""
    confirm = data.get("confirm_password") or data.get("confirmPassword") or ""
    if not current_password:
        return err("Current password is required.")
    if not valid_password(new_password):
        return err("New password must be 8+ chars and include upper, lower, digit, and symbol.")
    if confirm and new_password != confirm:
        return err("New passwords do not match.")
    db = get_db(); uid = current_user_id()
    u = db.execute("SELECT * FROM users WHERE id=?", (uid,)).fetchone()
    if not u or not verify_password(u["password_hash"], current_password):
        return err("Current password is incorrect.", 403)
    db.execute(
        "UPDATE users SET password_hash=?, updated_at=datetime('now') WHERE id=?",
        (generate_password_hash(new_password), uid),
    )
    audit(db, "password_change", "users", uid)
    db.commit()
    return ok({"changed": True})


@app.route("/api/account/phone", methods=["DELETE"])
@login_required
def api_account_phone_delete():
    limited = rate_limit("account_phone_delete", 20, 300, current_user_id())
    if limited: return limited
    db = get_db(); uid = current_user_id()
    db.execute(
        """UPDATE users
              SET phone=NULL,
                  phone_country=NULL,
                  phone_country_code=NULL,
                  phone_dial_code=NULL,
                  phone_national=NULL,
                  phone_e164=NULL,
                  updated_at=datetime('now')
            WHERE id=?""",
        (uid,),
    )
    audit(db, "phone_delete", "users", uid)
    db.commit()
    u = db.execute("SELECT * FROM users WHERE id=?", (uid,)).fetchone()
    return ok({"removed": True, "user": _serialize_user(u)})


@app.route("/api/account", methods=["DELETE"])
@login_required
def api_account_delete():
    limited = rate_limit("account_delete", 5, 600, current_user_id())
    if limited: return limited
    data = request.get_json(silent=True) or {}
    confirmation = str(data.get("confirmation") or data.get("confirm") or "").strip().upper()
    if confirmation != "DELETE":
        return err("Type DELETE to confirm account deletion.")
    db = get_db(); uid = current_user_id()
    u = db.execute("SELECT * FROM users WHERE id=?", (uid,)).fetchone()
    if not u:
        return err("Account not found", 404)
    if u["is_admin"]:
        return err("Admin accounts cannot be deleted from the customer account page.", 403)
    # Defensive for a long-running dev server started before migration 7 was
    # added. Normal startup still applies this through _run_schema_migrations.
    if "deleted_at" not in _table_columns(db, "users"):
        db.execute("ALTER TABLE users ADD COLUMN deleted_at TEXT")
    anon_email = f"deleted-{uid}-{uuid.uuid4().hex[:8]}@deleted.elitekits.local"
    db.execute("DELETE FROM cart_items WHERE user_id=?", (uid,))
    db.execute("DELETE FROM wishlist_items WHERE user_id=?", (uid,))
    db.execute("UPDATE sessions SET revoked=1 WHERE user_id=?", (uid,))
    db.execute(
        """UPDATE users
              SET name='Deleted User',
                  email=?,
                  password_hash=?,
                  birthdate=NULL,
                  phone=NULL,
                  phone_country=NULL,
                  phone_country_code=NULL,
                  phone_dial_code=NULL,
                  phone_national=NULL,
                  phone_e164=NULL,
                  is_deleted=1,
                  deleted_at=datetime('now'),
                  updated_at=datetime('now')
            WHERE id=?""",
        (anon_email, generate_password_hash(secrets.token_urlsafe(32)), uid),
    )
    audit(db, "account_delete", "users", uid, {"soft_delete": True})
    db.commit()
    resp = make_response(jsonify({"ok": True, "data": {"deleted": True, "soft_deleted": True}}))
    clear_session_cookie(resp)
    return resp


@app.route("/api/auth/merge-guest", methods=["POST"])
def api_merge_guest():
    """Merge guest cart + wishlist into the signed-in user account."""
    uid = current_user_id()
    if not uid:
        return err("Authentication required", 401)
    gtoken = _get_guest_token()
    if not gtoken:
        return ok({"merged_cart": 0, "merged_wishlist": 0})
    db = get_db()
    # Cart merge
    merged_cart = 0
    for r in db.execute(
        "SELECT product_id, size, qty, print_enabled, print_text, print_number_value "
        "FROM guest_cart_items WHERE guest_token=?",
        (gtoken,),
    ).fetchall():
        # Find existing user line.
        existing = db.execute(
            """SELECT id, qty FROM cart_items
               WHERE user_id=? AND product_id=? AND IFNULL(size,'')=IFNULL(?,'')
                 AND print_enabled=? AND IFNULL(print_text,'')=IFNULL(?,'')
                 AND IFNULL(print_number_value,'')=IFNULL(?,'')""",
            (uid, r["product_id"], r["size"], r["print_enabled"],
             r["print_text"], r["print_number_value"]),
        ).fetchone()
        if existing:
            new_qty = max(1, existing["qty"] + r["qty"])
            # Enforce stock for the matching size
            cap = total_stock_for_size_or_total(db, r["product_id"], r["size"])
            if cap and cap > 0:
                new_qty = min(new_qty, cap)
            db.execute(
                "UPDATE cart_items SET qty=?, updated_at=datetime('now') WHERE id=?",
                (new_qty, existing["id"]),
            )
        else:
            db.execute(
                """INSERT INTO cart_items
                   (user_id, product_id, size, qty, print_enabled, print_text, print_number_value)
                   VALUES(?,?,?,?,?,?,?)""",
                (uid, r["product_id"], r["size"], r["qty"], r["print_enabled"],
                 r["print_text"], r["print_number_value"]),
            )
        merged_cart += 1

    merged_wishlist = 0
    for r in db.execute(
        "SELECT product_id FROM guest_wishlist_items WHERE guest_token=?", (gtoken,)
    ).fetchall():
        try:
            db.execute(
                "INSERT OR IGNORE INTO wishlist_items(user_id, product_id) VALUES(?,?)",
                (uid, r["product_id"]),
            )
            merged_wishlist += 1
        except Exception:
            pass

    db.execute("DELETE FROM guest_cart_items WHERE guest_token=?", (gtoken,))
    db.execute("DELETE FROM guest_wishlist_items WHERE guest_token=?", (gtoken,))
    db.commit()

    return ok({"merged_cart": merged_cart, "merged_wishlist": merged_wishlist})


def total_stock_for_size_or_total(db, product_id, size):
    if size:
        row = db.execute(
            "SELECT quantity FROM inventory WHERE product_id=? AND size=?",
            (product_id, size),
        ).fetchone()
        return int(row["quantity"]) if row else 0
    return total_stock(db, product_id)


# =====================================================================
# PRODUCTS / LEAGUES
# =====================================================================

@app.route("/api/products")
def api_products():
    db = get_db()
    league = request.args.get("league")
    search = (request.args.get("search") or "").strip().lower()
    stock_filter = (request.args.get("stock") or "").strip().lower()
    sort = (request.args.get("sort") or "").strip().lower()
    active = request.args.get("active")

    sql = "SELECT * FROM products WHERE 1=1"
    params = []
    if active is not None:
        sql += " AND is_active=?"
        params.append(1 if str(active).lower() in ("1","true","yes") else 0)
    if league:
        league_key, league_display = _canonical_league(league)
        sql += " AND (league_key=? OR league=?)"
        params += [league_key, league_display]
    rows = db.execute(sql, params).fetchall()

    out = []
    for p in rows:
        stock_map = get_stock_by_size(db, p["id"])
        item = serialize_product(p, stock_map)
        if search:
            hay = " ".join(filter(None, [item["team"], item["product_name"], item["league"]])).lower()
            if search not in hay:
                continue
        if stock_filter == "in":
            if item["total_stock"] <= 0: continue
        elif stock_filter == "out":
            if item["total_stock"] > 0: continue
        out.append(item)

    if sort == "price-asc":
        out.sort(key=lambda x: (x["base_price"], x["display_order"]))
    elif sort == "price-desc":
        out.sort(key=lambda x: (-x["base_price"], x["display_order"]))
    elif sort == "team":
        out.sort(key=lambda x: x["team"].lower())
    elif sort == "stock-desc":
        out.sort(key=lambda x: -x["total_stock"])
    elif sort == "popular":
        out.sort(key=lambda x: -(x["sales_rank"] or 0))
    else:
        out.sort(key=lambda x: x["display_order"])

    return ok({"products": out, "count": len(out)})


@app.route("/api/products/<product_id>")
def api_product_get(product_id):
    db = get_db()
    p = product_by_code(db, product_id)
    if not p:
        return err("Product not found", 404)
    return ok({"product": serialize_product(p, get_stock_by_size(db, p["id"]))})


@app.route("/api/leagues")
def api_leagues():
    db = get_db()
    out = []
    for key, fname in LEAGUE_PAGE_FILES.items():
        display = next((v[1] for v in LEAGUE_KEYS.values() if v[0] == key), key)
        count = db.execute(
            "SELECT COUNT(*) AS c FROM products WHERE league_key=? AND is_active=1",
            (key,),
        ).fetchone()["c"]
        out.append({
            "key": key,
            "league": display,
            "file": fname,
            "logo": LEAGUE_LOGOS.get(key, ""),
            "product_count": count,
        })
    return ok({"leagues": out})


# =====================================================================
# INVENTORY (admin)
# =====================================================================

@app.route("/api/inventory")
@admin_required
def api_inventory_list():
    db = get_db()
    rows = db.execute(
        """SELECT p.id AS product_id, p.product_code, p.team, p.league, p.league_key,
                  i.size, i.quantity, i.updated_at
           FROM inventory i JOIN products p ON p.id = i.product_id
           ORDER BY p.team, i.size"""
    ).fetchall()
    out = []
    for r in rows:
        out.append({
            "product_id": r["product_code"] or f"db-{r['product_id']}",
            "db_id": r["product_id"],
            "team": r["team"],
            "league": r["league"],
            "league_key": r["league_key"],
            "size": r["size"],
            "quantity": r["quantity"],
            "updated_at": r["updated_at"],
        })
    return ok({"inventory": out})


@app.route("/api/inventory/<product_id>", methods=["PATCH"])
@admin_required
def api_inventory_update(product_id):
    data = request.get_json(silent=True) or {}
    size = str(data.get("size") or "").strip().upper()
    if not size or size == "ALL":
        return err("A specific size is required")
    if size not in VALID_SIZES:
        return err("Invalid size")

    db = get_db()
    p = product_by_code(db, product_id)
    if not p: return err("Product not found", 404)

    db_id = p["id"]

    # delta or quantity
    if "quantity" in data:
        try:
            q = int(data["quantity"])
        except Exception:
            return err("quantity must be an integer")
        if q < 0:
            return err("Stock cannot be negative")
        db.execute(
            """INSERT INTO inventory(product_id, size, quantity)
               VALUES(?,?,?)
               ON CONFLICT(product_id,size) DO UPDATE SET quantity=excluded.quantity, updated_at=datetime('now')""",
            (db_id, size, q),
        )
        audit(db, "inventory_set", "products", db_id, {"size": size, "quantity": q})
    elif "delta" in data:
        try:
            d = int(data["delta"])
        except Exception:
            return err("delta must be an integer")
        row = db.execute("SELECT quantity FROM inventory WHERE product_id=? AND size=?", (db_id, size)).fetchone()
        current = int(row["quantity"]) if row else 0
        new_q = current + d
        if new_q < 0:
            return err("Stock cannot go negative", 409)
        db.execute(
            """INSERT INTO inventory(product_id, size, quantity)
               VALUES(?,?,?)
               ON CONFLICT(product_id,size) DO UPDATE SET quantity=excluded.quantity, updated_at=datetime('now')""",
            (db_id, size, new_q),
        )
        audit(db, "inventory_delta", "products", db_id, {"size": size, "delta": d, "new": new_q})
    else:
        return err("Provide either `quantity` or `delta`")

    db.commit()
    stock_map = get_stock_by_size(db, db_id)
    product = serialize_product(p, stock_map)
    return ok({
        "product_id": p["product_code"] or f"db-{db_id}",
        "db_id": db_id,
        "total_stock": product["total_stock"],
        "stock_by_size": stock_map,
        "product": product,
    })


@app.route("/api/products/<product_id>/active", methods=["PATCH"])
@admin_required
def api_product_set_active(product_id):
    data = request.get_json(silent=True) or {}
    if "is_active" not in data:
        return err("is_active is required")
    is_active = 1 if data["is_active"] else 0
    db = get_db()
    p = product_by_code(db, product_id)
    if not p: return err("Product not found", 404)
    db.execute("UPDATE products SET is_active=?, updated_at=datetime('now') WHERE id=?", (is_active, p["id"]))
    audit(db, "product_active", "products", p["id"], {"is_active": is_active})
    db.commit()
    return ok({"product_id": p["product_code"] or f"db-{p['id']}", "is_active": bool(is_active)})


# =====================================================================
# CART
# =====================================================================

def _serialize_cart_row(db, row, owner_kind):
    p = db.execute("SELECT * FROM products WHERE id=?", (row["product_id"],)).fetchone()
    if not p: return None
    stock_map = get_stock_by_size(db, p["id"])
    return {
        "cart_item_id": row["id"],
        "id": p["product_code"] or f"db-{p['id']}",
        "db_id": p["id"],
        "team": p["team"],
        "league": p["league"],
        "league_key": p["league_key"],
        "image_url": p["image_url"],
        "base_price": p["base_price"],
        "size": row["size"] or "",
        "quantity": row["qty"],
        "personalize": bool(row["print_enabled"]),
        "customName": row["print_text"] or "",
        "customNumber": row["print_number_value"] or "",
        "stock_by_size": stock_map,
        "total_stock": sum(stock_map.values()),
        # legacy compatibility fields for app.js (lineId etc.)
        "lineId": f"db-{row['id']}",
    }


def _list_cart(db, owner_kind, owner_value):
    tbl = cart_table_for(owner_kind)
    col = cart_id_col_for(owner_kind)
    rows = db.execute(
        f"SELECT * FROM {tbl} WHERE {col}=? ORDER BY id ASC", (owner_value,)
    ).fetchall()
    out = []
    for r in rows:
        s = _serialize_cart_row(db, r, owner_kind)
        if s: out.append(s)
    return out


@app.route("/api/cart")
def api_cart_get():
    db = get_db()
    resp = make_response()
    owner_kind, owner_value = get_cart_owner(db, resp)
    if owner_value is None:
        body = {"ok": True, "data": {"items": []}}
        resp.set_data(json.dumps(body)); resp.mimetype = "application/json"
        return resp
    items = _list_cart(db, owner_kind, owner_value)
    body = {"ok": True, "data": {"items": items}}
    resp.set_data(json.dumps(body)); resp.mimetype = "application/json"
    return resp


@app.route("/api/cart/items", methods=["POST"])
def api_cart_add():
    data = request.get_json(silent=True) or {}
    product_code = data.get("product") or data.get("product_id") or data.get("product_code") or data.get("id")
    size = (data.get("size") or "").upper() or None
    qty = int(data.get("qty") or data.get("quantity") or 1)
    print_enabled = 1 if truthy_flag(data.get("print_enabled", data.get("personalize", False))) else 0
    print_text = (data.get("print_text") or data.get("customName") or data.get("custom_name") or "").strip().upper() or None
    print_number = (str(data.get("print_number") or data.get("customNumber") or data.get("custom_number") or "")).strip() or None

    if qty < 1: return err("qty must be >= 1")
    if size and size not in VALID_SIZES: return err("Invalid size")
    if not print_enabled:
        print_text = None
        print_number = None
    if print_text and not valid_print_name(print_text):
        return err("Name must include at least one letter. Numbers are allowed, but the name cannot be numbers only.")
    if print_number and (not print_number.isdigit() or not (0 <= int(print_number) <= 99)):
        return err("Personalization number must be 0-99")

    db = get_db()
    resp = make_response()
    owner_kind, owner_value = get_cart_owner(db, resp)
    p = product_by_code(db, product_code)
    if not p: return err("Product not found", 404)

    # Enforce stock
    cap_total = total_stock(db, p["id"])
    if cap_total <= 0:
        return err("This product is out of stock", 409)
    if size:
        cap_size = total_stock_for_size_or_total(db, p["id"], size)
        if cap_size <= 0:
            return err(f"Size {size} is out of stock", 409)
        qty = min(qty, cap_size)
    else:
        qty = min(qty, cap_total)

    tbl = cart_table_for(owner_kind)
    col = cart_id_col_for(owner_kind)

    existing = db.execute(
        f"""SELECT id, qty FROM {tbl}
            WHERE {col}=? AND product_id=? AND IFNULL(size,'')=IFNULL(?,'')
              AND print_enabled=? AND IFNULL(print_text,'')=IFNULL(?,'')
              AND IFNULL(print_number_value,'')=IFNULL(?,'')""",
        (owner_value, p["id"], size, print_enabled, print_text, print_number),
    ).fetchone()
    if existing:
        new_qty = existing["qty"] + qty
        if size:
            new_qty = min(new_qty, total_stock_for_size_or_total(db, p["id"], size))
        else:
            new_qty = min(new_qty, cap_total)
        db.execute(f"UPDATE {tbl} SET qty=?, updated_at=datetime('now') WHERE id=?", (new_qty, existing["id"]))
    else:
        db.execute(
            f"""INSERT INTO {tbl}({col}, product_id, size, qty, print_enabled, print_text, print_number_value)
                VALUES(?,?,?,?,?,?,?)""",
            (owner_value, p["id"], size, qty, print_enabled, print_text, print_number),
        )
    db.commit()
    items = _list_cart(db, owner_kind, owner_value)
    body = {"ok": True, "data": {"items": items}}
    resp.set_data(json.dumps(body)); resp.mimetype = "application/json"
    return resp


@app.route("/api/cart/items/<int:cart_item_id>", methods=["PATCH"])
def api_cart_update(cart_item_id):
    data = request.get_json(silent=True) or {}
    db = get_db()
    resp = make_response()
    owner_kind, owner_value = get_cart_owner(db, resp)
    if owner_value is None: return err("Cart not found", 404)
    tbl = cart_table_for(owner_kind); col = cart_id_col_for(owner_kind)
    row = db.execute(f"SELECT * FROM {tbl} WHERE id=? AND {col}=?", (cart_item_id, owner_value)).fetchone()
    if not row: return err("Cart item not found", 404)

    new_size = (data.get("size") or row["size"] or "").upper() or None
    if new_size and new_size not in VALID_SIZES:
        return err("Invalid size")

    new_print_enabled = data.get("print_enabled", data.get("personalize", row["print_enabled"]))
    new_print_enabled = 1 if truthy_flag(new_print_enabled) else 0
    new_print_text = data.get("print_text", data.get("customName", row["print_text"]))
    new_print_text = (str(new_print_text or "").strip().upper() or None)
    new_print_number = data.get("print_number", data.get("customNumber", row["print_number_value"]))
    new_print_number = (str(new_print_number or "").strip() or None)
    if not new_print_enabled:
        new_print_text = None
        new_print_number = None
    if new_print_text and not valid_print_name(new_print_text):
        return err("Name must include at least one letter. Numbers are allowed, but the name cannot be numbers only.")
    if new_print_number and (not new_print_number.isdigit() or not (0 <= int(new_print_number) <= 99)):
        return err("Personalization number must be 0-99")
    new_qty = int(data.get("qty", data.get("quantity", row["qty"])))
    if new_qty < 1: return err("qty must be >= 1")
    cap = total_stock_for_size_or_total(db, row["product_id"], new_size)
    if cap <= 0 and new_size:
        return err(f"Size {new_size} is out of stock", 409)
    if cap > 0:
        new_qty = min(new_qty, cap)

    db.execute(
        f"""UPDATE {tbl} SET size=?, qty=?, print_enabled=?, print_text=?, print_number_value=?,
            updated_at=datetime('now') WHERE id=?""",
        (new_size, new_qty, new_print_enabled, new_print_text, new_print_number, cart_item_id),
    )
    db.commit()
    items = _list_cart(db, owner_kind, owner_value)
    body = {"ok": True, "data": {"items": items}}
    resp.set_data(json.dumps(body)); resp.mimetype = "application/json"
    return resp


@app.route("/api/cart/items/<int:cart_item_id>", methods=["DELETE"])
def api_cart_remove(cart_item_id):
    db = get_db()
    resp = make_response()
    owner_kind, owner_value = get_cart_owner(db, resp)
    if owner_value is None: return err("Cart not found", 404)
    tbl = cart_table_for(owner_kind); col = cart_id_col_for(owner_kind)
    db.execute(f"DELETE FROM {tbl} WHERE id=? AND {col}=?", (cart_item_id, owner_value))
    db.commit()
    items = _list_cart(db, owner_kind, owner_value)
    body = {"ok": True, "data": {"items": items}}
    resp.set_data(json.dumps(body)); resp.mimetype = "application/json"
    return resp


@app.route("/api/cart", methods=["DELETE"])
def api_cart_clear():
    db = get_db()
    resp = make_response()
    owner_kind, owner_value = get_cart_owner(db, resp)
    if owner_value is None: return ok({"items": []})
    tbl = cart_table_for(owner_kind); col = cart_id_col_for(owner_kind)
    db.execute(f"DELETE FROM {tbl} WHERE {col}=?", (owner_value,))
    db.commit()
    body = {"ok": True, "data": {"items": []}}
    resp.set_data(json.dumps(body)); resp.mimetype = "application/json"
    return resp


@app.route("/api/cart/validate", methods=["POST"])
def api_cart_validate():
    db = get_db()
    owner_kind, owner_value = get_cart_owner(db, None)
    if owner_value is None:
        return ok({"valid": False, "errors": ["Your cart is empty."]})
    items = _list_cart(db, owner_kind, owner_value)
    errors = []
    if not items:
        errors.append("Your cart is empty.")
    for it in items:
        if not it["size"]:
            errors.append(f"Choose a size for {it['team']}.")
        cap = total_stock_for_size_or_total(db, it["db_id"], it["size"] or None)
        if cap <= 0:
            errors.append(f"{it['team']} ({it['size'] or 'no size'}) is out of stock.")
        elif it["quantity"] > cap:
            errors.append(f"Only {cap} of {it['team']} ({it['size']}) available.")
        if it["personalize"] and not (it["customName"] or it["customNumber"]):
            errors.append(f"Enter a name or number for {it['team']}, or turn off personalization.")
        if it["customName"] and not valid_print_name(it["customName"]):
            errors.append(f"Name for {it['team']} must include at least one letter. Numbers are allowed, but the name cannot be numbers only.")
        if it["customNumber"] and (not str(it["customNumber"]).isdigit() or int(it["customNumber"]) > 99):
            errors.append(f"Number for {it['team']} must be 0-99.")
    return ok({"valid": not errors, "errors": errors})


@app.route("/api/cart/summary")
def api_cart_summary():
    db = get_db()
    owner_kind, owner_value = get_cart_owner(db, None)
    items = _list_cart(db, owner_kind, owner_value) if owner_value else []
    subtotal = sum(it["base_price"] * it["quantity"] for it in items)
    print_total = sum(CUSTOMIZATION_FEE * it["quantity"]
                      for it in items
                      if it["personalize"] and (it["customName"] or it["customNumber"]))
    delivery_fee = DELIVERY_FEE if items else 0.0
    discount_total = 0.0
    coupon_code = None

    # Optional active coupon by code in querystring or session storage hint
    code = request.args.get("coupon")
    if code:
        cp = db.execute("SELECT * FROM coupons WHERE code=?", (code.upper(),)).fetchone()
        if cp:
            coupon_code = cp["code"]
            if cp["type"] == "percent":
                discount_total = round((subtotal + print_total) * (cp["value"] / 100.0), 2)
            elif cp["type"] == "fixed":
                discount_total = round(min(cp["value"], subtotal + print_total), 2)
            elif cp["type"] == "delivery":
                discount_total = delivery_fee
                delivery_fee = 0.0
    grand_total = max(0.0, subtotal + print_total + delivery_fee - discount_total)
    return ok({
        "subtotal": round(subtotal, 2),
        "print_total": round(print_total, 2),
        "delivery_fee": round(delivery_fee, 2),
        "discount_total": round(discount_total, 2),
        "grand_total": round(grand_total, 2),
        "coupon_code": coupon_code,
        "item_count": sum(it["quantity"] for it in items),
    })


# =====================================================================
# WISHLIST
# =====================================================================

def _list_wishlist(db, owner_kind, owner_value):
    tbl = wishlist_table_for(owner_kind); col = wishlist_id_col_for(owner_kind)
    rows = db.execute(f"SELECT product_id FROM {tbl} WHERE {col}=? ORDER BY id ASC",
                      (owner_value,)).fetchall()
    out = []
    for r in rows:
        p = db.execute("SELECT * FROM products WHERE id=?", (r["product_id"],)).fetchone()
        if p:
            out.append(serialize_product(p, get_stock_by_size(db, p["id"])))
    return out


@app.route("/api/wishlist")
def api_wishlist():
    db = get_db()
    resp = make_response()
    owner_kind, owner_value = get_cart_owner(db, resp)
    items = _list_wishlist(db, owner_kind, owner_value) if owner_value else []
    body = {"ok": True, "data": {"items": items}}
    resp.set_data(json.dumps(body)); resp.mimetype = "application/json"
    return resp


@app.route("/api/wishlist/<product_id>", methods=["POST"])
def api_wishlist_toggle(product_id):
    db = get_db()
    resp = make_response()
    owner_kind, owner_value = get_cart_owner(db, resp)
    p = product_by_code(db, product_id)
    if not p: return err("Product not found", 404)
    tbl = wishlist_table_for(owner_kind); col = wishlist_id_col_for(owner_kind)
    existing = db.execute(f"SELECT id FROM {tbl} WHERE {col}=? AND product_id=?",
                          (owner_value, p["id"])).fetchone()
    if existing:
        db.execute(f"DELETE FROM {tbl} WHERE id=?", (existing["id"],))
        added = False
    else:
        db.execute(f"INSERT INTO {tbl}({col}, product_id) VALUES(?,?)", (owner_value, p["id"]))
        added = True
    db.commit()
    body = {"ok": True, "data": {"added": added,
                                 "items": _list_wishlist(db, owner_kind, owner_value)}}
    resp.set_data(json.dumps(body)); resp.mimetype = "application/json"
    return resp


@app.route("/api/wishlist/<product_id>", methods=["DELETE"])
def api_wishlist_remove(product_id):
    db = get_db()
    resp = make_response()
    owner_kind, owner_value = get_cart_owner(db, resp)
    p = product_by_code(db, product_id)
    if not p: return err("Product not found", 404)
    tbl = wishlist_table_for(owner_kind); col = wishlist_id_col_for(owner_kind)
    db.execute(f"DELETE FROM {tbl} WHERE {col}=? AND product_id=?", (owner_value, p["id"]))
    db.commit()
    body = {"ok": True, "data": {"items": _list_wishlist(db, owner_kind, owner_value)}}
    resp.set_data(json.dumps(body)); resp.mimetype = "application/json"
    return resp


@app.route("/api/wishlist", methods=["DELETE"])
def api_wishlist_clear():
    db = get_db()
    resp = make_response()
    owner_kind, owner_value = get_cart_owner(db, resp)
    if owner_value is not None:
        tbl = wishlist_table_for(owner_kind); col = wishlist_id_col_for(owner_kind)
        db.execute(f"DELETE FROM {tbl} WHERE {col}=?", (owner_value,))
        db.commit()
    body = {"ok": True, "data": {"items": []}}
    resp.set_data(json.dumps(body)); resp.mimetype = "application/json"
    return resp


# =====================================================================
# ORDERS / CHECKOUT
# =====================================================================

def _serialize_order(db, order_row, include_items=True):
    cols = order_row.keys()
    out = {
        "order_code": order_row["order_code"],
        "user_id": order_row["user_id"],
        "user_name": order_row["user_name"],
        "email": order_row["email"],
        "state": order_row["state"],
        "city": order_row["city"],
        "road": order_row["road"],
        "subtotal": order_row["subtotal"],
        "print_total": order_row["print_total"],
        "delivery_fee": order_row["delivery_fee"],
        "discount_total": order_row["discount_total"],
        "grand_total": order_row["grand_total"],
        "status": order_row["status"],
        "coupon_code": order_row["coupon_code"],
        "created_at": order_row["created_at"],
        "rating": order_row["rating"],
        "phone_country":      order_row["phone_country"]      if "phone_country"      in cols else None,
        "phone_country_code": order_row["phone_country_code"] if "phone_country_code" in cols else None,
        "phone_dial_code":    order_row["phone_dial_code"]    if "phone_dial_code"    in cols else None,
        "phone_national":     order_row["phone_national"]     if "phone_national"     in cols else None,
        "phone_e164":         order_row["phone_e164"]         if "phone_e164"         in cols else None,
    }
    if include_items:
        items_rows = db.execute(
            """SELECT oi.*, p.product_code, p.image_url
               FROM order_items oi LEFT JOIN products p ON p.id=oi.product_id
               WHERE oi.order_id=?""",
            (order_row["id"],),
        ).fetchall()
        out["items"] = [{
            "id": (r["product_code"] or f"db-{r['product_id']}"),
            "order_item_id": r["id"],
            "team": r["team"], "league": r["league"], "qty": r["qty"],
            "size": r["size"], "unit_price": r["unit_price"],
            "personalize": bool(r["print_enabled"]),
            "customName": r["print_text"] or "",
            "customNumber": r["print_number"] or "",
            "line_total": r["line_total"],
            "image_url": r["image_url"],
        } for r in items_rows]
    # Mirror rating from ratings table if richer info is requested
    rrow = db.execute(
        "SELECT rating, comment FROM ratings WHERE order_id=?",
        (order_row["id"],),
    ).fetchone()
    if rrow:
        out["rating"] = rrow["rating"]
        out["rating_comment"] = rrow["comment"]
    if _table_exists(db, "order_status_history"):
        history_rows = db.execute(
            """SELECT h.id, h.status, h.note, h.created_at, u.name AS created_by_name
               FROM order_status_history h
               LEFT JOIN users u ON u.id=h.created_by
               WHERE h.order_id=?
               ORDER BY h.created_at, h.id""",
            (order_row["id"],),
        ).fetchall()
        out["timeline"] = [dict(r) for r in history_rows]
    return out


@app.route("/api/orders/checkout", methods=["POST"])
@login_required
def api_checkout():
    limited = rate_limit("checkout", 8, 300, current_user_id())
    if limited: return limited
    uid = current_user_id()
    data = request.get_json(silent=True) or {}
    name = (data.get("customer_name") or data.get("name") or "").strip()
    email = (data.get("email") or "").strip().lower()
    state = normalize_address_field(data.get("state") or data.get("governorate"))
    city = normalize_address_field(data.get("city"))
    road = normalize_address_field(data.get("road") or data.get("street"))
    card = data.get("card_number") or data.get("card") or ""
    expiry = data.get("expiry") or ""
    cvv = data.get("cvv") or ""
    coupon_code = (data.get("coupon_code") or "").strip().upper()
    phone_country_in = data.get("phone_country_code") or data.get("phone_country") or ""
    phone_number_in = data.get("phone_national") or data.get("phone") or data.get("phone_number") or ""

    # Validation
    if not valid_name(name): return err("Please enter a valid name.")
    if not valid_email(email): return err("Please enter a valid email.")
    if not state: return err("State / governorate is required.")
    if not valid_city(city): return err("Please enter a valid city.")
    if not valid_road(road): return err("Please enter a valid road / street.")
    phone_fields, phone_err = validate_phone_payload(phone_country_in, phone_number_in)
    if phone_err: return err(phone_err)
    if not luhn_valid(card): return err("Card number must be exactly 16 digits and pass card validation.")
    expiry_msg = expiry_validation_message(expiry)
    if expiry_msg: return err(expiry_msg)
    if not valid_cvv(cvv): return err("CVV must be exactly 3 digits.")

    db = get_db()
    if expire_stale_spin_coupons(db, uid):
        db.commit()
    # Cart belongs to the logged-in user.
    items = _list_cart(db, "user", uid)
    if not items: return err("Your cart is empty.")

    # Validate cart
    for it in items:
        if not it["size"]: return err(f"Choose a size for {it['team']}.")
        cap = total_stock_for_size_or_total(db, it["db_id"], it["size"])
        if cap < it["quantity"]:
            return err(f"Only {cap} of {it['team']} ({it['size']}) available.", 409)
        if it["personalize"] and not (it["customName"] or it["customNumber"]):
            return err(f"Enter a name or number for {it['team']}, or turn off personalization.")
        if it["customName"] and not valid_print_name(it["customName"]):
            return err(f"Personalization name for {it['team']} must include at least one letter. Numbers are allowed, but the name cannot be numbers only.")
        if it["customNumber"] and (not str(it["customNumber"]).isdigit() or int(it["customNumber"]) > 99):
            return err(f"Personalization number for {it['team']} must be 0-99.")

    # Coupon
    coupon_id = None
    coupon_type = None
    coupon_value = 0.0
    coupon_assignment_id = None  # user_coupons.id to flag used=1 after success
    if coupon_code:
        cp = db.execute("SELECT * FROM coupons WHERE code=?", (coupon_code,)).fetchone()
        if not cp:
            return err("Invalid coupon code.", 409)
        is_active = cp["is_active"] if "is_active" in cp.keys() and cp["is_active"] is not None else 1
        if not is_active:
            return err("This coupon is no longer available.", 409)
        if coupon_is_expired(cp["expires_at"]):
            return err("Coupon expired.", 409)
        # Ownership enforcement: same rules as /coupons/apply.
        mine = db.execute(
            """SELECT id, user_id, used, expires_at FROM user_coupons
                WHERE user_id=? AND (code=? OR coupon_id=?)
                ORDER BY COALESCE(used,0) ASC, id DESC
                LIMIT 1""",
            (uid, coupon_code, cp["id"]),
        ).fetchone()
        if mine:
            if mine["used"]:
                return err("Coupon already used.", 409)
            if coupon_is_expired(mine["expires_at"]):
                return err("Coupon expired.", 409)
            coupon_assignment_id = mine["id"]
        else:
            someone_else = db.execute(
                """SELECT 1 FROM user_coupons
                    WHERE (code=? OR coupon_id=?)
                      AND COALESCE(used,0)=0
                    LIMIT 1""",
                (coupon_code, cp["id"]),
            ).fetchone()
            if someone_else:
                return err("This coupon is not assigned to your account.", 403)
        coupon_id = cp["id"]; coupon_type = cp["type"]; coupon_value = cp["value"]

    # Totals
    subtotal = round(sum(it["base_price"] * it["quantity"] for it in items), 2)
    print_total = round(sum(CUSTOMIZATION_FEE * it["quantity"]
                            for it in items
                            if it["personalize"] and (it["customName"] or it["customNumber"])), 2)
    delivery_fee = DELIVERY_FEE
    discount_total = 0.0
    if coupon_type == "percent":
        discount_total = round((subtotal + print_total) * (coupon_value / 100.0), 2)
    elif coupon_type == "fixed":
        discount_total = round(min(coupon_value, subtotal + print_total), 2)
    elif coupon_type == "delivery":
        discount_total = delivery_fee
        delivery_fee = 0.0
    grand_total = round(max(0.0, subtotal + print_total + delivery_fee - discount_total), 2)

    order_code = f"ORD-{int(utcnow_naive().timestamp() * 1000)}"

    # Atomic transaction
    try:
        db.execute("BEGIN")
        cur = db.execute(
            """INSERT INTO orders
               (order_code, user_id, user_name, email, state, city, road,
                subtotal, print_total, delivery_fee, discount_total, grand_total,
                status, coupon_code,
                phone_country, phone_country_code, phone_dial_code,
                phone_national, phone_e164)
               VALUES(?,?,?,?,?,?,?,?,?,?,?,?, 'Confirmed', ?, ?,?,?,?,?)""",
            (order_code, uid, name, email, state, city, road,
             subtotal, print_total, delivery_fee, discount_total, grand_total,
             coupon_code or None,
             phone_fields["phone_country"], phone_fields["phone_country_code"],
             phone_fields["phone_dial_code"], phone_fields["phone_national"],
             phone_fields["phone_e164"]),
        )
        order_id = cur.lastrowid
        db.execute(
            """INSERT INTO order_status_history(order_id, status, note, created_by)
               VALUES(?,?,?,?)""",
            (order_id, "Pending", "Order created", uid),
        )
        db.execute(
            """INSERT INTO order_status_history(order_id, status, note, created_by)
               VALUES(?,?,?,?)""",
            (order_id, "Confirmed", "Payment accepted", uid),
        )

        for it in items:
            has_print = bool(it["personalize"] and (it["customName"] or it["customNumber"]))
            unit = it["base_price"] + (CUSTOMIZATION_FEE if has_print else 0.0)
            line_total = round(unit * it["quantity"], 2)
            db.execute(
                """INSERT INTO order_items
                   (order_id, product_id, team, league, qty, size, unit_price,
                    print_enabled, print_text, print_number, line_total)
             VALUES(?,?,?,?,?,?,?,?,?,?,?)""",
                (order_id, it["db_id"], it["team"], it["league"], it["quantity"],
                 it["size"], it["base_price"], 1 if has_print else 0,
                 it["customName"] or None, it["customNumber"] or None, line_total),
            )
            # Reduce inventory by size
            db.execute(
                """UPDATE inventory SET quantity = quantity - ?, updated_at=datetime('now')
                   WHERE product_id=? AND size=?""",
                (it["quantity"], it["db_id"], it["size"]),
            )
            # Guard against negative stock (race conditions)
            chk = db.execute(
                "SELECT quantity FROM inventory WHERE product_id=? AND size=?",
                (it["db_id"], it["size"]),
            ).fetchone()
            if chk and chk["quantity"] < 0:
                raise RuntimeError(f"Stock conflict for {it['team']} ({it['size']}).")

        # Mark the consumed assignment used. We use the specific row id captured
        # during validation so spin-issued rows (where uc.code matches the
        # unique issued code) AND gifted rows (where uc.code may match the
        # admin coupon's own code) are both handled correctly.
        if coupon_assignment_id is not None:
            db.execute(
                "UPDATE user_coupons SET used=1, used_at=datetime('now') WHERE id=?",
                (coupon_assignment_id,),
            )
        elif coupon_id and coupon_code:
            # Defensive fallback for older clients/data; preserves prior behavior.
            db.execute(
                "UPDATE user_coupons SET used=1, used_at=datetime('now') WHERE user_id=? AND code=?",
                (uid, coupon_code),
            )

        # Save/deduplicate address (including phone so Payment can autofill it next time).
        try:
            db.execute(
                """INSERT INTO saved_addresses(user_id, state, city, road, is_default,
                                              phone_country, phone_country_code,
                                              phone_dial_code, phone_national, phone_e164)
                   VALUES(?,?,?,?,1, ?,?,?,?,?)
                   ON CONFLICT(user_id, state, city, road)
                   DO UPDATE SET is_default=1, updated_at=datetime('now'),
                                 phone_country=excluded.phone_country,
                                 phone_country_code=excluded.phone_country_code,
                                 phone_dial_code=excluded.phone_dial_code,
                                 phone_national=excluded.phone_national,
                                 phone_e164=excluded.phone_e164""",
                (uid, state, city, road,
                 phone_fields["phone_country"], phone_fields["phone_country_code"],
                 phone_fields["phone_dial_code"], phone_fields["phone_national"],
                 phone_fields["phone_e164"]),
            )
            # Unset other defaults
            db.execute(
                "UPDATE saved_addresses SET is_default=0 WHERE user_id=? AND NOT (state=? AND city=? AND road=?)",
                (uid, state, city, road),
            )
        except Exception:
            pass

        # Also mirror this phone into the user's profile so /auth/me autofills
        # it on the next checkout (without forcing the user to re-enter it).
        try:
            db.execute(
                """UPDATE users
                      SET phone=COALESCE(NULLIF(phone,''), ?),
                          phone_country=?, phone_country_code=?, phone_dial_code=?,
                          phone_national=?, phone_e164=?,
                          updated_at=datetime('now')
                    WHERE id=?""",
                (phone_fields["phone_e164"],
                 phone_fields["phone_country"], phone_fields["phone_country_code"],
                 phone_fields["phone_dial_code"], phone_fields["phone_national"],
                 phone_fields["phone_e164"], uid),
            )
        except Exception:
            pass

        # Clear user's cart
        db.execute("DELETE FROM cart_items WHERE user_id=?", (uid,))

        audit(db, "checkout", "orders", order_id, {"grand_total": grand_total})
        db.commit()
    except Exception as e:
        db.rollback()
        return err(f"Checkout failed: {e}", 500)

    order = db.execute("SELECT * FROM orders WHERE id=?", (order_id,)).fetchone()
    return ok({"order": _serialize_order(db, order),
               "order_code": order_code,
               "grand_total": grand_total}, status=201)


@app.route("/api/orders")
def api_orders_list():
    s = current_session_row()
    if not s: return err("Authentication required", 401)
    db = get_db()
    if s["role"] == "admin":
        rows = db.execute("SELECT * FROM orders ORDER BY id DESC").fetchall()
    else:
        rows = db.execute("SELECT * FROM orders WHERE user_id=? ORDER BY id DESC",
                          (s["user_id"],)).fetchall()
    return ok({"orders": [_serialize_order(db, r, include_items=True) for r in rows]})


@app.route("/api/orders/<order_code>")
def api_orders_get(order_code):
    s = current_session_row()
    if not s: return err("Authentication required", 401)
    db = get_db()
    o = db.execute("SELECT * FROM orders WHERE order_code=?", (order_code,)).fetchone()
    if not o: return err("Order not found", 404)
    if s["role"] != "admin" and o["user_id"] != s["user_id"]:
        return err("Forbidden", 403)
    return ok({"order": _serialize_order(db, o)})


@app.route("/api/orders/<order_code>/receipt")
def api_orders_receipt(order_code):
    s = current_session_row()
    if not s: return err("Authentication required", 401)
    db = get_db()
    o = db.execute("SELECT * FROM orders WHERE order_code=?", (order_code,)).fetchone()
    if not o: return err("Order not found", 404)
    if s["role"] != "admin" and o["user_id"] != s["user_id"]:
        return err("Forbidden", 403)
    order = _serialize_order(db, o)
    items = order.get("items") or []
    item_rows = []
    for item in items:
        custom = []
        if item.get("customName"): custom.append(f"Name: {html_escape(item.get('customName'))}")
        if item.get("customNumber"): custom.append(f"Number: {html_escape(item.get('customNumber'))}")
        custom_text = " / ".join(custom) if custom else "No personalization"
        item_rows.append(
            "<tr>"
            f"<td>{html_escape(item.get('team') or '')}</td>"
            f"<td>{html_escape(item.get('league') or '')}</td>"
            f"<td>{html_escape(item.get('size') or '-')}</td>"
            f"<td>{int(item.get('qty') or 0)}</td>"
            f"<td>{html_escape(custom_text)}</td>"
            f"<td>${float(item.get('unit_price') or 0):.2f}</td>"
            f"<td>${float(item.get('line_total') or 0):.2f}</td>"
            "</tr>"
        )
    address = ", ".join([v for v in [order.get("state"), order.get("city"), order.get("road")] if v])
    phone_display = order.get("phone_e164") or ""
    if not phone_display and order.get("phone_dial_code") and order.get("phone_national"):
        phone_display = f"{order.get('phone_dial_code')}{order.get('phone_national')}"
    html = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Elite Kits Receipt {html_escape(order_code)}</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body class="receipt-page">
  <main class="receipt-shell">
    <section class="receipt-card">
      <div class="receipt-head">
        <div>
          <p class="receipt-kicker">Elite Kits Receipt</p>
          <h1>{html_escape(order_code)}</h1>
        </div>
        <button type="button" class="ek-mini-btn is-primary" data-receipt-print>Print</button>
      </div>
      <div class="receipt-meta-grid">
        <div><span>Customer</span><strong>{html_escape(order.get("user_name") or "")}</strong></div>
        <div><span>Email</span><strong>{html_escape(order.get("email") or "")}</strong></div>
        <div><span>Date</span><strong>{html_escape((order.get("created_at") or "")[:19])}</strong></div>
        <div><span>Status</span><strong>{html_escape(order.get("status") or "")}</strong></div>
        <div><span>Phone</span><strong>{html_escape(phone_display or "Not provided")}</strong></div>
        <div class="receipt-wide"><span>Billing Address</span><strong>{html_escape(address or "Not provided")}</strong></div>
      </div>
      <div class="receipt-table-wrap">
        <table class="receipt-table">
          <thead><tr><th>Item</th><th>League</th><th>Size</th><th>Qty</th><th>Personalization</th><th>Unit</th><th>Total</th></tr></thead>
          <tbody>{''.join(item_rows)}</tbody>
        </table>
      </div>
      <div class="receipt-total-box">
        <div><span>Subtotal</span><strong>${float(order.get("subtotal") or 0):.2f}</strong></div>
        <div><span>Customization</span><strong>${float(order.get("print_total") or 0):.2f}</strong></div>
        <div><span>Delivery</span><strong>${float(order.get("delivery_fee") or 0):.2f}</strong></div>
        <div><span>Discount</span><strong>-${float(order.get("discount_total") or 0):.2f}</strong></div>
        <div class="receipt-grand"><span>Grand Total</span><strong>${float(order.get("grand_total") or 0):.2f}</strong></div>
      </div>
    </section>
  </main>
  <script src="/app.js"></script>
</body>
</html>"""
    resp = make_response(html)
    resp.headers["Content-Type"] = "text/html; charset=utf-8"
    return resp


@app.route("/api/orders/<order_code>/status", methods=["PATCH"])
@admin_required
def api_orders_set_status(order_code):
    data = request.get_json(silent=True) or {}
    status = (data.get("status") or "").strip()
    if status not in VALID_ORDER_STATUSES:
        return err(f"Status must be one of {VALID_ORDER_STATUSES}")
    db = get_db()
    o = db.execute("SELECT * FROM orders WHERE order_code=?", (order_code,)).fetchone()
    if not o: return err("Order not found", 404)
    note = (data.get("note") or "").strip() or None
    db.execute("UPDATE orders SET status=? WHERE id=?", (status, o["id"]))
    db.execute(
        """INSERT INTO order_status_history(order_id, status, note, created_by)
           VALUES(?,?,?,?)""",
        (o["id"], status, note or f"Status changed to {status}", current_user_id()),
    )
    audit(db, "order_status", "orders", o["id"], {"status": status, "note": note})
    db.commit()
    updated = db.execute("SELECT * FROM orders WHERE id=?", (o["id"],)).fetchone()
    return ok({"order": _serialize_order(db, updated)})


# =====================================================================
# RATINGS
# =====================================================================

@app.route("/api/ratings")
def api_ratings_list():
    s = current_session_row()
    if not s: return err("Authentication required", 401)
    db = get_db()
    if s["role"] == "admin":
        rows = db.execute(
            """SELECT r.id, r.order_id, r.user_id, r.rating, r.comment,
                      r.created_at, r.updated_at, o.order_code, u.name AS user_name
               FROM ratings r
               JOIN orders o ON o.id=r.order_id
               JOIN users u ON u.id=r.user_id
               ORDER BY r.id DESC"""
        ).fetchall()
    else:
        rows = db.execute(
            """SELECT r.id, r.order_id, r.user_id, r.rating, r.comment,
                      r.created_at, r.updated_at, o.order_code
               FROM ratings r
               JOIN orders o ON o.id=r.order_id
               WHERE r.user_id=?
               ORDER BY r.id DESC""",
            (s["user_id"],),
        ).fetchall()
    return ok({"ratings": [dict(r) for r in rows]})


@app.route("/api/orders/<order_code>/rating", methods=["POST", "PATCH"])
@login_required
def api_orders_rate(order_code):
    data = request.get_json(silent=True) or {}
    try:
        value = int(data.get("rating"))
    except Exception:
        return err("rating is required (1-5)")
    if value < 1 or value > 5: return err("rating must be 1-5")
    comment = (data.get("comment") or "").strip() or None

    uid = current_user_id()
    db = get_db()
    o = db.execute("SELECT * FROM orders WHERE order_code=?", (order_code,)).fetchone()
    if not o: return err("Order not found", 404)
    if o["user_id"] != uid and not is_admin():
        return err("Forbidden", 403)

    db.execute(
        """INSERT INTO ratings(order_id, user_id, rating, comment)
           VALUES(?,?,?,?)
           ON CONFLICT(order_id, user_id)
           DO UPDATE SET rating=excluded.rating, comment=excluded.comment, updated_at=datetime('now')""",
        (o["id"], o["user_id"], value, comment),
    )
    # Also mirror into orders.rating for backwards compatibility
    db.execute("UPDATE orders SET rating=? WHERE id=?", (value, o["id"]))
    audit(db, "rating", "orders", o["id"], {"rating": value})
    db.commit()
    return ok({"order_code": order_code, "rating": value, "comment": comment})


# =====================================================================
# PRODUCT REVIEWS
# =====================================================================

def _serialize_product_review(row):
    return {
        "id": row["id"],
        "product_id": row["product_id"],
        "order_item_id": row["order_item_id"],
        "user_id": row["user_id"],
        "user_name": row["user_name"] if "user_name" in row.keys() else None,
        "rating": row["rating"],
        "comment": row["comment"] or "",
        "created_at": row["created_at"],
        "updated_at": row["updated_at"],
    }


def _product_review_stats(db, product_id):
    row = db.execute(
        "SELECT COALESCE(AVG(rating),0) AS avg_rating, COUNT(*) AS review_count FROM product_reviews WHERE product_id=?",
        (product_id,),
    ).fetchone()
    return {
        "average_rating": round(float(row["avg_rating"] or 0), 2),
        "review_count": int(row["review_count"] or 0),
    }


def _eligible_review_item(db, user_id, product_id, order_item_id=None):
    base = """SELECT oi.id AS order_item_id, o.id AS order_id, o.order_code
              FROM order_items oi
              JOIN orders o ON o.id=oi.order_id
              WHERE o.user_id=? AND oi.product_id=? AND o.status<>'Cancelled'"""
    params = [user_id, product_id]
    if order_item_id is not None:
        base += " AND oi.id=?"
        params.append(order_item_id)
    base += " ORDER BY o.created_at DESC, oi.id DESC"
    for row in db.execute(base, params).fetchall():
        used = db.execute(
            "SELECT 1 FROM product_reviews WHERE user_id=? AND product_id=? AND order_item_id=?",
            (user_id, product_id, row["order_item_id"]),
        ).fetchone()
        if not used:
            return row
    return None


@app.route("/api/products/<product_id>/reviews")
def api_product_reviews_list(product_id):
    db = get_db()
    p = product_by_code(db, product_id)
    if not p:
        return err("Product not found", 404)
    rows = db.execute(
        """SELECT pr.*, u.name AS user_name
           FROM product_reviews pr
           LEFT JOIN users u ON u.id=pr.user_id
           WHERE pr.product_id=?
           ORDER BY pr.created_at DESC, pr.id DESC""",
        (p["id"],),
    ).fetchall()
    stats = _product_review_stats(db, p["id"])
    can_review = False
    s = current_session_row(db)
    if s and s["role"] in ("user", "admin"):
        can_review = _eligible_review_item(db, s["user_id"], p["id"]) is not None
    return ok({
        "reviews": [_serialize_product_review(r) for r in rows],
        "average_rating": stats["average_rating"],
        "review_count": stats["review_count"],
        "can_review": can_review,
    })


@app.route("/api/products/<product_id>/reviews", methods=["POST"])
@login_required
def api_product_reviews_create(product_id):
    limited = rate_limit("product_review", 10, 300, current_user_id())
    if limited: return limited
    data = request.get_json(silent=True) or {}
    try:
        value = int(data.get("rating"))
    except Exception:
        return err("rating is required (1-5)")
    if value < 1 or value > 5:
        return err("rating must be 1-5")
    comment = (data.get("comment") or "").strip()
    if len(comment) > 1000:
        return err("Review comment must be 1000 characters or fewer.")
    requested_item = data.get("order_item_id")
    try:
        requested_item = int(requested_item) if requested_item not in (None, "") else None
    except Exception:
        return err("order_item_id must be numeric.")

    db = get_db(); uid = current_user_id()
    p = product_by_code(db, product_id)
    if not p:
        return err("Product not found", 404)
    eligible = _eligible_review_item(db, uid, p["id"], requested_item)
    if not eligible:
        return err("Only verified buyers can review this product, and each purchased item can be reviewed once.", 403)
    cur = db.execute(
        """INSERT INTO product_reviews(product_id, order_item_id, user_id, rating, comment)
           VALUES(?,?,?,?,?)""",
        (p["id"], eligible["order_item_id"], uid, value, comment or None),
    )
    audit(db, "product_review_create", "products", p["id"], {"rating": value})
    db.commit()
    row = db.execute(
        """SELECT pr.*, u.name AS user_name
           FROM product_reviews pr LEFT JOIN users u ON u.id=pr.user_id
           WHERE pr.id=?""",
        (cur.lastrowid,),
    ).fetchone()
    stats = _product_review_stats(db, p["id"])
    return ok({"review": _serialize_product_review(row), **stats}, status=201)


@app.route("/api/products/<product_id>/reviews/<int:review_id>", methods=["PATCH"])
@login_required
def api_product_reviews_update(product_id, review_id):
    data = request.get_json(silent=True) or {}
    db = get_db(); uid = current_user_id()
    p = product_by_code(db, product_id)
    if not p:
        return err("Product not found", 404)
    row = db.execute("SELECT * FROM product_reviews WHERE id=? AND product_id=?", (review_id, p["id"])).fetchone()
    if not row:
        return err("Review not found", 404)
    if row["user_id"] != uid and not is_admin():
        return err("Forbidden", 403)
    fields = {}
    if "rating" in data:
        try:
            value = int(data.get("rating"))
        except Exception:
            return err("rating must be 1-5")
        if value < 1 or value > 5:
            return err("rating must be 1-5")
        fields["rating"] = value
    if "comment" in data:
        comment = (data.get("comment") or "").strip()
        if len(comment) > 1000:
            return err("Review comment must be 1000 characters or fewer.")
        fields["comment"] = comment or None
    if not fields:
        return err("No fields to update.")
    sets = ", ".join(f"{k}=?" for k in fields.keys())
    db.execute(f"UPDATE product_reviews SET {sets}, updated_at=datetime('now') WHERE id=?", list(fields.values()) + [review_id])
    audit(db, "product_review_update", "products", p["id"], {"review_id": review_id, "keys": list(fields.keys())})
    db.commit()
    updated = db.execute(
        """SELECT pr.*, u.name AS user_name
           FROM product_reviews pr LEFT JOIN users u ON u.id=pr.user_id
           WHERE pr.id=?""",
        (review_id,),
    ).fetchone()
    stats = _product_review_stats(db, p["id"])
    return ok({"review": _serialize_product_review(updated), **stats})


@app.route("/api/products/<product_id>/reviews/<int:review_id>", methods=["DELETE"])
@login_required
def api_product_reviews_delete(product_id, review_id):
    db = get_db(); uid = current_user_id()
    p = product_by_code(db, product_id)
    if not p:
        return err("Product not found", 404)
    row = db.execute("SELECT * FROM product_reviews WHERE id=? AND product_id=?", (review_id, p["id"])).fetchone()
    if not row:
        return err("Review not found", 404)
    if row["user_id"] != uid and not is_admin():
        return err("Forbidden", 403)
    db.execute("DELETE FROM product_reviews WHERE id=?", (review_id,))
    audit(db, "product_review_delete", "products", p["id"], {"review_id": review_id})
    db.commit()
    stats = _product_review_stats(db, p["id"])
    return ok({"deleted": True, **stats})


# =====================================================================
# ADDRESSES
# =====================================================================

@app.route("/api/addresses")
@login_required
def api_addresses_list():
    db = get_db(); uid = current_user_id()
    rows = db.execute(
        "SELECT * FROM saved_addresses WHERE user_id=? ORDER BY is_default DESC, updated_at DESC",
        (uid,),
    ).fetchall()
    return ok({"addresses": [dict(r) for r in rows]})


@app.route("/api/addresses", methods=["POST"])
@login_required
def api_addresses_create():
    data = request.get_json(silent=True) or {}
    state = normalize_address_field(data.get("state") or data.get("governorate"))
    city = normalize_address_field(data.get("city"))
    road = normalize_address_field(data.get("road") or data.get("street"))
    if not state: return err("State is required.")
    if not valid_city(city): return err("Please enter a valid city.")
    if not valid_road(road): return err("Please enter a valid road / street.")
    phone_country_in = data.get("phone_country_code") or data.get("phone_country") or ""
    phone_number_in = data.get("phone_national") or data.get("phone") or data.get("phone_number") or ""
    phone_fields = None
    if phone_country_in or phone_number_in:
        phone_fields, phone_err = validate_phone_payload(phone_country_in, phone_number_in)
        if phone_err: return err(phone_err)
    db = get_db(); uid = current_user_id()
    db.execute(
        """INSERT INTO saved_addresses(user_id, state, city, road, is_default,
                                       phone_country, phone_country_code,
                                       phone_dial_code, phone_national, phone_e164)
           VALUES(?,?,?,?,0, ?,?,?,?,?)
           ON CONFLICT(user_id, state, city, road)
           DO UPDATE SET updated_at=datetime('now'),
                         phone_country=COALESCE(excluded.phone_country, saved_addresses.phone_country),
                         phone_country_code=COALESCE(excluded.phone_country_code, saved_addresses.phone_country_code),
                         phone_dial_code=COALESCE(excluded.phone_dial_code, saved_addresses.phone_dial_code),
                         phone_national=COALESCE(excluded.phone_national, saved_addresses.phone_national),
                         phone_e164=COALESCE(excluded.phone_e164, saved_addresses.phone_e164)""",
        (uid, state, city, road,
         phone_fields["phone_country"]      if phone_fields else None,
         phone_fields["phone_country_code"] if phone_fields else None,
         phone_fields["phone_dial_code"]    if phone_fields else None,
         phone_fields["phone_national"]     if phone_fields else None,
         phone_fields["phone_e164"]         if phone_fields else None),
    )
    db.commit()
    return ok({"addresses": [dict(r) for r in db.execute(
        "SELECT * FROM saved_addresses WHERE user_id=? ORDER BY is_default DESC, updated_at DESC", (uid,)
    ).fetchall()]}, status=201)


@app.route("/api/addresses/<int:addr_id>/default", methods=["PATCH"])
@login_required
def api_addresses_set_default(addr_id):
    db = get_db(); uid = current_user_id()
    row = db.execute("SELECT id FROM saved_addresses WHERE id=? AND user_id=?",
                     (addr_id, uid)).fetchone()
    if not row: return err("Address not found", 404)
    db.execute("UPDATE saved_addresses SET is_default=0 WHERE user_id=?", (uid,))
    db.execute("UPDATE saved_addresses SET is_default=1, updated_at=datetime('now') WHERE id=?",
               (addr_id,))
    db.commit()
    return ok({"address_id": addr_id})


@app.route("/api/addresses/<int:addr_id>", methods=["PATCH"])
@login_required
def api_addresses_update(addr_id):
    data = request.get_json(silent=True) or {}
    state = normalize_address_field(data.get("state") or data.get("governorate"))
    city = normalize_address_field(data.get("city"))
    road = normalize_address_field(data.get("road") or data.get("street"))
    if not state: return err("State is required.")
    if not valid_city(city): return err("Please enter a valid city.")
    if not valid_road(road): return err("Please enter a valid road / street.")
    phone_country_in = data.get("phone_country_code") or data.get("phone_country") or ""
    phone_number_in = data.get("phone_national") or data.get("phone") or data.get("phone_number") or ""
    phone_fields = None
    phone_provided = bool(phone_country_in or phone_number_in)
    if phone_provided:
        phone_fields, phone_err = validate_phone_payload(phone_country_in, phone_number_in)
        if phone_err: return err(phone_err)
    db = get_db(); uid = current_user_id()
    row = db.execute("SELECT id FROM saved_addresses WHERE id=? AND user_id=?", (addr_id, uid)).fetchone()
    if not row: return err("Address not found", 404)
    try:
        if phone_fields:
            db.execute(
                """UPDATE saved_addresses
                      SET state=?, city=?, road=?,
                          phone_country=?, phone_country_code=?, phone_dial_code=?,
                          phone_national=?, phone_e164=?,
                          updated_at=datetime('now')
                    WHERE id=? AND user_id=?""",
                (state, city, road,
                 phone_fields["phone_country"], phone_fields["phone_country_code"],
                 phone_fields["phone_dial_code"], phone_fields["phone_national"],
                 phone_fields["phone_e164"], addr_id, uid),
            )
        else:
            db.execute(
                "UPDATE saved_addresses SET state=?, city=?, road=?, updated_at=datetime('now') WHERE id=? AND user_id=?",
                (state, city, road, addr_id, uid),
            )
        db.commit()
    except sqlite3.IntegrityError:
        db.rollback()
        return err("That address already exists.", 409)
    updated = db.execute("SELECT * FROM saved_addresses WHERE id=? AND user_id=?", (addr_id, uid)).fetchone()
    return ok({"address": dict(updated)})


@app.route("/api/addresses/<int:addr_id>", methods=["DELETE"])
@login_required
def api_addresses_delete(addr_id):
    db = get_db(); uid = current_user_id()
    cur = db.execute("DELETE FROM saved_addresses WHERE id=? AND user_id=?", (addr_id, uid))
    db.commit()
    if cur.rowcount == 0:
        return err("Address not found", 404)
    return ok({})


@app.route("/api/addresses/default")
@login_required
def api_addresses_default():
    db = get_db(); uid = current_user_id()
    row = db.execute(
        """SELECT * FROM saved_addresses WHERE user_id=?
           ORDER BY is_default DESC, updated_at DESC LIMIT 1""",
        (uid,),
    ).fetchone()
    return ok({"address": dict(row) if row else None})


# =====================================================================
# COUPONS / SPIN WHEEL
# =====================================================================

@app.route("/api/coupons")
def api_coupons():
    s = current_session_row()
    if not s:
        # Guests have no coupons. Return an empty list instead of 401 so the
        # frontend's hydration call doesn't generate error log noise.
        return ok({"coupons": [], "user_coupons": []})
    db = get_db()
    if expire_stale_spin_coupons(db, s["user_id"] if s["role"] != "admin" else None):
        db.commit()
    if s["role"] == "admin":
        rows = db.execute("SELECT * FROM coupons ORDER BY created_at DESC").fetchall()
        user_rows = db.execute("SELECT * FROM user_coupons ORDER BY assigned_at DESC").fetchall()
        return ok({
            "coupons": [dict(r) for r in rows],
            "user_coupons": [dict(r) for r in user_rows],
        })

    # Signed-in user: surface BOTH their spin-issued codes and any admin gifts
    # (joined with the coupons table so the UI can render type/value/expiry
    # without a second round-trip). Used / expired rows are filtered out.
    user_rows = db.execute(
        """SELECT uc.*, c.type AS coupon_type, c.value AS coupon_value,
                   c.code AS coupon_code, c.expires_at AS coupon_expires_at,
                   c.is_active AS coupon_is_active
              FROM user_coupons uc
              LEFT JOIN coupons c ON c.id=uc.coupon_id
             WHERE uc.user_id=?
             ORDER BY uc.assigned_at DESC""",
        (s["user_id"],),
    ).fetchall()
    return ok({
        "coupons": [],
        "user_coupons": [dict(r) for r in user_rows],
    })


@app.route("/api/coupons/apply", methods=["POST"])
@login_required
def api_coupons_apply():
    data = request.get_json(silent=True) or {}
    code = (data.get("code") or "").strip().upper()
    if not code: return err("Coupon code is required")
    db = get_db(); uid = current_user_id()
    if expire_stale_spin_coupons(db, uid):
        db.commit()
    cp = db.execute("SELECT * FROM coupons WHERE code=?", (code,)).fetchone()
    if not cp: return err("Invalid coupon code", 409)
    # Reject coupons that have been soft-disabled by admin.
    is_active = cp["is_active"] if "is_active" in cp.keys() and cp["is_active"] is not None else 1
    if not is_active:
        return err("This coupon is no longer available.", 409)
    if coupon_is_expired(cp["expires_at"]):
        return err("Coupon expired", 409)
    # Ownership enforcement:
    #   * Spin coupons issue a unique code per user (ELITE10-ABC123). The
    #     user_coupons.code lookup matches that exact issued code.
    #   * Admin GIFTED coupons keep the original admin code (e.g. WELCOME10).
    #     Multiple users can be gifted the same code, so we must scope the
    #     lookup to the current user before checking ownership.
    #   * If any user_coupons row exists for this coupon (by code OR coupon_id)
    #     that is unused and unexpired, the coupon is treated as user-scoped:
    #     only the assigned user may apply it. Other signed-in users are
    #     rejected (and guests never reach this endpoint).
    mine = db.execute(
        """SELECT id, user_id, used, expires_at FROM user_coupons
            WHERE user_id=? AND (code=? OR coupon_id=?)
            ORDER BY COALESCE(used,0) ASC, id DESC
            LIMIT 1""",
        (uid, code, cp["id"]),
    ).fetchone()
    if mine:
        if mine["used"]:
            return err("Coupon already used", 409)
        if coupon_is_expired(mine["expires_at"]):
            return err("Coupon expired", 409)
    else:
        # No row for this user. If ANY active assignment exists for someone
        # else, this coupon is user-scoped and the current user cannot use it.
        someone_else = db.execute(
            """SELECT 1 FROM user_coupons
                WHERE (code=? OR coupon_id=?)
                  AND COALESCE(used,0)=0
                LIMIT 1""",
            (code, cp["id"]),
        ).fetchone()
        if someone_else:
            return err("This coupon is not assigned to your account.", 403)
    return ok({
        "code": cp["code"],
        "type": cp["type"],
        "value": cp["value"],
        "expires_at": cp["expires_at"],
    })


SPIN_PRIZES = [
    # Aligned with the SpinWheel.html canvas slices in app.js. Each wheel slice
    # corresponds to one entry here, so the visual result matches what the
    # server awards. To rebalance odds, duplicate an entry below.
    {"id": "ELITE10",  "label": "10% off",             "emoji": "🎉", "coupon": "ELITE10"},
    {"id": "FREEDEL",  "label": "Free delivery",       "emoji": "🚚", "coupon": "FREEDEL"},
    {"id": "ELITE5",   "label": "5% off",              "emoji": "🎟️", "coupon": "ELITE5"},
    {"id": "TRYAGAIN", "label": "Try again tomorrow",  "emoji": "🔄", "coupon": None},
    {"id": "ELITE15",  "label": "15% off",             "emoji": "💎", "coupon": "ELITE15"},
    {"id": "FREEDEL",  "label": "Free delivery",       "emoji": "🚚", "coupon": "FREEDEL"},
]


@app.route("/api/spin", methods=["POST"])
@login_required
def api_spin():
    limited = rate_limit("spin", 10, 300, current_user_id())
    if limited: return limited
    uid = current_user_id()
    db = get_db()
    if expire_stale_spin_coupons(db, uid):
        db.commit()
    today = date.today().isoformat()
    existing = db.execute(
        "SELECT * FROM spin_history WHERE user_id=? AND spin_date=?", (uid, today)
    ).fetchone()
    if existing:
        return ok({"already_spun": True,
                   "prize_id": existing["prize_id"],
                   "prize_label": existing["prize_label"],
                   "emoji": existing["emoji"],
                   "coupon_code": existing["coupon_code"],
                   "expires_at": existing["expires_at"]})

    prize = secrets.choice(SPIN_PRIZES)
    coupon_id = None
    issued_code = None
    expires_at = None

    if prize["coupon"]:
        cp = db.execute("SELECT * FROM coupons WHERE code=?", (prize["coupon"],)).fetchone()
        if cp:
            coupon_id = cp["id"]
            # issue user-specific coupon code
            issued_code = f"{cp['code']}-{uuid.uuid4().hex[:6].upper()}"
            expires_at = _next_local_midnight_iso()
            db.execute(
                """INSERT INTO user_coupons(user_id, coupon_id, code, expires_at, prize_label)
                   VALUES(?,?,?,?,?)""",
                (uid, coupon_id, issued_code, expires_at, prize["label"]),
            )
            # Also create a "spin coupon" entry in coupons for the issued unique code so it can be applied directly
            db.execute(
                "INSERT OR IGNORE INTO coupons(code, type, value, expires_at, source) VALUES(?,?,?,?,?)",
                (issued_code, cp["type"], cp["value"], expires_at, "spin"),
            )

    db.execute(
        """INSERT INTO spin_history(user_id, spin_date, prize_id, prize_label, emoji,
                                    coupon_id, coupon_code, expires_at)
           VALUES(?,?,?,?,?,?,?,?)""",
        (uid, today, prize["id"], prize["label"], prize["emoji"],
         coupon_id, issued_code, expires_at),
    )
    audit(db, "spin", "spin_history", None, {"prize": prize["id"]})
    db.commit()
    return ok({
        "already_spun": False,
        "prize_id": prize["id"],
        "prize_label": prize["label"],
        "emoji": prize["emoji"],
        "coupon_code": issued_code,
        "expires_at": expires_at,
    })


@app.route("/api/spin/status")
def api_spin_status():
    uid = current_user_id()
    if not uid:
        return ok({"can_spin": False, "logged_in": False})
    db = get_db()
    if expire_stale_spin_coupons(db, uid):
        db.commit()
    today = date.today().isoformat()
    row = db.execute(
        "SELECT * FROM spin_history WHERE user_id=? AND spin_date=?", (uid, today)
    ).fetchone()
    return ok({
        "can_spin": row is None,
        "logged_in": True,
        "last_prize": dict(row) if row else None,
    })


# =====================================================================
# MESSAGES / CAREER APPLICATIONS
# =====================================================================

@app.route("/api/messages", methods=["POST"])
def api_messages_create():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip().lower()
    limited = rate_limit("messages_create", 5, 300, email)
    if limited: return limited
    subject = (data.get("subject") or "").strip() or None
    msg_text = (data.get("message") or "").strip()
    mtype = (data.get("type") or "contact").strip().lower()
    role = (data.get("role") or "").strip() or None
    cv_b64 = data.get("cv_blob")
    cv_filename = (data.get("cv_filename") or data.get("cv_file") or "").strip() or None
    cv_mime = (data.get("cv_mime") or "").strip() or None

    if mtype not in ("contact", "application"):
        return err("type must be 'contact' or 'application'")
    if not valid_name(name): return err("Please enter a valid name.")
    if not valid_email(email): return err("Please enter a valid email.")
    if not msg_text: return err("Message is required.")

    cv_bytes = None
    cv_size = None
    CV_ERROR_MSG = "CV must be a PDF or Word document (.docx), max 5 MB."
    if cv_b64:
        try:
            cv_bytes = base64.b64decode(cv_b64.split(",", 1)[-1])
            cv_size = len(cv_bytes)
        except Exception:
            return err("Invalid CV file data.")
        if cv_size > 5 * 1024 * 1024:
            return err(CV_ERROR_MSG)
        if cv_filename and not re.search(r"\.(pdf|docx)$", cv_filename, re.I):
            return err(CV_ERROR_MSG)

    db = get_db()
    db.execute(
        """INSERT INTO messages(name, email, subject, message, type, role,
                                cv_file, cv_mime, cv_size, cv_blob)
           VALUES(?,?,?,?,?,?,?,?,?,?)""",
        (name, email, subject, msg_text, mtype, role,
         cv_filename, cv_mime, cv_size, cv_bytes),
    )
    db.commit()
    return ok({"saved": True}, status=201)


@app.route("/api/messages")
@admin_required
def api_messages_list():
    db = get_db()
    type_filter = request.args.get("type")
    read_filter = request.args.get("read")
    sql = """SELECT id, name, email, subject, message, type, role,
                    cv_file, cv_mime, cv_size,
                    CASE WHEN cv_blob IS NOT NULL THEN 1 ELSE 0 END AS has_cv,
                    is_read, created_at
               FROM messages WHERE 1=1"""
    params = []
    if type_filter in ("contact", "application"):
        sql += " AND type=?"; params.append(type_filter)
    if read_filter in ("0", "1"):
        sql += " AND is_read=?"; params.append(int(read_filter))
    sql += " ORDER BY id DESC"
    rows = db.execute(sql, params).fetchall()
    return ok({"messages": [dict(r) for r in rows]})


@app.route("/api/messages/<int:msg_id>/read", methods=["PATCH"])
@admin_required
def api_messages_mark_read(msg_id):
    db = get_db()
    cur = db.execute("UPDATE messages SET is_read=1 WHERE id=?", (msg_id,))
    db.commit()
    if cur.rowcount == 0:
        return err("Message not found", 404)
    return ok({"id": msg_id, "is_read": True})


@app.route("/api/messages/<int:msg_id>", methods=["DELETE"])
@admin_required
def api_messages_delete(msg_id):
    db = get_db()
    cur = db.execute("DELETE FROM messages WHERE id=?", (msg_id,))
    db.commit()
    if cur.rowcount == 0:
        return err("Message not found", 404)
    return ok({"id": msg_id, "deleted": True})


@app.route("/api/messages/<int:msg_id>/cv")
@admin_required
def api_messages_cv_download(msg_id):
    """Download the CV blob attached to a career application. Admin-only."""
    db = get_db()
    row = db.execute(
        "SELECT cv_file, cv_mime, cv_blob FROM messages WHERE id=?", (msg_id,)
    ).fetchone()
    if not row or not row["cv_blob"]:
        return err("No CV attached to this message", 404)
    filename = row["cv_file"] or f"cv-{msg_id}.bin"
    # Restrict to known safe extensions
    safe_name = re.sub(r"[^A-Za-z0-9._-]+", "_", filename)
    mime = row["cv_mime"] or "application/octet-stream"
    # Default to PDF mime if filename suggests pdf and stored mime is generic
    if safe_name.lower().endswith(".pdf") and mime == "application/octet-stream":
        mime = "application/pdf"
    elif safe_name.lower().endswith(".docx") and mime == "application/octet-stream":
        mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    resp = make_response(bytes(row["cv_blob"]))
    resp.headers["Content-Type"] = mime
    resp.headers["Content-Disposition"] = f'attachment; filename="{safe_name}"'
    resp.headers["Content-Length"] = str(len(row["cv_blob"]))
    return resp


# =====================================================================
# ADMIN ANALYTICS
# =====================================================================

def _admin_date_condition(column_name):
    period = (request.args.get("range") or request.args.get("period") or "all").strip().lower()
    start_arg = (request.args.get("start") or "").strip()
    end_arg = (request.args.get("end") or "").strip()
    today = date.today()
    start = end = None
    label = period

    if period in ("today", "day"):
        start = datetime.combine(today, datetime.min.time())
        end = start + timedelta(days=1)
        label = "today"
    elif period in ("7d", "last7", "last_7_days", "last-7-days"):
        start = datetime.combine(today - timedelta(days=6), datetime.min.time())
        end = datetime.combine(today + timedelta(days=1), datetime.min.time())
        label = "last_7_days"
    elif period in ("30d", "last30", "last_30_days", "last-30-days"):
        start = datetime.combine(today - timedelta(days=29), datetime.min.time())
        end = datetime.combine(today + timedelta(days=1), datetime.min.time())
        label = "last_30_days"
    elif period in ("month", "this_month", "this-month"):
        start = datetime(today.year, today.month, 1)
        if today.month == 12:
            end = datetime(today.year + 1, 1, 1)
        else:
            end = datetime(today.year, today.month + 1, 1)
        label = "this_month"
    elif period == "custom" and (start_arg or end_arg):
        try:
            if start_arg:
                start = datetime.fromisoformat(start_arg[:10])
            if end_arg:
                end = datetime.fromisoformat(end_arg[:10]) + timedelta(days=1)
            label = "custom"
        except Exception:
            start = end = None
            label = "all"
    else:
        return "", [], "all"

    clauses = []
    params = []
    if start:
        clauses.append(f"{column_name} >= ?")
        params.append(start.strftime("%Y-%m-%d %H:%M:%S"))
    if end:
        clauses.append(f"{column_name} < ?")
        params.append(end.strftime("%Y-%m-%d %H:%M:%S"))
    return " AND ".join(clauses), params, label


@app.route("/api/admin/overview")
@admin_required
def api_admin_overview():
    db = get_db()
    order_cond, order_params, range_label = _admin_date_condition("created_at")
    order_where = f"WHERE {order_cond}" if order_cond else ""
    joined_cond, joined_params, _ = _admin_date_condition("o.created_at")
    joined_where = f"WHERE {joined_cond}" if joined_cond else ""

    total_revenue = db.execute(
        f"SELECT COALESCE(SUM(grand_total),0) AS s FROM orders {order_where}",
        order_params,
    ).fetchone()["s"]
    total_orders = db.execute(
        f"SELECT COUNT(*) c FROM orders {order_where}",
        order_params,
    ).fetchone()["c"]
    registered_users = db.execute("SELECT COUNT(*) c FROM users WHERE is_admin=0 AND is_deleted=0").fetchone()["c"]
    avg_rating = db.execute(
        f"""SELECT COALESCE(AVG(r.rating),0) a
            FROM ratings r JOIN orders o ON o.id=r.order_id {joined_where}""",
        joined_params,
    ).fetchone()["a"]
    jerseys_sold = db.execute(
        f"""SELECT COALESCE(SUM(oi.qty),0) s
            FROM order_items oi JOIN orders o ON o.id=oi.order_id {joined_where}""",
        joined_params,
    ).fetchone()["s"]
    low_stock = db.execute(
        "SELECT COUNT(*) c FROM inventory WHERE quantity > 0 AND quantity <= 5"
    ).fetchone()["c"]
    recent_orders = db.execute(
        f"SELECT * FROM orders {order_where} ORDER BY id DESC LIMIT 10",
        order_params,
    ).fetchall()
    rating_summary = db.execute(
        f"""SELECT r.rating, COUNT(*) AS c
            FROM ratings r JOIN orders o ON o.id=r.order_id
            {joined_where}
            GROUP BY r.rating ORDER BY r.rating""",
        joined_params,
    ).fetchall()

    return ok({
        "range": range_label,
        "total_revenue": round(total_revenue, 2),
        "total_orders": total_orders,
        "registered_users": registered_users,
        "average_rating": round(avg_rating, 2),
        "jerseys_sold": jerseys_sold,
        "low_stock_count": low_stock,
        "recent_orders": [_serialize_order(db, r, include_items=False) for r in recent_orders],
        "rating_summary": [{"rating": r["rating"], "count": r["c"]} for r in rating_summary],
    })


@app.route("/api/admin/analytics")
@admin_required
def api_admin_analytics():
    db = get_db()
    order_cond, order_params, range_label = _admin_date_condition("o.created_at")
    order_where = f"WHERE {order_cond}" if order_cond else ""
    plain_cond, plain_params, _ = _admin_date_condition("created_at")
    plain_where = f"WHERE {plain_cond}" if plain_cond else ""
    revenue_by_league = [dict(r) for r in db.execute(
        """SELECT oi.league AS league, ROUND(SUM(oi.line_total + (oi.print_enabled*5*oi.qty)),2) AS revenue
           FROM order_items oi JOIN orders o ON o.id=oi.order_id
           {where}
           GROUP BY oi.league ORDER BY revenue DESC""".format(where=order_where),
        order_params,
    ).fetchall()]
    revenue_by_team = [dict(r) for r in db.execute(
        """SELECT oi.team AS team, ROUND(SUM(oi.line_total),2) AS revenue
           FROM order_items oi JOIN orders o ON o.id=oi.order_id
           {where}
           GROUP BY oi.team ORDER BY revenue DESC LIMIT 20""".format(where=order_where),
        order_params,
    ).fetchall()]
    monthly_revenue = [dict(r) for r in db.execute(
        """SELECT substr(created_at,1,7) AS month, ROUND(SUM(grand_total),2) AS revenue
           FROM orders {where} GROUP BY month ORDER BY month DESC LIMIT 12""".format(where=plain_where),
        plain_params,
    ).fetchall()]
    top_selling = [dict(r) for r in db.execute(
        """SELECT oi.team AS team, SUM(oi.qty) AS qty
           FROM order_items oi JOIN orders o ON o.id=oi.order_id
           {where}
           GROUP BY oi.team ORDER BY qty DESC LIMIT 10""".format(where=order_where),
        order_params,
    ).fetchall()]
    most_wishlisted = [dict(r) for r in db.execute(
        """SELECT p.team AS team, COUNT(*) AS c
           FROM wishlist_items w JOIN products p ON p.id=w.product_id
           GROUP BY p.team ORDER BY c DESC LIMIT 10"""
    ).fetchall()]
    low_stock_alerts = [dict(r) for r in db.execute(
        """SELECT p.team AS team, p.league AS league, i.size AS size, i.quantity AS quantity
           FROM inventory i JOIN products p ON p.id=i.product_id
           WHERE i.quantity <= 5 ORDER BY i.quantity ASC LIMIT 50"""
    ).fetchall()]
    abandoned_carts = db.execute(
        """SELECT COUNT(DISTINCT user_id) AS c FROM cart_items
           WHERE user_id NOT IN (SELECT user_id FROM orders)"""
    ).fetchone()["c"]
    avg_order = db.execute(
        f"SELECT COALESCE(AVG(grand_total),0) AS a FROM orders {plain_where}",
        plain_params,
    ).fetchone()["a"]
    repeat_customer = db.execute(
        """SELECT
              (SELECT COUNT(*) FROM (SELECT user_id FROM orders {where} GROUP BY user_id HAVING COUNT(*)>1)) AS repeat_count,
              (SELECT COUNT(DISTINCT user_id) FROM orders {where}) AS total_buyers""".format(where=plain_where),
        plain_params + plain_params,
    ).fetchone()
    repeat_rate = 0.0
    if repeat_customer["total_buyers"]:
        repeat_rate = round(100.0 * repeat_customer["repeat_count"] / repeat_customer["total_buyers"], 1)

    return ok({
        "range": range_label,
        "revenue_by_league": revenue_by_league,
        "revenue_by_team": revenue_by_team,
        "monthly_revenue": monthly_revenue,
        "top_selling": top_selling,
        "most_wishlisted": most_wishlisted,
        "low_stock_alerts": low_stock_alerts,
        "abandoned_carts": abandoned_carts,
        "average_order_value": round(avg_order, 2),
        "repeat_customer_rate": repeat_rate,
    })


# =====================================================================
# ADMIN COUPON CRUD
# =====================================================================
# Frontend type "free_delivery" is an alias of the internal type "delivery"
# (also used by the legacy Spin Wheel rewards). Soft-delete via is_active=0
# is preferred over hard delete when the coupon code appears on any order
# history so we don't break the audit trail.

_COUPON_TYPE_ALIASES = {
    "percent": "percent",
    "fixed": "fixed",
    "delivery": "delivery",
    "free_delivery": "delivery",
    "free-delivery": "delivery",
    "freedelivery": "delivery",
}


def _serialize_coupon(c):
    if c is None:
        return None
    return {
        "id": c["id"],
        "code": c["code"],
        "type": c["type"],
        "value": c["value"],
        "expires_at": c["expires_at"],
        "source": c["source"] if "source" in c.keys() and c["source"] else "admin",
        "is_active": bool(c["is_active"]) if "is_active" in c.keys() and c["is_active"] is not None else True,
        "used_count": c["used_count"] if "used_count" in c.keys() else 0,
        "order_count": c["order_count"] if "order_count" in c.keys() else 0,
        "created_at": c["created_at"],
    }


def _normalize_coupon_payload(data, partial=False, existing_type=None):
    """Return (payload_dict, error_message). payload_dict contains only keys
    that were provided. Validates code, type and value."""
    out = {}
    if not partial or "code" in data:
        code = (data.get("code") or "").strip().upper()
        if not re.match(r"^[A-Z0-9][A-Z0-9_\-]{1,31}$", code):
            return None, "Coupon code must be 2-32 chars (letters, digits, '-' or '_')."
        out["code"] = code
    if not partial or "type" in data:
        raw_type = (data.get("type") or "").strip().lower()
        ctype = _COUPON_TYPE_ALIASES.get(raw_type)
        if not ctype:
            return None, "type must be one of: percent, fixed, free_delivery."
        out["type"] = ctype
    if not partial or "value" in data:
        try:
            value = float(data.get("value") or 0)
        except Exception:
            return None, "value must be a number."
        # Resolve the type we should validate against: explicit > existing > error
        ctype_for_check = out.get("type") or existing_type
        if not ctype_for_check:
            return None, "type must be one of: percent, fixed, free_delivery."
        if ctype_for_check == "percent":
            if value < 0 or value > 100:
                return None, "Percent value must be between 0 and 100."
        elif ctype_for_check == "fixed":
            if value <= 0:
                return None, "Fixed-amount value must be greater than 0."
        else:  # delivery
            value = 0.0
        out["value"] = value
    if "expires_at" in data:
        exp = (data.get("expires_at") or "").strip() or None
        if exp:
            try:
                datetime.fromisoformat(exp.replace(" ", "T"))
            except Exception:
                return None, "expires_at must be ISO 8601 (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS)."
        out["expires_at"] = exp
    if "is_active" in data:
        out["is_active"] = 1 if truthy_flag(data.get("is_active")) else 0
    return out, None


@app.route("/api/admin/coupons")
@admin_required
def api_admin_coupons_list():
    db = get_db()
    if expire_stale_spin_coupons(db):
        db.commit()
    uc_cols = _table_columns(db, "user_coupons")
    has_source = "source" in uc_cols
    coupon_cols = _table_columns(db, "coupons")
    has_deleted_at = "deleted_at" in coupon_cols
    # Soft-deleted coupons (deleted_at IS NOT NULL) should NOT appear in the
    # active management list -- otherwise admin sees ghost rows of coupons
    # they explicitly removed. The rows still exist so historical orders that
    # reference the code keep resolving. Set ?include_deleted=1 to opt-in to
    # the archived view (no UI surface for this yet, but the API is ready).
    include_deleted = str(request.args.get("include_deleted") or "").strip().lower() in ("1", "true", "yes")
    where_deleted = "" if (include_deleted or not has_deleted_at) else "WHERE c.deleted_at IS NULL"
    # Pull each coupon with the latest active assignment (if any) so the UI can
    # show "Global" vs "Gifted to user@x" without a second round-trip.
    rows = db.execute(
        f"""SELECT c.*,
                   COALESCE((SELECT COUNT(*) FROM user_coupons uc
                              WHERE uc.coupon_id=c.id AND COALESCE(uc.used,0)=1), 0) AS used_count,
                   COALESCE((SELECT COUNT(*) FROM orders o
                              WHERE o.coupon_code=c.code), 0) AS order_count,
                   COALESCE((SELECT COUNT(*) FROM user_coupons uc
                              WHERE uc.coupon_id=c.id
                                AND COALESCE(uc.used,0)=0
                                {"AND COALESCE(uc.source,'spin')='admin_gift'" if has_source else ""}), 0) AS gift_assignments
              FROM coupons c
             {where_deleted}
             ORDER BY c.created_at DESC, c.id DESC"""
    ).fetchall()
    out = []
    for r in rows:
        item = _serialize_coupon(r)
        item["gift_assignments"] = int(r["gift_assignments"] or 0)
        # Surface a single representative gifted recipient (most recent) so
        # the card can display "Gifted to email" inline. Multiple recipients
        # collapse to "Gifted to <name> +N more" on the UI.
        if has_source:
            sample = db.execute(
                """SELECT uc.id, uc.user_id, u.email AS user_email, u.name AS user_name
                     FROM user_coupons uc
                     LEFT JOIN users u ON u.id=uc.user_id
                    WHERE uc.coupon_id=?
                      AND COALESCE(uc.used,0)=0
                      AND COALESCE(uc.source,'spin')='admin_gift'
                    ORDER BY uc.assigned_at DESC, uc.id DESC
                    LIMIT 1""",
                (r["id"],),
            ).fetchone()
            if sample:
                item["assigned_user"] = {
                    "id": sample["user_id"],
                    "email": sample["user_email"],
                    "name": sample["user_name"],
                }
        # Convenience visibility: is this code a global admin coupon or a spin row
        item["visibility"] = "spin" if (item.get("source") == "spin") else (
            "gifted" if item.get("gift_assignments", 0) > 0 else "global"
        )
        out.append(item)
    return ok({"coupons": out})


@app.route("/api/admin/coupons", methods=["POST"])
@admin_required
def api_admin_coupons_create():
    limited = rate_limit("admin_coupon_create", 30, 300, current_user_id())
    if limited: return limited
    data = request.get_json(silent=True) or {}
    payload, error = _normalize_coupon_payload(data, partial=False)
    if error: return err(error)
    db = get_db()
    if db.execute("SELECT 1 FROM coupons WHERE code=?", (payload["code"],)).fetchone():
        return err("A coupon with that code already exists.", 409)
    cur = db.execute(
        "INSERT INTO coupons(code, type, value, expires_at, source, is_active) VALUES(?,?,?,?,?,?)",
        (payload["code"], payload["type"], payload["value"],
         payload.get("expires_at"), "admin", payload.get("is_active", 1)),
    )
    audit(db, "coupon_create", "coupons", cur.lastrowid, {"code": payload["code"]})
    db.commit()
    row = db.execute("SELECT * FROM coupons WHERE id=?", (cur.lastrowid,)).fetchone()
    return ok({"coupon": _serialize_coupon(row)}, status=201)


@app.route("/api/admin/coupons/<int:coupon_id>", methods=["PATCH"])
@admin_required
def api_admin_coupons_update(coupon_id):
    limited = rate_limit("admin_coupon_update", 60, 300, current_user_id())
    if limited: return limited
    data = request.get_json(silent=True) or {}
    db = get_db()
    existing = db.execute("SELECT * FROM coupons WHERE id=?", (coupon_id,)).fetchone()
    if not existing:
        return err("Coupon not found.", 404)
    payload, error = _normalize_coupon_payload(data, partial=True, existing_type=existing["type"])
    if error: return err(error)
    if not payload: return err("No fields to update.")
    if "code" in payload and payload["code"] != existing["code"]:
        clash = db.execute(
            "SELECT 1 FROM coupons WHERE code=? AND id<>?",
            (payload["code"], coupon_id),
        ).fetchone()
        if clash:
            return err("A coupon with that code already exists.", 409)
    sets = ", ".join(f"{k}=?" for k in payload.keys())
    params = list(payload.values()) + [coupon_id]
    db.execute(f"UPDATE coupons SET {sets} WHERE id=?", params)
    audit(db, "coupon_update", "coupons", coupon_id, {"keys": list(payload.keys())})
    db.commit()
    row = db.execute("SELECT * FROM coupons WHERE id=?", (coupon_id,)).fetchone()
    return ok({"coupon": _serialize_coupon(row)})


@app.route("/api/admin/coupons/<int:coupon_id>", methods=["DELETE"])
@admin_required
def api_admin_coupons_delete(coupon_id):
    """Admin coupon delete.

    Behavior matrix (in order of precedence):
      * Unused and not referenced by any order  -> HARD DELETE
        (also remove dangling unused user_coupons assignments).
      * Used in any order OR redeemed via user_coupons -> SOFT DELETE
        (UPDATE coupons.is_active=0). The row stays so historical orders /
        receipts still reference a real coupon record. Already-inactive
        coupons hit this same branch and remain inactive (idempotent).
      * Always returns a single uniform response so the frontend can show a
        precise toast. Never fails silently. Returns 404 only if the id does
        not exist at all.
    """
    limited = rate_limit("admin_coupon_delete", 30, 300, current_user_id())
    if limited: return limited
    db = get_db()
    existing = db.execute("SELECT * FROM coupons WHERE id=?", (coupon_id,)).fetchone()
    if not existing:
        return err("Coupon not found.", 404)
    code = existing["code"]
    in_orders = db.execute(
        "SELECT 1 FROM orders WHERE coupon_code=? LIMIT 1", (code,)
    ).fetchone()
    in_user_redemption = db.execute(
        """SELECT 1 FROM user_coupons
            WHERE (coupon_id=? OR code=?) AND COALESCE(used,0)=1
            LIMIT 1""",
        (coupon_id, code),
    ).fetchone()
    historical = bool(in_orders or in_user_redemption)
    coupon_cols = _table_columns(db, "coupons")
    has_deleted_at = "deleted_at" in coupon_cols
    try:
        if historical:
            # Soft delete: deactivate AND stamp deleted_at so the coupon is
            # filtered out of the active management list, while the row stays
            # so orders.coupon_code still resolves. Also clear any unused
            # assignments so the coupon cannot be applied by anyone else.
            if has_deleted_at:
                db.execute(
                    "UPDATE coupons SET is_active=0, deleted_at=datetime('now') WHERE id=?",
                    (coupon_id,),
                )
            else:
                db.execute(
                    "UPDATE coupons SET is_active=0 WHERE id=?", (coupon_id,)
                )
            db.execute(
                """DELETE FROM user_coupons
                    WHERE (coupon_id=? OR code=?) AND COALESCE(used,0)=0""",
                (coupon_id, code),
            )
            audit(db, "coupon_soft_delete", "coupons", coupon_id, {"code": code})
            db.commit()
            row = db.execute("SELECT * FROM coupons WHERE id=?", (coupon_id,)).fetchone()
            return ok({
                "coupon": _serialize_coupon(row),
                "soft_deleted": True,
                "action": "soft_deleted",
                "message": "Coupon archived (kept on historical orders, no longer usable).",
            })
        # Safe to hard delete - wipe unused assignments first then the coupon row.
        db.execute(
            "DELETE FROM user_coupons WHERE (coupon_id=? OR code=?) AND COALESCE(used,0)=0",
            (coupon_id, code),
        )
        db.execute("DELETE FROM coupons WHERE id=?", (coupon_id,))
        audit(db, "coupon_hard_delete", "coupons", coupon_id, {"code": code})
        db.commit()
        return ok({
            "id": coupon_id,
            "deleted": True,
            "action": "hard_deleted",
            "message": "Coupon removed.",
        })
    except Exception as exc:
        try: db.rollback()
        except Exception: pass
        return err(f"Could not delete coupon: {exc}", 500)


# =====================================================================
# ADMIN: GIFT / ASSIGN A COUPON TO A USER
# =====================================================================

def _serialize_user_coupon(row, user_row=None):
    if row is None:
        return None
    out = {
        "id": row["id"],
        "user_id": row["user_id"],
        "coupon_id": row["coupon_id"],
        "code": row["code"],
        "expires_at": row["expires_at"],
        "prize_label": row["prize_label"],
        "used": bool(row["used"]),
        "assigned_at": row["assigned_at"],
        "used_at": row["used_at"],
    }
    keys = row.keys()
    if "source" in keys:
        out["source"] = row["source"] or "spin"
    if "assigned_by" in keys:
        out["assigned_by"] = row["assigned_by"]
    if user_row is not None:
        out["user_email"] = user_row["email"]
        out["user_name"] = user_row["name"]
    return out


@app.route("/api/admin/users/search")
@admin_required
def api_admin_users_search():
    """Search non-admin users by email or name. Used by the admin coupon gift modal."""
    q = (request.args.get("q") or "").strip()
    if not q:
        return ok({"users": []})
    db = get_db()
    like = f"%{q.lower()}%"
    rows = db.execute(
        """SELECT id, name, email, is_admin
             FROM users
            WHERE COALESCE(is_deleted, 0)=0
              AND (LOWER(email) LIKE ? OR LOWER(name) LIKE ?)
            ORDER BY (LOWER(email)=?) DESC, (LOWER(name)=?) DESC, id ASC
            LIMIT 25""",
        (like, like, q.lower(), q.lower()),
    ).fetchall()
    return ok({"users": [
        {"id": r["id"], "email": r["email"], "name": r["name"], "is_admin": bool(r["is_admin"])}
        for r in rows
    ]})


@app.route("/api/admin/coupons/<int:coupon_id>/assign", methods=["POST"])
@admin_required
def api_admin_coupons_assign(coupon_id):
    """Gift / assign an existing coupon to a specific user.

    Body: {"user_id": int} OR {"email": "user@example.com"}.

    Rules:
      * Coupon must exist and be active and not expired.
      * Target user must exist, must not be soft-deleted, must not be admin
        (admins do not need user-specific coupons).
      * If the same user already has an unused, unexpired assignment of this
        coupon, the request is rejected as a duplicate.
      * On success a row is inserted in user_coupons with source='admin_gift'
        and assigned_by=current admin id. The coupon code stored is the
        admin coupon's own code so the user can apply it directly.
    """
    limited = rate_limit("admin_coupon_assign", 30, 300, current_user_id())
    if limited: return limited
    data = request.get_json(silent=True) or {}
    db = get_db()
    coupon = db.execute("SELECT * FROM coupons WHERE id=?", (coupon_id,)).fetchone()
    if not coupon:
        return err("Coupon not found.", 404)
    is_active = coupon["is_active"] if "is_active" in coupon.keys() and coupon["is_active"] is not None else 1
    if not is_active:
        return err("Cannot gift a deactivated coupon. Reactivate it first.", 409)
    if coupon_is_expired(coupon["expires_at"]):
        return err("Cannot gift an expired coupon.", 409)

    # Resolve target user
    user_id = data.get("user_id")
    email = (data.get("email") or "").strip().lower()
    target = None
    if user_id:
        try:
            user_id = int(user_id)
        except (TypeError, ValueError):
            return err("user_id must be a number.")
        target = db.execute(
            "SELECT id, name, email, is_admin, is_deleted FROM users WHERE id=?",
            (user_id,),
        ).fetchone()
    elif email:
        target = db.execute(
            "SELECT id, name, email, is_admin, is_deleted FROM users WHERE LOWER(email)=?",
            (email,),
        ).fetchone()
    else:
        return err("Provide user_id or email.")
    if not target:
        return err("User not found.", 404)
    if target["is_deleted"]:
        return err("Cannot gift a coupon to a deleted account.", 409)
    if target["is_admin"]:
        return err("Admins cannot receive gifted coupons.", 409)

    # Reject duplicate active assignment of the same coupon to the same user.
    dup = db.execute(
        """SELECT id FROM user_coupons
            WHERE user_id=? AND coupon_id=? AND COALESCE(used,0)=0""",
        (target["id"], coupon_id),
    ).fetchone()
    if dup:
        return err("This user already has an active assignment of this coupon.", 409)

    # Insert the assignment. The code stored is the coupon's own code so the
    # user can paste it at checkout. We honour the coupon's expires_at; admin
    # gifts intentionally do NOT inherit "midnight tonight" like spin coupons.
    uc_cols = _table_columns(db, "user_coupons")
    insert_cols = ["user_id", "coupon_id", "code", "expires_at", "prize_label"]
    insert_vals = [target["id"], coupon_id, coupon["code"],
                   coupon["expires_at"], "Admin gift"]
    if "source" in uc_cols:
        insert_cols.append("source")
        insert_vals.append("admin_gift")
    if "assigned_by" in uc_cols:
        insert_cols.append("assigned_by")
        insert_vals.append(current_user_id())
    placeholders = ",".join(["?"] * len(insert_vals))
    db.execute(
        f"INSERT INTO user_coupons({','.join(insert_cols)}) VALUES({placeholders})",
        insert_vals,
    )
    new_id = db.execute("SELECT last_insert_rowid() AS id").fetchone()["id"]
    audit(db, "coupon_assign", "user_coupons", new_id,
          {"coupon_id": coupon_id, "user_id": target["id"], "code": coupon["code"]})
    db.commit()
    row = db.execute("SELECT * FROM user_coupons WHERE id=?", (new_id,)).fetchone()
    return ok({
        "assignment": _serialize_user_coupon(row, target),
        "message": f"Coupon {coupon['code']} gifted to {target['email']}.",
    }, status=201)


@app.route("/api/admin/coupons/<int:coupon_id>/assignments")
@admin_required
def api_admin_coupons_assignments(coupon_id):
    """List active and historical user assignments for a given coupon."""
    db = get_db()
    coupon = db.execute("SELECT * FROM coupons WHERE id=?", (coupon_id,)).fetchone()
    if not coupon:
        return err("Coupon not found.", 404)
    rows = db.execute(
        """SELECT uc.*, u.email AS user_email, u.name AS user_name
             FROM user_coupons uc
             LEFT JOIN users u ON u.id=uc.user_id
            WHERE uc.coupon_id=? OR uc.code=?
            ORDER BY uc.assigned_at DESC, uc.id DESC""",
        (coupon_id, coupon["code"]),
    ).fetchall()
    out = []
    for r in rows:
        item = _serialize_user_coupon(r)
        if "user_email" in r.keys():
            item["user_email"] = r["user_email"]
        if "user_name" in r.keys():
            item["user_name"] = r["user_name"]
        out.append(item)
    return ok({"assignments": out})


@app.route("/api/admin/users")
@admin_required
def api_admin_users():
    db = get_db()
    rows = db.execute(
        """SELECT id, name, email, birthdate, phone, phone_country, phone_country_code,
                  phone_dial_code, phone_national, phone_e164,
                  is_admin, is_deleted, created_at, last_login_at
           FROM users ORDER BY id DESC"""
    ).fetchall()
    return ok({"users": [dict(r) for r in rows]})


@app.route("/api/phone-countries")
def api_phone_countries():
    """Public read-only list of supported phone countries (mirrors PHONE_COUNTRY_RULES).

    Useful for any future UI that wants to render the country selector from
    backend data. The frontend ships an inline copy as the source of truth for
    real-time validation; this endpoint exists for parity and future use.
    """
    out = [
        {"code": iso, "name": r["name"], "dial": r["dial"],
         "flag": r["flag"], "lengths": list(r["lengths"])}
        for iso, r in PHONE_COUNTRY_RULES.items()
    ]
    out.sort(key=lambda c: c["name"])
    return ok({"countries": out})


def _slug_part(value, fallback="item"):
    slug = re.sub(r"[^a-z0-9]+", "-", str(value or "").strip().lower()).strip("-")
    return slug or fallback


def _unique_product_code(db, league_key, team, season=None):
    base = _slug_part("-".join([league_key or "rest", team or "team", season or "jersey"]))
    code = base[:80]
    suffix = 1
    while db.execute("SELECT 1 FROM products WHERE product_code=?", (code,)).fetchone():
        suffix += 1
        code = f"{base[:74]}-{suffix}"
    return code


def _normalize_product_payload(db, data, partial=False, current_id=None):
    payload = {}
    if not partial or "team" in data:
        team = re.sub(r"\s+", " ", str(data.get("team") or "").strip())
        if len(team) < 2 or len(team) > 80:
            return None, "Team/name must be 2-80 characters."
        payload["team"] = team
    if not partial or "league" in data or "league_key" in data:
        raw_league = data.get("league") if "league" in data else data.get("league_key")
        league_key, league_display = _canonical_league(raw_league)
        payload["league"] = league_display
        payload["league_key"] = league_key
    if not partial or "product_name" in data:
        product_name = re.sub(r"\s+", " ", str(data.get("product_name") or data.get("name") or "").strip())
        if not product_name and payload.get("team"):
            product_name = payload["team"]
        if not product_name or len(product_name) > 120:
            return None, "Product name is required and must be 120 characters or fewer."
        payload["product_name"] = product_name
    if not partial or "base_price" in data or "price" in data:
        try:
            price = float(data.get("base_price", data.get("price")))
        except Exception:
            return None, "Price must be a number."
        if price < 0 or price > 10000:
            return None, "Price must be between 0 and 10000."
        payload["base_price"] = round(price, 2)
    if "image_url" in data or "image" in data:
        image = str(data.get("image_url", data.get("image")) or "").strip()
        if len(image) > 500:
            return None, "Image URL/path is too long."
        payload["image_url"] = image or None
    if "season" in data or (not partial):
        season = re.sub(r"\s+", " ", str(data.get("season") or "").strip())
        if season and len(season) > 40:
            return None, "Season must be 40 characters or fewer."
        payload["season"] = season or None
    if "display_order" in data:
        try:
            payload["display_order"] = int(data.get("display_order") or 0)
        except Exception:
            return None, "Display order must be an integer."
    if "sales_rank" in data:
        try:
            payload["sales_rank"] = int(data.get("sales_rank") or 0)
        except Exception:
            return None, "Sales rank must be an integer."
    if "is_active" in data or "active" in data:
        payload["is_active"] = 1 if truthy_flag(data.get("is_active", data.get("active"))) else 0

    team_for_check = payload.get("team")
    league_for_check = payload.get("league")
    if team_for_check and league_for_check:
        clash = db.execute(
            "SELECT id FROM products WHERE lower(team)=lower(?) AND league=? AND id<>?",
            (team_for_check, league_for_check, current_id or 0),
        ).fetchone()
        if clash:
            return None, "A product for this team and league already exists."
    return payload, None


@app.route("/api/admin/products")
@admin_required
def api_admin_products():
    db = get_db()
    rows = db.execute("SELECT * FROM products ORDER BY display_order, id").fetchall()
    out = []
    for p in rows:
        out.append(serialize_product(p, get_stock_by_size(db, p["id"])))
    return ok({"products": out})


@app.route("/api/admin/products", methods=["POST"])
@admin_required
def api_admin_products_create():
    data = request.get_json(silent=True) or {}
    db = get_db()
    payload, error = _normalize_product_payload(db, data, partial=False)
    if error: return err(error)
    explicit_code = str(data.get("product_code") or "").strip().lower()
    if explicit_code:
        if not re.match(r"^[a-z0-9][a-z0-9\-]{2,96}$", explicit_code):
            return err("Product code must use lowercase letters, numbers and hyphens.")
        if db.execute("SELECT 1 FROM products WHERE product_code=?", (explicit_code,)).fetchone():
            return err("Product code already exists.", 409)
        product_code = explicit_code
    else:
        product_code = _unique_product_code(db, payload["league_key"], payload["team"], payload.get("season"))

    stock_by_size = data.get("stock_by_size") if isinstance(data.get("stock_by_size"), dict) else {}
    normalized_stock = {}
    for size in VALID_SIZES:
        try:
            qty = int(stock_by_size.get(size, 0) or 0)
        except Exception:
            return err(f"Stock for {size} must be an integer.")
        if qty < 0:
            return err("Stock cannot be negative.")
        normalized_stock[size] = qty

    cur = db.execute(
        """INSERT INTO products(product_code, team, league, league_key, product_name,
                                image_url, base_price, season, display_order, sales_rank, is_active)
           VALUES(?,?,?,?,?,?,?,?,?,?,?)""",
        (
            product_code, payload["team"], payload["league"], payload["league_key"],
            payload["product_name"], payload.get("image_url"), payload["base_price"],
            payload.get("season"), payload.get("display_order", 0),
            payload.get("sales_rank", 0), payload.get("is_active", 1),
        ),
    )
    product_db_id = cur.lastrowid
    for size, qty in normalized_stock.items():
        db.execute(
            "INSERT INTO inventory(product_id, size, quantity) VALUES(?,?,?)",
            (product_db_id, size, qty),
        )
    audit(db, "product_create", "products", product_db_id, {"product_code": product_code})
    db.commit()
    row = db.execute("SELECT * FROM products WHERE id=?", (product_db_id,)).fetchone()
    return ok({"product": serialize_product(row, get_stock_by_size(db, product_db_id))}, status=201)


@app.route("/api/admin/products/<product_id>", methods=["PATCH"])
@admin_required
def api_admin_products_update(product_id):
    data = request.get_json(silent=True) or {}
    db = get_db()
    p = product_by_code(db, product_id)
    if not p: return err("Product not found", 404)
    if "product_code" in data and str(data.get("product_code") or "").strip() != (p["product_code"] or ""):
        return err("Product code is stable and cannot be changed.")
    payload, error = _normalize_product_payload(db, data, partial=True, current_id=p["id"])
    if error: return err(error)
    if not payload:
        return err("No fields to update.")
    candidate_team = payload.get("team", p["team"])
    candidate_league = payload.get("league", p["league"])
    clash = db.execute(
        "SELECT id FROM products WHERE lower(team)=lower(?) AND league=? AND id<>?",
        (candidate_team, candidate_league, p["id"]),
    ).fetchone()
    if clash:
        return err("A product for this team and league already exists.", 409)
    sets = ", ".join(f"{k}=?" for k in payload.keys())
    db.execute(
        f"UPDATE products SET {sets}, updated_at=datetime('now') WHERE id=?",
        list(payload.values()) + [p["id"]],
    )
    audit(db, "product_update", "products", p["id"], {"keys": list(payload.keys())})
    db.commit()
    row = db.execute("SELECT * FROM products WHERE id=?", (p["id"],)).fetchone()
    return ok({"product": serialize_product(row, get_stock_by_size(db, p["id"]))})


def _csv_response(filename, headers, rows):
    buf = io.StringIO()
    writer = csv.writer(buf, lineterminator="\r\n")
    writer.writerow(headers)
    for row in rows:
        writer.writerow(["" if value is None else value for value in row])
    # UTF-8 BOM helps Excel detect the encoding while preserving valid CSV.
    csv_text = "\ufeff" + buf.getvalue()
    resp = make_response(csv_text)
    resp.headers["Content-Type"] = "text/csv; charset=utf-8"
    resp.headers["Content-Disposition"] = f'attachment; filename="{filename}"'
    resp.headers["X-Content-Type-Options"] = "nosniff"
    return resp


@app.route("/api/admin/export/<kind>.csv")
@admin_required
def api_admin_export(kind):
    kind = (kind or "").strip().lower()
    db = get_db()
    if kind == "orders":
        rows = db.execute(
            """SELECT order_code, user_name, email, phone_e164, phone_country,
                      state, city, road, subtotal,
                      print_total, delivery_fee, discount_total, grand_total,
                      status, coupon_code, created_at
               FROM orders ORDER BY id DESC"""
        ).fetchall()
        return _csv_response("orders.csv", rows[0].keys() if rows else [
            "order_code", "user_name", "email", "phone_e164", "phone_country",
            "state", "city", "road", "subtotal",
            "print_total", "delivery_fee", "discount_total", "grand_total",
            "status", "coupon_code", "created_at",
        ], [tuple(r) for r in rows])
    if kind == "products":
        rows = db.execute(
            """SELECT p.product_code, p.team, p.league, p.product_name, p.base_price,
                      p.season, p.is_active, COALESCE(SUM(i.quantity),0) AS total_stock
               FROM products p LEFT JOIN inventory i ON i.product_id=p.id
               GROUP BY p.id ORDER BY p.display_order, p.id"""
        ).fetchall()
        return _csv_response("products.csv", rows[0].keys() if rows else [
            "product_code", "team", "league", "product_name", "base_price", "season", "is_active", "total_stock",
        ], [tuple(r) for r in rows])
    if kind == "users":
        rows = db.execute(
            """SELECT id, name, email, birthdate, phone, phone_e164, phone_country,
                      is_admin, is_deleted, created_at, last_login_at
               FROM users ORDER BY id DESC"""
        ).fetchall()
        return _csv_response("users.csv", rows[0].keys() if rows else [
            "id", "name", "email", "birthdate", "phone", "phone_e164", "phone_country",
            "is_admin", "is_deleted", "created_at", "last_login_at",
        ], [tuple(r) for r in rows])
    if kind == "messages":
        rows = db.execute(
            """SELECT id, created_at AS date, type, name, email,
                      COALESCE(NULLIF(subject,''), role, '') AS subject_role,
                      message,
                      CASE WHEN is_read=1 THEN 'read' ELSE 'unread' END AS read_status,
                      cv_file
               FROM messages ORDER BY id DESC"""
        ).fetchall()
        return _csv_response("messages.csv", rows[0].keys() if rows else [
            "id", "date", "type", "name", "email", "subject_role", "message", "read_status", "cv_file",
        ], [tuple(r) for r in rows])
    if kind == "ratings":
        rows = db.execute(
            """SELECT r.id, o.order_code, u.name, u.email, r.rating, r.comment,
                      r.created_at, r.updated_at
               FROM ratings r JOIN orders o ON o.id=r.order_id
               JOIN users u ON u.id=r.user_id ORDER BY r.id DESC"""
        ).fetchall()
        return _csv_response("ratings.csv", rows[0].keys() if rows else [
            "id", "order_code", "name", "email", "rating", "comment", "created_at", "updated_at",
        ], [tuple(r) for r in rows])
    if kind == "coupons":
        rows = db.execute(
            "SELECT id, code, type, value, expires_at, is_active, created_at FROM coupons ORDER BY id DESC"
        ).fetchall()
        return _csv_response("coupons.csv", rows[0].keys() if rows else [
            "id", "code", "type", "value", "expires_at", "is_active", "created_at",
        ], [tuple(r) for r in rows])
    return err("Unknown export type.", 404)


@app.route("/api/admin/settings")
@admin_required
def api_admin_settings():
    db = get_db()
    rows = db.execute("SELECT key, value_json, updated_at FROM admin_settings").fetchall()
    out = {}
    for r in rows:
        try:
            out[r["key"]] = json.loads(r["value_json"])
        except Exception:
            out[r["key"]] = r["value_json"]
    return ok({"settings": out})


@app.route("/api/admin/settings", methods=["PATCH"])
@admin_required
def api_admin_settings_update():
    data = request.get_json(silent=True) or {}
    if not isinstance(data, dict): return err("Body must be a JSON object")
    db = get_db()
    for k, v in data.items():
        if not isinstance(k, str): continue
        db.execute(
            """INSERT INTO admin_settings(key, value_json, updated_at)
               VALUES(?,?,datetime('now'))
               ON CONFLICT(key) DO UPDATE SET value_json=excluded.value_json, updated_at=datetime('now')""",
            (k, json.dumps(v)),
        )
    audit(db, "admin_settings_update", "admin_settings", None, {"keys": list(data.keys())})
    db.commit()
    return ok({"updated": list(data.keys())})


# =====================================================================
# ONE-TIME localStorage MIGRATION
# =====================================================================

@app.route("/api/migrate-local-storage", methods=["POST"])
def api_migrate_local_storage():
    """Safely import legacy browser data sent by the frontend on first load.

    Accepts an envelope describing cart, wishlist, ratings, etc. Only cart
    and wishlist for the *currently logged-in user* (or guest) are imported;
    other types are accepted but only inserted if not already present and
    only when they can be safely validated.
    """
    data = request.get_json(silent=True) or {}
    db = get_db()
    resp = make_response()
    owner_kind, owner_value = get_cart_owner(db, resp)
    imported = {"cart": 0, "wishlist": 0, "ratings": 0, "messages": 0}

    # Cart
    for item in (data.get("cart") or []):
        pid = item.get("id") or item.get("product_id")
        p = product_by_code(db, pid)
        if not p: continue
        size = (item.get("size") or "").upper() or None
        if size and size not in VALID_SIZES: continue
        qty = max(1, int(item.get("quantity") or item.get("qty") or 1))
        personalize = 1 if item.get("personalize") else 0
        custom_name = (item.get("customName") or "").strip().upper() or None
        custom_number = str(item.get("customNumber") or "").strip() or None
        if custom_name and not valid_print_name(custom_name):
            continue
        if custom_number and not (custom_number.isdigit() and 0 <= int(custom_number) <= 99):
            continue
        tbl = cart_table_for(owner_kind); col = cart_id_col_for(owner_kind)
        try:
            db.execute(
                f"""INSERT INTO {tbl}({col}, product_id, size, qty, print_enabled, print_text, print_number_value)
                    VALUES(?,?,?,?,?,?,?)
                    ON CONFLICT DO NOTHING""",
                (owner_value, p["id"], size, qty, personalize, custom_name, custom_number),
            )
            imported["cart"] += 1
        except Exception:
            pass

    # Wishlist
    for pid in (data.get("wishlist") or []):
        p = product_by_code(db, pid)
        if not p: continue
        tbl = wishlist_table_for(owner_kind); col = wishlist_id_col_for(owner_kind)
        try:
            db.execute(f"INSERT OR IGNORE INTO {tbl}({col}, product_id) VALUES(?,?)",
                       (owner_value, p["id"]))
            imported["wishlist"] += 1
        except Exception:
            pass

    db.commit()
    body = {"ok": True, "data": {"imported": imported}}
    resp.set_data(json.dumps(body)); resp.mimetype = "application/json"
    return resp


# =====================================================================
# STATIC FILE SERVING
# =====================================================================

# Keep the catch-all static route after every /api route. If this route is
# registered earlier it can intercept API and CSV export URLs and return the
# static "Not found" response before Flask reaches the real backend route.
@app.route("/<path:filename>")
def serve_static(filename):
    # Disallow obvious traversal & restrict to project root.
    fname = filename.replace("\\", "/")
    if ".." in fname.split("/"):
        return err("Not found", 404)
    # Prevent serving the databases or Backend.py over HTTP.
    blocked = {"backend.py", "elitekits.db", "elite kits.db"}
    if fname.lower() in blocked:
        return err("Not found", 404)
    target = (APP_ROOT / fname).resolve()
    try:
        target.relative_to(APP_ROOT)
    except ValueError:
        return err("Not found", 404)
    if not target.exists() or not target.is_file():
        return err("Not found", 404)
    return send_from_directory(APP_ROOT, fname)


# =====================================================================
# ENTRYPOINT
# =====================================================================

def main():
    fresh, copied = initialize_database()
    print(f"[Elite Kits] Active DB: {NEW_DB_PATH}")
    if fresh:
        print("[Elite Kits] Created new Elite Kits.db")
        if copied:
            print("[Elite Kits] Copied data from legacy elitekits.db (read-only)")
        else:
            print("[Elite Kits] No legacy elitekits.db found - starting clean")
    else:
        print("[Elite Kits] Using existing Elite Kits.db (idempotent migrations applied)")
    print("[Elite Kits] Default admin: admin@gmail.com / Admin123@")
    print("[Elite Kits] Open http://localhost:5000/  (Sign In is the entry point)")
    app.run(host="0.0.0.0", port=5000, debug=False)


if __name__ == "__main__":
    main()
