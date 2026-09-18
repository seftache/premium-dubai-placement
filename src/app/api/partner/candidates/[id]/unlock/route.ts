import { NextRequest, NextResponse } from 'next/server';
import { unlockCandidateForAgency, getCandidatePrice, getCandidatesForAgency, getAgencyById } from '@/lib/db';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: candidateId } = await params;
    const body = await req.json().catch(() => ({}));
    
    // In demo / current phase, agencyId can be provided in header or body or defaults to primary demo agency
    const agencyId =
      req.headers.get('x-agency-id') ||
      body.agencyId ||
      'agency-demo-1';

    const agency = await getAgencyById(agencyId);
    if (!agency) {
      return NextResponse.json({ error: 'Agence introuvable.' }, { status: 404 });
    }

    const price = await getCandidatePrice();

    const result = await unlockCandidateForAgency(agencyId, candidateId, price);

    if (!result.success) {
      if (result.error === 'INSUFFICIENT_BALANCE') {
        return NextResponse.json(
          {
            error: 'Solde partenaire insuffisant. Veuillez recharger votre solde via PayPal.',
            code: 'INSUFFICIENT_BALANCE',
            price,
            currentBalance: agency.balance_usd,
          },
          { status: 400 }
        );
      }
      if (result.error === 'ALREADY_UNLOCKED') {
        return NextResponse.json(
          { error: 'Ce candidat a déjà été débloqué par votre agence.' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: result.error || 'Impossible de débloquer ce candidat.' },
        { status: 400 }
      );
    }

    // Return the updated candidate list
    const candidates = await getCandidatesForAgency(agencyId);
    const unlockedCandidate = candidates.find((c) => c.id === candidateId);

    return NextResponse.json({
      success: true,
      result,
      candidate: unlockedCandidate,
      message: `Candidat #${unlockedCandidate?.ref_code} débloqué avec succès. ${price} USD ont été déduits de votre solde.`,
    });
  } catch (error: unknown) {
    console.error('Error unlocking candidate:', error);
    return NextResponse.json(
      { error: 'Erreur lors du déblocage du candidat.' },
      { status: 500 }
    );
  }
}
