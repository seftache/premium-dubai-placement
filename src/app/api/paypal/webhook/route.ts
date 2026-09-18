import { NextRequest, NextResponse } from 'next/server';
import { verifyPayPalWebhookSignature } from '@/lib/paypal';
import { recordPayPalPaymentSuccess } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const headers = req.headers;

    // Verify webhook signature authenticity
    const isValid = await verifyPayPalWebhookSignature(headers, rawBody);
    if (!isValid) {
      console.warn('Invalid PayPal webhook signature rejected.');
      return NextResponse.json({ error: 'Signature invalide.' }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event_type;

    // We listen to PAYMENT.CAPTURE.COMPLETED or CHECKOUT.ORDER.APPROVED
    if (eventType === 'PAYMENT.CAPTURE.COMPLETED' || eventType === 'CHECKOUT.ORDER.APPROVED') {
      const resource = event.resource;
      const orderId = resource.id || resource.supplementary_data?.related_ids?.order_id;
      const amountValue = parseFloat(resource.amount?.value || '0');
      const agencyId = resource.custom_id || resource.purchase_units?.[0]?.reference_id;

      if (orderId && agencyId && amountValue > 0) {
        await recordPayPalPaymentSuccess({
          agencyId,
          paypalOrderId: orderId,
          amountUsd: amountValue,
          webhookId: event.id,
          event: eventType,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    console.error('PayPal webhook error:', error);
    return NextResponse.json({ error: 'Erreur webhook.' }, { status: 500 });
  }
}
