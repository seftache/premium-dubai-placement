import { NextRequest, NextResponse } from 'next/server';
import { createPayPalOrder } from '@/lib/paypal';
import { getAgencyById } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amountUsd, agencyId } = body;

    const targetAgencyId = agencyId || req.headers.get('x-agency-id') || 'agency-demo-1';

    const agency = await getAgencyById(targetAgencyId);
    if (!agency) {
      return NextResponse.json({ error: 'Agence introuvable.' }, { status: 404 });
    }

    const parsedAmount = parseFloat(amountUsd);
    if (!parsedAmount || parsedAmount < 10) {
      return NextResponse.json(
        { error: 'Le montant minimum de recharge est de 10 USD.' },
        { status: 400 }
      );
    }

    const order = await createPayPalOrder(parsedAmount, targetAgencyId);

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      approveUrl: order.approveUrl,
    });
  } catch (error: unknown) {
    console.error('Error in create-order:', error);
    return NextResponse.json(
      { error: 'Impossible d’initialiser le paiement PayPal.' },
      { status: 500 }
    );
  }
}
