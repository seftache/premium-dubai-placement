import { NextRequest, NextResponse } from 'next/server';
import { getAgencyById, getTransactionsForAgency } from '@/lib/db';

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

    const transactions = await getTransactionsForAgency(agencyId);

    return NextResponse.json({
      balance_usd: agency.balance_usd,
      company_name: agency.company_name,
      transactions,
    });
  } catch (error: unknown) {
    console.error('Error fetching balance:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du solde.' },
      { status: 500 }
    );
  }
}
