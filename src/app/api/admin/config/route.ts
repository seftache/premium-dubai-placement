import { NextRequest, NextResponse } from 'next/server';
import { getCandidatePrice, updateCandidatePrice } from '@/lib/db';

export async function GET() {
  try {
    const price = await getCandidatePrice();
    return NextResponse.json({ candidate_price_usd: price });
  } catch (error: unknown) {
    console.error('Error fetching config:', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { priceUsd } = body;
    const parsed = parseFloat(priceUsd);

    if (!parsed || parsed <= 0) {
      return NextResponse.json(
        { error: 'Prix invalide.' },
        { status: 400 }
      );
    }

    await updateCandidatePrice(parsed);
    return NextResponse.json({ success: true, candidate_price_usd: parsed });
  } catch (error: unknown) {
    console.error('Error updating config:', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
