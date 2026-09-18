import { NextRequest, NextResponse } from 'next/server';
import { signElectronicContract } from '@/lib/db';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: contractId } = await params;
    const body = await req.json();
    const { signerName, signerEmail } = body;

    if (!signerName || !signerEmail) {
      return NextResponse.json(
        { error: 'Le nom du signataire et son adresse email sont obligatoires.' },
        { status: 400 }
      );
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Browser';

    const signedContract = await signElectronicContract({
      contractId,
      signerName,
      signerEmail,
      signerIp: ip,
      signerUserAgent: userAgent,
    });

    return NextResponse.json({
      success: true,
      contract: signedContract,
      message: 'Contrat partenaire signé avec succès et scellé.',
    });
  } catch (error: unknown) {
    console.error('Error signing contract:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la signature électronique.' },
      { status: 500 }
    );
  }
}
