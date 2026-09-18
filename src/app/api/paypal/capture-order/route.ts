import { NextRequest, NextResponse } from 'next/server';
import { capturePayPalOrder } from '@/lib/paypal';
import { recordPayPalPaymentSuccess, getAgencyById } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, agencyId, amountUsd } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID requis.' }, { status: 400 });
    }

    const targetAgencyId = agencyId || req.headers.get('x-agency-id') || 'agency-demo-1';
    const agency = await getAgencyById(targetAgencyId);
    if (!agency) {
      return NextResponse.json({ error: 'Agence introuvable.' }, { status: 404 });
    }

    // Capture payment on PayPal server
    const capture = await capturePayPalOrder(orderId);

    if (!capture.success) {
      return NextResponse.json(
        { error: 'Le paiement n’a pas pu être validé par PayPal.' },
        { status: 400 }
      );
    }

    const effectiveAmount = capture.amountUsd > 0 ? capture.amountUsd : (parseFloat(amountUsd) || 50.0);

    // Record payment with strict idempotency and credit agency balance
    const result = await recordPayPalPaymentSuccess({
      agencyId: targetAgencyId,
      paypalOrderId: orderId,
      amountUsd: effectiveAmount,
      event: 'CHECKOUT.ORDER.CAPTURED',
    });

    return NextResponse.json({
      success: true,
      newBalance: result.newBalance,
      amountCredited: effectiveAmount,
      message: `Votre solde a été rechargé de $${effectiveAmount.toFixed(2)} USD avec succès.`,
    });
  } catch (error: unknown) {
    console.error('Error in capture-order:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la capture du paiement.' },
      { status: 500 }
    );
  }
}
