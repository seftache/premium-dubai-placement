import { createAdminClient } from './supabase/admin';
import type {
  Agency,
  Candidate,
  CandidateMasked,
  CandidateUnlocked,
  Payment,
  Transaction,
  Offer,
  Contract,
  AuditLog,
  PlatformConfig,
  UnlockResult,
} from './types';

// Detect if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('http')
  );
}

// ────────────────────────────────────────────────────────────
// In-Memory / Fallback Store for Local Testing & Demo
// ────────────────────────────────────────────────────────────
interface MockStore {
  agencies: Agency[];
  candidates: Candidate[];
  offers: Offer[];
  payments: Payment[];
  transactions: Transaction[];
  contracts: Contract[];
  auditLogs: AuditLog[];
  config: Record<string, unknown>;
}

// Initial mock data with sample active agency and candidate leads
const mockStore: MockStore = {
  agencies: [
    {
      id: 'agency-demo-1',
      auth_user_id: 'user-demo-1',
      email: 'contact@gulfrecruitment.ae',
      company_name: 'Gulf Luxury Staffing & Placements',
      contact_name: 'Karim Al Mansoori',
      phone: '+971 4 234 5678',
      country: 'United Arab Emirates',
      license_number: 'EAU-DED-782910',
      address: 'Office 402, Marina Plaza, Dubai',
      status: 'ACTIVE',
      balance_usd: 120.0,
      created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'agency-demo-2',
      auth_user_id: 'user-demo-2',
      email: 'recrutement@marina-hospitality.com',
      company_name: 'Marina Elite Hospitality',
      contact_name: 'Sarah Bernard',
      phone: '+971 50 123 4567',
      country: 'United Arab Emirates',
      license_number: 'EAU-DED-948123',
      address: 'Boulevard JBR, Dubai',
      status: 'ACTIVE',
      balance_usd: 50.0,
      created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  offers: [
    {
      id: 'offer-1',
      agency_id: 'agency-demo-1',
      title_fr: 'Chauffeur Privé VIP — Berlines de Luxe',
      title_en: 'VIP Private Chauffeur — Luxury Fleet',
      sector: 'chauffeur',
      description_fr: 'Chauffeur expérimenté pour transport de personnalités et clientèle hôtelière de luxe.',
      description_en: 'Experienced chauffeur for VIP and luxury hotel transport in Dubai.',
      location: 'Dubai Marina & Downtown',
      salary_range: '8,000 – 12,000 AED',
      status: 'ACTIVE',
      created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
      expires_at: new Date(Date.now() + 60 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'offer-2',
      agency_id: 'agency-demo-2',
      title_fr: 'Chef de Rang / Serveur en Restauration Étoilée',
      title_en: 'Senior Waiter / Chef de Rang — Fine Dining',
      sector: 'restauration-cuisine',
      description_fr: 'Service en salle haut de gamme pour palace à Downtown Dubai.',
      description_en: 'Fine dining service for luxury palace in Downtown Dubai.',
      location: 'Downtown Dubai',
      salary_range: '6,500 – 9,500 AED + Tips',
      status: 'ACTIVE',
      created_at: new Date(Date.now() - 8 * 86400000).toISOString(),
      expires_at: new Date(Date.now() + 45 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  candidates: [
    {
      id: 'cand-1',
      ref_code: 'ED-2026-00041',
      full_name: 'Moussa Traoré',
      email: 'm.traore@example.com',
      phone: '+225 07 45 67 89',
      expertise: 'chauffeur',
      passport_status: 'oui',
      motivation: '10 ans d\'expérience chauffeur VIP et conduite sécurisée.',
      offer_id: 'offer-1',
      agency_id: 'agency-demo-1',
      status: 'NEW',
      consent_given: true,
      consent_text: 'J\'accepte que mes informations soient transmises au partenaire recruteur pour cette offre.',
      consent_ip: '197.234.221.12',
      unlocked_at: null,
      unlocked_by: null,
      created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
    {
      id: 'cand-2',
      ref_code: 'ED-2026-00042',
      full_name: 'Alexandre Dupont',
      email: 'a.dupont@example.com',
      phone: '+33 6 78 90 12 34',
      expertise: 'restauration-cuisine',
      passport_status: 'oui',
      motivation: 'Maître d\'hôtel bilingue français/anglais, expérience à Paris et Genève.',
      offer_id: 'offer-2',
      agency_id: 'agency-demo-2',
      status: 'UNLOCKED',
      consent_given: true,
      consent_text: 'J\'accepte que mes informations soient transmises au partenaire recruteur pour cette offre.',
      consent_ip: '82.65.120.44',
      unlocked_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      unlocked_by: 'agency-demo-2',
      created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    {
      id: 'cand-3',
      ref_code: 'ED-2026-00043',
      full_name: 'Ibrahim Kone',
      email: 'i.kone@example.com',
      phone: '+225 05 12 34 56',
      expertise: 'securite',
      passport_status: 'en-cours',
      motivation: 'Agent de surveillance qualifié, certificat SSIAP et secourisme.',
      offer_id: null,
      agency_id: 'agency-demo-1',
      status: 'NEW',
      consent_given: true,
      consent_text: 'J\'accepte que mes informations soient transmises aux agences partenaires.',
      consent_ip: '197.234.221.15',
      unlocked_at: null,
      unlocked_by: null,
      created_at: new Date(Date.now() - 12 * 3600000).toISOString(),
    },
  ],
  payments: [
    {
      id: 'pay-demo-1',
      agency_id: 'agency-demo-1',
      paypal_order_id: 'PAYPAL-ORD-89210',
      amount_usd: 100.0,
      currency: 'USD',
      status: 'PAID',
      paypal_event: 'CHECKOUT.ORDER.APPROVED',
      webhook_id: 'WH-89210-AA',
      idempotency_key: 'PAYPAL-ORD-89210',
      created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      confirmed_at: new Date(Date.now() - 5 * 86400000 + 1000).toISOString(),
    },
  ],
  transactions: [
    {
      id: 'tx-demo-1',
      agency_id: 'agency-demo-1',
      candidate_id: null,
      payment_id: 'pay-demo-1',
      type: 'TOPUP',
      amount_usd: 100.0,
      balance_before: 20.0,
      balance_after: 120.0,
      description: 'Recharge solde partenaire via PayPal (#PAYPAL-ORD-89210)',
      created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      created_by: 'SYSTEM',
    },
    {
      id: 'tx-demo-2',
      agency_id: 'agency-demo-2',
      candidate_id: 'cand-2',
      payment_id: null,
      type: 'UNLOCK',
      amount_usd: -10.0,
      balance_before: 60.0,
      balance_after: 50.0,
      description: 'Déblocage profil candidat #ED-2026-00042',
      created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      created_by: 'SYSTEM',
    },
  ],
  contracts: [
    {
      id: 'contract-demo-1',
      agency_id: 'agency-demo-1',
      version: 1,
      title: 'Convention de Partenariat & Transmission de Candidats — EmploisDubai',
      content_md: `# CONVENTION DE PARTENARIAT COMMERCIAL\n\nEntre la plateforme **EmploisDubai.com** et l'Agence Partenaire **Gulf Luxury Staffing & Placements**.\n\n### 1. Objet\nMise à disposition d'un flux de candidatures qualifiées sur le territoire des Émirats Arabes Unis.\n\n### 2. Conditions Financières\n- Prix par candidat qualifié : 10 USD (Dix dollars américains).\n- Modalité : Déduction sur le Solde Partenaire prépayé.\n- Aucune commission ultérieure sur les honoraires de l'agence.\n\n### 3. Protection des Données (RGPD & Décrets EAU)\nL'agence s'engage à traiter les données des candidats avec stricte confidentialité et à des fins exclusives de recrutement.\n\n### 4. Responsabilités\nL'agence assume l'entière responsabilité des démarches de visa, contrat de travail et conformité aux règles du MOHRE.`,
      content_hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      status: 'SENT',
      signed_at: null,
      signer_name: null,
      signer_email: null,
      signer_ip: null,
      signer_user_agent: null,
      signature_data: null,
      pdf_url: null,
      created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
      sent_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    },
  ],
  auditLogs: [
    {
      id: 'log-1',
      actor_id: 'admin-1',
      actor_role: 'ADMIN',
      action: 'INIT_SYSTEM',
      target_type: 'SYSTEM',
      target_id: null,
      details: { info: 'Initialisation de la plateforme multi-agences' },
      ip_address: '127.0.0.1',
      created_at: new Date().toISOString(),
    },
  ],
  config: {
    candidate_price_usd: 10.0,
    paypal_mode: 'sandbox',
    platform_currency: 'USD',
  },
};

// ────────────────────────────────────────────────────────────
// Database Operations (Supabase with Mock Fallback)
// ────────────────────────────────────────────────────────────

// ── Agencies ──
export async function getAgencyById(id: string): Promise<Agency | null> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data } = await supabase.from('agencies').select('*').eq('id', id).single();
    return data || null;
  }
  return mockStore.agencies.find((a) => a.id === id) || null;
}

export async function getAgencyByEmail(email: string): Promise<Agency | null> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data } = await supabase.from('agencies').select('*').eq('email', email.toLowerCase().trim()).single();
    return data || null;
  }
  return mockStore.agencies.find((a) => a.email.toLowerCase() === email.toLowerCase().trim()) || null;
}

export async function getAllAgencies(): Promise<Agency[]> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data } = await supabase.from('agencies').select('*').order('created_at', { ascending: false });
    return data || [];
  }
  return [...mockStore.agencies];
}

export async function createAgency(agency: Partial<Agency>): Promise<Agency> {
  const newAgency: Agency = {
    id: agency.id || `agency-${Date.now()}`,
    auth_user_id: agency.auth_user_id || `auth-${Date.now()}`,
    email: agency.email!.toLowerCase().trim(),
    company_name: agency.company_name!,
    contact_name: agency.contact_name!,
    phone: agency.phone || null,
    country: agency.country || 'United Arab Emirates',
    license_number: agency.license_number || null,
    address: agency.address || null,
    status: agency.status || 'PENDING',
    balance_usd: agency.balance_usd || 0.0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from('agencies').insert(newAgency).select().single();
    if (error) throw error;
    return data;
  }

  mockStore.agencies.push(newAgency);
  return newAgency;
}

export async function updateAgency(id: string, updates: Partial<Agency>): Promise<Agency | null> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('agencies')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const idx = mockStore.agencies.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  mockStore.agencies[idx] = {
    ...mockStore.agencies[idx],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  return mockStore.agencies[idx];
}

// ── Candidates ──
export async function getCandidatesForAgency(agencyId: string): Promise<Array<CandidateMasked | CandidateUnlocked>> {
  let all: Candidate[] = [];
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data } = await supabase.from('candidates').select('*').eq('agency_id', agencyId).order('created_at', { ascending: false });
    all = data || [];
  } else {
    all = mockStore.candidates.filter((c) => c.agency_id === agencyId);
  }

  return all.map((c) => {
    const isUnlocked = c.unlocked_by === agencyId || c.status === 'UNLOCKED';
    if (isUnlocked) {
      return {
        id: c.id,
        ref_code: c.ref_code,
        full_name: c.full_name,
        email: c.email,
        phone: c.phone,
        expertise: c.expertise,
        passport_status: c.passport_status,
        motivation: c.motivation,
        offer_id: c.offer_id,
        status: c.status,
        created_at: c.created_at,
        unlocked_at: c.unlocked_at || c.created_at,
      } as CandidateUnlocked;
    }

    return {
      id: c.id,
      ref_code: c.ref_code,
      expertise: c.expertise,
      passport_status: c.passport_status,
      status: c.status,
      created_at: c.created_at,
      offer_id: c.offer_id,
    } as CandidateMasked;
  });
}

export async function getAllCandidatesAdmin(): Promise<Candidate[]> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data } = await supabase.from('candidates').select('*').order('created_at', { ascending: false });
    return data || [];
  }
  return [...mockStore.candidates];
}

export async function createCandidateSubmission(data: {
  fullName: string;
  email: string;
  phone: string;
  expertise: string;
  passportStatus: string;
  motivation?: string;
  offerId?: string;
  agencyId?: string;
  consentText: string;
  ipAddress?: string;
}): Promise<Candidate> {
  const currentYear = new Date().getFullYear();
  const count = (mockStore.candidates.length + 1).toString().padStart(5, '0');
  const refCode = `ED-${currentYear}-${count}`;

  // Assign to first active agency or specified agency
  let targetAgencyId = data.agencyId;
  if (!targetAgencyId) {
    const activeAgencies = mockStore.agencies.filter((a) => a.status === 'ACTIVE');
    if (activeAgencies.length > 0) {
      // Round-robin or first partner
      targetAgencyId = activeAgencies[0].id;
    }
  }

  const newCand: Candidate = {
    id: `cand-${Date.now()}`,
    ref_code: refCode,
    full_name: data.fullName.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    expertise: data.expertise,
    passport_status: data.passportStatus,
    motivation: data.motivation || null,
    offer_id: data.offerId || null,
    agency_id: targetAgencyId || null,
    status: 'NEW',
    consent_given: true,
    consent_text: data.consentText,
    consent_ip: data.ipAddress || null,
    unlocked_at: null,
    unlocked_by: null,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data: created, error } = await supabase.from('candidates').insert(newCand).select().single();
    if (error) throw error;
    return created;
  }

  mockStore.candidates.unshift(newCand);
  return newCand;
}

// ── Atomic Candidate Unlock ──
export async function unlockCandidateForAgency(
  agencyId: string,
  candidateId: string,
  priceUsd: number = 10.0
): Promise<UnlockResult> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    // Call the stored PostgreSQL transaction function
    const { data, error } = await supabase.rpc('unlock_candidate', {
      p_agency_id: agencyId,
      p_candidate_id: candidateId,
      p_price: priceUsd,
    });
    if (error) throw error;
    return data as UnlockResult;
  }

  // Fallback in-memory transaction
  const agency = mockStore.agencies.find((a) => a.id === agencyId);
  if (!agency) return { success: false, error: 'AGENCY_NOT_FOUND' };

  const cand = mockStore.candidates.find((c) => c.id === candidateId);
  if (!cand) return { success: false, error: 'CANDIDATE_NOT_FOUND' };

  if (cand.unlocked_by === agencyId || cand.status === 'UNLOCKED') {
    return { success: false, error: 'ALREADY_UNLOCKED' };
  }

  if (agency.balance_usd < priceUsd) {
    return {
      success: false,
      error: 'INSUFFICIENT_BALANCE',
      balance_before: agency.balance_usd,
      amount_deducted: priceUsd,
    };
  }

  const balanceBefore = agency.balance_usd;
  agency.balance_usd -= priceUsd;
  agency.updated_at = new Date().toISOString();

  cand.status = 'UNLOCKED';
  cand.unlocked_at = new Date().toISOString();
  cand.unlocked_by = agencyId;

  // Insert transaction
  mockStore.transactions.unshift({
    id: `tx-${Date.now()}`,
    agency_id: agencyId,
    candidate_id: candidateId,
    payment_id: null,
    type: 'UNLOCK',
    amount_usd: -priceUsd,
    balance_before: balanceBefore,
    balance_after: agency.balance_usd,
    description: `Déblocage candidat qualifié #${cand.ref_code}`,
    created_at: new Date().toISOString(),
    created_by: 'SYSTEM',
  });

  return {
    success: true,
    balance_before: balanceBefore,
    balance_after: agency.balance_usd,
    amount_deducted: priceUsd,
  };
}

// ── Financial Transactions ──
export async function getTransactionsForAgency(agencyId: string): Promise<Transaction[]> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from('transactions')
      .select('*')
      .eq('agency_id', agencyId)
      .order('created_at', { ascending: false });
    return data || [];
  }
  return mockStore.transactions.filter((t) => t.agency_id === agencyId);
}

export async function getAllTransactionsAdmin(): Promise<Transaction[]> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data } = await supabase.from('transactions').select('*').order('created_at', { ascending: false });
    return data || [];
  }
  return [...mockStore.transactions];
}

// ── PayPal Payments & Top-Ups ──
export async function recordPayPalPaymentSuccess(data: {
  agencyId: string;
  paypalOrderId: string;
  amountUsd: number;
  webhookId?: string;
  event?: string;
}): Promise<{ payment: Payment; transaction: Transaction; newBalance: number }> {
  const idempotencyKey = data.paypalOrderId;

  // Check if already processed
  const existingPay = mockStore.payments.find((p) => p.idempotency_key === idempotencyKey && p.status === 'PAID');
  if (existingPay) {
    const agency = await getAgencyById(data.agencyId);
    return {
      payment: existingPay,
      transaction: mockStore.transactions.find((t) => t.payment_id === existingPay.id)!,
      newBalance: agency?.balance_usd || 0,
    };
  }

  const agency = await getAgencyById(data.agencyId);
  if (!agency) throw new Error('Agency not found');

  const balanceBefore = agency.balance_usd;
  const balanceAfter = balanceBefore + data.amountUsd;

  const payment: Payment = {
    id: `pay-${Date.now()}`,
    agency_id: data.agencyId,
    paypal_order_id: data.paypalOrderId,
    amount_usd: data.amountUsd,
    currency: 'USD',
    status: 'PAID',
    paypal_event: data.event || 'PAYMENT.CAPTURE.COMPLETED',
    webhook_id: data.webhookId || `wh-${Date.now()}`,
    idempotency_key: idempotencyKey,
    created_at: new Date().toISOString(),
    confirmed_at: new Date().toISOString(),
  };

  const transaction: Transaction = {
    id: `tx-${Date.now()}`,
    agency_id: data.agencyId,
    candidate_id: null,
    payment_id: payment.id,
    type: 'TOPUP',
    amount_usd: data.amountUsd,
    balance_before: balanceBefore,
    balance_after: balanceAfter,
    description: `Recharge Solde Partenaire via PayPal (#${data.paypalOrderId})`,
    created_at: new Date().toISOString(),
    created_by: 'PAYPAL_WEBHOOK',
  };

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    await supabase.from('payments').insert(payment);
    await supabase.from('transactions').insert(transaction);
    await supabase.from('agencies').update({ balance_usd: balanceAfter }).eq('id', data.agencyId);
    return { payment, transaction, newBalance: balanceAfter };
  }

  mockStore.payments.unshift(payment);
  mockStore.transactions.unshift(transaction);
  agency.balance_usd = balanceAfter;
  agency.updated_at = new Date().toISOString();

  return { payment, transaction, newBalance: balanceAfter };
}

// ── Admin Manual Refund / Correction ──
export async function executeManualRefund(data: {
  agencyId: string;
  amountUsd: number;
  reason: string;
  adminId: string;
}): Promise<{ transaction: Transaction; newBalance: number }> {
  const agency = await getAgencyById(data.agencyId);
  if (!agency) throw new Error('Agency not found');

  const balanceBefore = agency.balance_usd;
  const balanceAfter = Math.max(0, balanceBefore - data.amountUsd);

  const tx: Transaction = {
    id: `tx-${Date.now()}`,
    agency_id: data.agencyId,
    candidate_id: null,
    payment_id: null,
    type: 'REFUND',
    amount_usd: -data.amountUsd,
    balance_before: balanceBefore,
    balance_after: balanceAfter,
    description: `Régularisation / Remboursement administratif : ${data.reason}`,
    created_at: new Date().toISOString(),
    created_by: `ADMIN (${data.adminId})`,
  };

  // Log in audit
  mockStore.auditLogs.unshift({
    id: `audit-${Date.now()}`,
    actor_id: data.adminId,
    actor_role: 'ADMIN',
    action: 'MANUAL_REFUND',
    target_type: 'AGENCY',
    target_id: data.agencyId as any,
    details: { amount: data.amountUsd, reason: data.reason, balance_before: balanceBefore, balance_after: balanceAfter },
    ip_address: null,
    created_at: new Date().toISOString(),
  });

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    await supabase.from('transactions').insert(tx);
    await supabase.from('agencies').update({ balance_usd: balanceAfter }).eq('id', data.agencyId);
    return { transaction: tx, newBalance: balanceAfter };
  }

  mockStore.transactions.unshift(tx);
  agency.balance_usd = balanceAfter;
  agency.updated_at = new Date().toISOString();

  return { transaction: tx, newBalance: balanceAfter };
}

// ── Contracts ──
export async function getContractsForAgency(agencyId: string): Promise<Contract[]> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data } = await supabase.from('contracts').select('*').eq('agency_id', agencyId).order('created_at', { ascending: false });
    return data || [];
  }
  return mockStore.contracts.filter((c) => c.agency_id === agencyId);
}

export async function signElectronicContract(data: {
  contractId: string;
  signerName: string;
  signerEmail: string;
  signerIp: string;
  signerUserAgent: string;
}): Promise<Contract> {
  const signedAt = new Date().toISOString();

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data: updated, error } = await supabase
      .from('contracts')
      .update({
        status: 'SIGNED',
        signed_at: signedAt,
        signer_name: data.signerName,
        signer_email: data.signerEmail,
        signer_ip: data.signerIp,
        signer_user_agent: data.signerUserAgent,
        signature_data: {
          timestamp: signedAt,
          ip: data.signerIp,
          method: 'ELECTRONIC_AGREEMENT_PORTAL',
          verified: true,
        },
      })
      .eq('id', data.contractId)
      .select()
      .single();
    if (error) throw error;
    return updated;
  }

  const contract = mockStore.contracts.find((c) => c.id === data.contractId);
  if (!contract) throw new Error('Contract not found');

  contract.status = 'SIGNED';
  contract.signed_at = signedAt;
  contract.signer_name = data.signerName;
  contract.signer_email = data.signerEmail;
  contract.signer_ip = data.signerIp;
  contract.signer_user_agent = data.signerUserAgent;
  contract.signature_data = {
    timestamp: signedAt,
    ip: data.signerIp,
    method: 'ELECTRONIC_AGREEMENT_PORTAL',
    verified: true,
  };

  return contract;
}

// ── Global Config & Pricing ──
export async function getCandidatePrice(): Promise<number> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data } = await supabase.from('platform_config').select('value').eq('key', 'candidate_price_usd').single();
    if (data?.value) return Number(data.value);
  }
  return (mockStore.config.candidate_price_usd as number) || 10.0;
}

export async function updateCandidatePrice(newPrice: number): Promise<void> {
  mockStore.config.candidate_price_usd = newPrice;
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    await supabase
      .from('platform_config')
      .upsert({ key: 'candidate_price_usd', value: newPrice, updated_at: new Date().toISOString(), updated_by: 'ADMIN' });
  }
}
