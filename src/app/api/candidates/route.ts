import { NextRequest, NextResponse } from 'next/server';
import { createCandidateSubmission } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, expertise, passport, motivation, offerId, agencyId, consent } = body;

    // Strict validation
    if (!fullName || !email || !phone || !expertise || !passport) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être renseignés.' },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: 'Le consentement pour la transmission des données aux partenaires est obligatoire.' },
        { status: 400 }
      );
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';

    const candidate = await createCandidateSubmission({
      fullName,
      email,
      phone,
      expertise,
      passportStatus: passport,
      motivation,
      offerId,
      agencyId,
      consentText:
        'En soumettant ce formulaire, le candidat accepte expressément que ses informations soient transmises aux agences et employeurs partenaires qualifiés pour étude de profil.',
      ipAddress: ip,
    });

    return NextResponse.json({
      success: true,
      ref_code: candidate.ref_code,
      message: 'Candidature enregistrée avec succès.',
    });
  } catch (error: unknown) {
    console.error('Error submitting candidate:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l’enregistrement de votre profil.' },
      { status: 500 }
    );
  }
}
