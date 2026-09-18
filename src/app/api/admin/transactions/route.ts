import { NextResponse } from 'next/server';
import { getAllTransactionsAdmin } from '@/lib/db';

export async function GET() {
  try {
    const transactions = await getAllTransactionsAdmin();
    return NextResponse.json({ transactions });
  } catch (error: unknown) {
    console.error('Error fetching admin transactions:', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
