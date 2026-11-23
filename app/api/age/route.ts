import { NextRequest, NextResponse } from 'next/server';
import { calculateAge } from '@/lib/calculators';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const outcome = calculateAge(body?.birthDate);

    if (!outcome.ok) {
      return NextResponse.json(
        { error: outcome.error, fieldErrors: outcome.fieldErrors },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: outcome.data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request payload. Please provide a valid date of birth.' },
      { status: 400 }
    );
  }
}
