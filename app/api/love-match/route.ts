import { NextRequest, NextResponse } from 'next/server';
import { calculateLoveMatch } from '@/lib/calculators';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const outcome = calculateLoveMatch(
      body?.person1Name,
      body?.person2Name,
      body?.person1Gender,
      body?.person2Gender
    );

    if (!outcome.ok) {
      return NextResponse.json(
        { error: outcome.error, fieldErrors: outcome.fieldErrors },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: outcome.data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request payload. Please enter both names to calculate.' },
      { status: 400 }
    );
  }
}
