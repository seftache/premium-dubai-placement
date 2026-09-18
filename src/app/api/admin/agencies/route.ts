import { NextRequest, NextResponse } from 'next/server';
import { getAllAgencies, createAgency, updateAgency } from '@/lib/db';

export async function GET() {
  try {
    const agencies = await getAllAgencies();
    return NextResponse.json({ agencies });
  } catch (error: unknown) {
    console.error('Error fetching agencies:', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const agency = await createAgency(body);
    return NextResponse.json({ success: true, agency });
  } catch (error: unknown) {
    console.error('Error creating agency:', error);
    return NextResponse.json({ error: 'Impossible de créer l’agence.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: 'ID requis.' }, { status: 400 });

    const updated = await updateAgency(id, updates);
    return NextResponse.json({ success: true, agency: updated });
  } catch (error: unknown) {
    console.error('Error updating agency:', error);
    return NextResponse.json({ error: 'Impossible de modifier l’agence.' }, { status: 500 });
  }
}
