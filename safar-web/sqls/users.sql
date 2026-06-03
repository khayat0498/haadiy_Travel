-- ============================================================
-- SAFAR — Auth Domain
-- File: users.sql
-- Schema: auth
-- Description: Foydalanuvchi jadvali (better-auth bilan integratsiya)
-- Last updated: 2026-05-05
-- ============================================================

-- ============================================
-- Pre-requisite extensions (bir marta ishga tushiriladi)
-- ============================================
CREATE EXTENSION IF NOT EXISTS "citext";

-- ============================================
-- Schemas (loyiha bo'yicha bir marta yaratiladi)
-- ============================================
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS core;
-- app — RPC funksiyalar uchun, keyinroq yaratamiz

-- ============================================
-- Trigger function (BARCHA jadvallar uchun reusable)
-- Joylashuvi: core (markazlashgan utility schema)
-- ============================================
CREATE OR REPLACE FUNCTION core.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TABLE: auth.users
-- ============================================
CREATE TABLE auth.users (
  id                  BIGSERIAL    PRIMARY KEY,
  uuid                UUID         NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  email               CITEXT       NULL,
  email_verified      BOOLEAN      NOT NULL DEFAULT false,
  phone               TEXT         NULL,
  phone_verified      BOOLEAN      NOT NULL DEFAULT false,
  name                TEXT         NULL,
  image               TEXT         NULL,
  role                TEXT         NOT NULL DEFAULT 'user',
  locale              TEXT         NOT NULL DEFAULT 'en',
  preferred_currency  TEXT         NOT NULL DEFAULT 'UZS',
  country_code        TEXT         NULL,
  last_login_at       TIMESTAMPTZ  NULL,
  is_active           BOOLEAN      NOT NULL DEFAULT true,
  deleted_at          TIMESTAMPTZ  NULL,
  created_at          TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ  NOT NULL DEFAULT now(),

  CONSTRAINT users_role_check
    CHECK (role IN ('user', 'editor', 'admin', 'superadmin')),
  CONSTRAINT users_currency_check
    CHECK (preferred_currency IN ('UZS', 'USD')),
  CONSTRAINT users_email_format
    CHECK (email IS NULL OR email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  CONSTRAINT users_phone_format
    CHECK (phone IS NULL OR phone ~ '^\+[1-9]\d{1,14}$'),
  CONSTRAINT users_identifier_required
    CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

-- ============================================
-- Partial unique indexes
-- (soft delete'dan keyin email/phone qayta ishlatilishi mumkin)
-- ============================================
CREATE UNIQUE INDEX users_email_unique
  ON auth.users (email)
  WHERE deleted_at IS NULL AND email IS NOT NULL;

CREATE UNIQUE INDEX users_phone_unique
  ON auth.users (phone)
  WHERE deleted_at IS NULL AND phone IS NOT NULL;

-- ============================================
-- Performance indexes
-- ============================================
CREATE INDEX users_role_idx
  ON auth.users (role)
  WHERE deleted_at IS NULL;

CREATE INDEX users_locale_idx
  ON auth.users (locale);

CREATE INDEX users_created_at_idx
  ON auth.users (created_at DESC);

-- ============================================
-- updated_at trigger
-- ============================================
CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION core.update_updated_at_column();

-- ============================================
-- Deferred FK (core.languages jadvali yaratilgandan keyin):
-- ALTER TABLE auth.users ADD CONSTRAINT users_locale_fkey
--   FOREIGN KEY (locale) REFERENCES core.languages(code) ON UPDATE CASCADE;
-- ============================================

-- ============================================
-- Documentation comments
-- ============================================
COMMENT ON SCHEMA auth IS 'Autentifikatsiya — users, sessions, accounts, verifications, login_attempts';
COMMENT ON SCHEMA core IS 'Asosiy biznes-ma''lumot + utility funksiyalar';
COMMENT ON TABLE auth.users IS 'Foydalanuvchilar (better-auth bilan integratsiya)';
COMMENT ON COLUMN auth.users.uuid IS 'Tashqi API ID, better-auth ham shuni ishlatadi';
COMMENT ON COLUMN auth.users.email IS 'Login identifier (case-insensitive, partial unique)';
COMMENT ON COLUMN auth.users.phone IS 'E.164 format alternate identifier (+998901234567)';
COMMENT ON COLUMN auth.users.role IS 'RBAC: user / editor / admin / superadmin';
COMMENT ON COLUMN auth.users.deleted_at IS 'Soft delete + PII anonimlash';
