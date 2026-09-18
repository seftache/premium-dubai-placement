-- ============================================
-- EmploisDubai Multi-Agency Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. AGENCIES (Partner accounts)
-- ============================================
CREATE TABLE agencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  license_number TEXT,
  address TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACTIVE', 'SUSPENDED', 'CLOSED')),
  balance_usd DECIMAL(12,2) NOT NULL DEFAULT 0.00 CHECK (balance_usd >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 2. OFFERS (Job offers from agencies)
-- ============================================
CREATE TABLE offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  title_fr TEXT NOT NULL,
  title_en TEXT,
  sector TEXT NOT NULL,
  description_fr TEXT,
  description_en TEXT,
  location TEXT DEFAULT 'Dubai, UAE',
  salary_range TEXT,
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'PAUSED', 'EXPIRED', 'CLOSED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 3. CANDIDATES (Applications)
-- ============================================
CREATE TABLE candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ref_code TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  expertise TEXT NOT NULL,
  passport_status TEXT NOT NULL,
  motivation TEXT,
  offer_id UUID REFERENCES offers(id) ON DELETE SET NULL,
  agency_id UUID REFERENCES agencies(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'ASSIGNED', 'UNLOCKED', 'CONTACTED', 'REJECTED')),
  consent_given BOOLEAN NOT NULL DEFAULT FALSE,
  consent_text TEXT NOT NULL,
  consent_ip TEXT,
  unlocked_at TIMESTAMPTZ,
  unlocked_by UUID REFERENCES agencies(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX idx_candidates_agency ON candidates(agency_id);
CREATE INDEX idx_candidates_status ON candidates(status);
CREATE INDEX idx_candidates_ref ON candidates(ref_code);

-- Prevent duplicate unlock billing
CREATE UNIQUE INDEX idx_unique_unlock ON candidates(id, unlocked_by) WHERE unlocked_by IS NOT NULL;

-- ============================================
-- 4. PAYMENTS (PayPal top-ups)
-- ============================================
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  paypal_order_id TEXT UNIQUE,
  amount_usd DECIMAL(12,2) NOT NULL CHECK (amount_usd > 0),
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'CANCELLED')),
  paypal_event TEXT,
  webhook_id TEXT UNIQUE,
  idempotency_key TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ
);

CREATE INDEX idx_payments_agency ON payments(agency_id);
CREATE INDEX idx_payments_status ON payments(status);

-- ============================================
-- 5. TRANSACTIONS (Financial ledger)
-- ============================================
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  candidate_id UUID REFERENCES candidates(id),
  payment_id UUID REFERENCES payments(id),
  type TEXT NOT NULL CHECK (type IN ('TOPUP', 'UNLOCK', 'REFUND', 'CORRECTION')),
  amount_usd DECIMAL(12,2) NOT NULL,
  balance_before DECIMAL(12,2) NOT NULL,
  balance_after DECIMAL(12,2) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL DEFAULT 'SYSTEM'
);

CREATE INDEX idx_transactions_agency ON transactions(agency_id);
CREATE INDEX idx_transactions_type ON transactions(type);

-- ============================================
-- 6. CONTRACTS (Electronic agreements)
-- ============================================
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  version INTEGER NOT NULL DEFAULT 1,
  title TEXT NOT NULL,
  content_md TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'SENT', 'SIGNED', 'EXPIRED', 'SUPERSEDED')),
  signed_at TIMESTAMPTZ,
  signer_name TEXT,
  signer_email TEXT,
  signer_ip TEXT,
  signer_user_agent TEXT,
  signature_data JSONB,
  pdf_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sent_at TIMESTAMPTZ
);

CREATE INDEX idx_contracts_agency ON contracts(agency_id);

-- ============================================
-- 7. AUDIT LOG (Admin actions)
-- ============================================
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID,
  actor_role TEXT NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id UUID,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_log_actor ON audit_log(actor_id);
CREATE INDEX idx_audit_log_action ON audit_log(action);

-- ============================================
-- 8. PLATFORM CONFIG (Global settings)
-- ============================================
CREATE TABLE platform_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT
);

-- Insert default config
INSERT INTO platform_config (key, value, updated_by) VALUES
  ('candidate_price_usd', '10.00'::jsonb, 'SYSTEM'),
  ('paypal_mode', '"sandbox"'::jsonb, 'SYSTEM'),
  ('platform_currency', '"USD"'::jsonb, 'SYSTEM');

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_config ENABLE ROW LEVEL SECURITY;

-- AGENCIES: users can only see their own agency
CREATE POLICY "agencies_select_own" ON agencies
  FOR SELECT USING (auth_user_id = auth.uid());

CREATE POLICY "agencies_update_own" ON agencies
  FOR UPDATE USING (auth_user_id = auth.uid())
  WITH CHECK (auth_user_id = auth.uid());

-- OFFERS: agencies see their own offers; public can see active offers
CREATE POLICY "offers_select_own" ON offers
  FOR SELECT USING (
    agency_id IN (SELECT id FROM agencies WHERE auth_user_id = auth.uid())
    OR status = 'ACTIVE'
  );

-- CANDIDATES: agencies see only candidates assigned to them
CREATE POLICY "candidates_select_own" ON candidates
  FOR SELECT USING (
    agency_id IN (SELECT id FROM agencies WHERE auth_user_id = auth.uid())
  );

-- PAYMENTS: agencies see only their own payments
CREATE POLICY "payments_select_own" ON payments
  FOR SELECT USING (
    agency_id IN (SELECT id FROM agencies WHERE auth_user_id = auth.uid())
  );

-- TRANSACTIONS: agencies see only their own transactions
CREATE POLICY "transactions_select_own" ON transactions
  FOR SELECT USING (
    agency_id IN (SELECT id FROM agencies WHERE auth_user_id = auth.uid())
  );

-- CONTRACTS: agencies see only their own contracts
CREATE POLICY "contracts_select_own" ON contracts
  FOR SELECT USING (
    agency_id IN (SELECT id FROM agencies WHERE auth_user_id = auth.uid())
  );

-- PLATFORM_CONFIG: readable by all authenticated users
CREATE POLICY "config_select_all" ON platform_config
  FOR SELECT USING (auth.role() = 'authenticated');

-- AUDIT_LOG: no direct access (admin only via service role)
-- No RLS policies = blocked by default with RLS enabled

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to generate candidate reference codes
CREATE OR REPLACE FUNCTION generate_ref_code()
RETURNS TEXT AS $$
DECLARE
  year_part TEXT;
  seq_num INTEGER;
  new_code TEXT;
BEGIN
  year_part := TO_CHAR(NOW(), 'YYYY');
  SELECT COALESCE(MAX(
    CAST(SUBSTRING(ref_code FROM 'ED-' || year_part || '-(\d+)') AS INTEGER)
  ), 0) + 1 INTO seq_num
  FROM candidates
  WHERE ref_code LIKE 'ED-' || year_part || '-%';
  
  new_code := 'ED-' || year_part || '-' || LPAD(seq_num::TEXT, 5, '0');
  RETURN new_code;
END;
$$ LANGUAGE plpgsql;

-- Function to safely unlock a candidate (atomic transaction)
CREATE OR REPLACE FUNCTION unlock_candidate(
  p_agency_id UUID,
  p_candidate_id UUID,
  p_price DECIMAL
)
RETURNS JSONB AS $$
DECLARE
  v_balance DECIMAL;
  v_already_unlocked BOOLEAN;
  v_candidate_agency UUID;
  v_result JSONB;
BEGIN
  -- Lock the agency row to prevent concurrent modifications
  SELECT balance_usd INTO v_balance
  FROM agencies
  WHERE id = p_agency_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'AGENCY_NOT_FOUND');
  END IF;

  -- Check if candidate exists and is assigned to this agency
  SELECT agency_id INTO v_candidate_agency
  FROM candidates
  WHERE id = p_candidate_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'CANDIDATE_NOT_FOUND');
  END IF;

  IF v_candidate_agency != p_agency_id THEN
    RETURN jsonb_build_object('success', false, 'error', 'CANDIDATE_NOT_ASSIGNED');
  END IF;

  -- Check if already unlocked by this agency
  SELECT EXISTS(
    SELECT 1 FROM candidates
    WHERE id = p_candidate_id AND unlocked_by = p_agency_id
  ) INTO v_already_unlocked;

  IF v_already_unlocked THEN
    RETURN jsonb_build_object('success', false, 'error', 'ALREADY_UNLOCKED');
  END IF;

  -- Check sufficient balance
  IF v_balance < p_price THEN
    RETURN jsonb_build_object('success', false, 'error', 'INSUFFICIENT_BALANCE', 'balance', v_balance, 'price', p_price);
  END IF;

  -- Deduct balance
  UPDATE agencies
  SET balance_usd = balance_usd - p_price,
      updated_at = NOW()
  WHERE id = p_agency_id;

  -- Record transaction
  INSERT INTO transactions (agency_id, candidate_id, type, amount_usd, balance_before, balance_after, description, created_by)
  VALUES (p_agency_id, p_candidate_id, 'UNLOCK', -p_price, v_balance, v_balance - p_price, 'Candidate unlock', 'SYSTEM');

  -- Unlock the candidate
  UPDATE candidates
  SET status = 'UNLOCKED',
      unlocked_at = NOW(),
      unlocked_by = p_agency_id
  WHERE id = p_candidate_id;

  RETURN jsonb_build_object(
    'success', true,
    'balance_before', v_balance,
    'balance_after', v_balance - p_price,
    'amount_deducted', p_price
  );
END;
$$ LANGUAGE plpgsql;

-- Auto-update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER agencies_updated_at
  BEFORE UPDATE ON agencies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER offers_updated_at
  BEFORE UPDATE ON offers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
