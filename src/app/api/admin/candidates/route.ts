import { NextResponse } from 'next/server';
import { getAllCandidatesAdmin } from '@/lib/db';

export async function GET() {
  try {
    const candidates = await getAllCandidatesAdmin();
    return NextResponse.json({ candidates });
  } catch (error: unknown) {
    console.error('Error fetching admin candidates:', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
