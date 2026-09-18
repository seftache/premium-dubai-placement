/* ============================================
   EmploisDubai — Database Types
   ============================================ */

// ── Agency ──
export type AgencyStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'CLOSED';
export type UserRole = 'AGENCY' | 'ADMIN';

export interface Agency {
  id: string;
  auth_user_id: string;
  email: string;
  company_name: string;
  contact_name: string;
  phone: string | null;
  country: string | null;
  license_number: string | null;
  address: string | null;
  status: AgencyStatus;
  balance_usd: number;
  created_at: string;
  updated_at: string;
}

// ── Offer ──
export type OfferStatus = 'ACTIVE' | 'PAUSED' | 'EXPIRED' | 'CLOSED';

export interface Offer {
  id: string;
  agency_id: string;
  title_fr: string;
  title_en: string | null;
  sector: string;
  description_fr: string | null;
  description_en: string | null;
  location: string;
  salary_range: string | null;
  status: OfferStatus;
  created_at: string;
  expires_at: string | null;
  updated_at: string;
}

// ── Candidate ──
export type CandidateStatus = 'NEW' | 'ASSIGNED' | 'UNLOCKED' | 'CONTACTED' | 'REJECTED';

export interface Candidate {
  id: string;
  ref_code: string;
  full_name: string;
  email: string;
  phone: string;
  expertise: string;
  passport_status: string;
  motivation: string | null;
  offer_id: string | null;
  agency_id: string | null;
  status: CandidateStatus;
  consent_given: boolean;
  consent_text: string;
  consent_ip: string | null;
  unlocked_at: string | null;
  unlocked_by: string | null;
  created_at: string;
}

/** Masked candidate view (before unlock) */
export interface CandidateMasked {
  id: string;
  ref_code: string;
  expertise: string;
  passport_status: string;
  status: CandidateStatus;
  created_at: string;
  offer_id: string | null;
}

/** Full candidate view (after unlock) */
export interface CandidateUnlocked extends CandidateMasked {
  full_name: string;
  email: string;
  phone: string;
  motivation: string | null;
  unlocked_at: string;
}

// ── Payment ──
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'CANCELLED';

export interface Payment {
  id: string;
  agency_id: string;
  paypal_order_id: string | null;
  amount_usd: number;
  currency: string;
  status: PaymentStatus;
  paypal_event: string | null;
  webhook_id: string | null;
  idempotency_key: string | null;
  created_at: string;
  confirmed_at: string | null;
}

// ── Transaction ──
export type TransactionType = 'TOPUP' | 'UNLOCK' | 'REFUND' | 'CORRECTION';

export interface Transaction {
  id: string;
  agency_id: string;
  candidate_id: string | null;
  payment_id: string | null;
  type: TransactionType;
  amount_usd: number;
  balance_before: number;
  balance_after: number;
  description: string | null;
  created_at: string;
  created_by: string;
}

// ── Contract ──
export type ContractStatus = 'DRAFT' | 'SENT' | 'SIGNED' | 'EXPIRED' | 'SUPERSEDED';

export interface Contract {
  id: string;
  agency_id: string;
  version: number;
  title: string;
  content_md: string;
  content_hash: string;
  status: ContractStatus;
  signed_at: string | null;
  signer_name: string | null;
  signer_email: string | null;
  signer_ip: string | null;
  signer_user_agent: string | null;
  signature_data: Record<string, unknown> | null;
  pdf_url: string | null;
  created_at: string;
  sent_at: string | null;
}

// ── Audit Log ──
export interface AuditLog {
  id: string;
  actor_id: string | null;
  actor_role: string;
  action: string;
  target_type: string;
  target_id: string | null;
  details: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
}

// ── Platform Config ──
export interface PlatformConfig {
  key: string;
  value: unknown;
  updated_at: string;
  updated_by: string | null;
}

// ── Dashboard Stats ──
export interface AgencyDashboardStats {
  balance_usd: number;
  candidates_available: number;
  candidates_unlocked: number;
  total_spent: number;
}

export interface AdminDashboardStats {
  total_agencies: number;
  active_agencies: number;
  total_candidates: number;
  total_unlocked: number;
  total_revenue: number;
  pending_payments: number;
}

// ── Unlock Result ──
export interface UnlockResult {
  success: boolean;
  error?: string;
  balance_before?: number;
  balance_after?: number;
  amount_deducted?: number;
}
