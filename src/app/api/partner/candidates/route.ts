import { NextRequest, NextResponse } from 'next/server';
import { getCandidatesForAgency, getCandidatePrice, getAgencyById } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const agencyId =
      req.headers.get('x-agency-id') ||
      searchParams.get('agencyId') ||
      'agency-demo-1';

    const agency = await getAgencyById(agencyId);
    if (!agency) {
      return NextResponse.json({ error: 'Agence introuvable.' }, { status: 404 });
    }

    const candidates = await getCandidatesForAgency(agencyId);
    const candidatePrice = await getCandidatePrice();

    return NextResponse.json({
      agency: {
        id: agency.id,
        company_name: agency.company_name,
        balance_usd: agency.balance_usd,
      },
      candidatePrice,
      candidates,
    });
  } catch (error: unknown) {
    console.error('Error fetching partner candidates:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des candidats.' },
      { status: 500 }
    );
  }
}
