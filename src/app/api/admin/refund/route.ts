import { NextRequest, NextResponse } from 'next/server';
import { executeManualRefund } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agencyId, amountUsd, reason, adminId } = body;

    if (!agencyId || !amountUsd || !reason) {
      return NextResponse.json(
        { error: 'Agence, montant et motif sont obligatoires pour un remboursement.' },
        { status: 400 }
      );
    }

    const result = await executeManualRefund({
      agencyId,
      amountUsd: parseFloat(amountUsd),
      reason,
      adminId: adminId || 'admin-root',
    });

    return NextResponse.json({
      success: true,
      result,
      message: `Régularisation effectuée : $${parseFloat(amountUsd).toFixed(2)} remboursés. Nouveau solde : $${result.newBalance.toFixed(2)}.`,
    });
  } catch (error: unknown) {
    console.error('Error in manual refund:', error);
    return NextResponse.json(
      { error: 'Erreur lors du remboursement.' },
      { status: 500 }
    );
  }
}
