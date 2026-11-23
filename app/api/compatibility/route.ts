import { NextRequest, NextResponse } from 'next/server';
import { calculateCompatibility } from '@/lib/calculators';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const outcome = calculateCompatibility({
      person1Name: body?.person1Name,
      person1BirthDate: body?.person1BirthDate,
      person2Name: body?.person2Name,
      person2BirthDate: body?.person2BirthDate,
    });

    if (!outcome.ok) {
      return NextResponse.json(
        { error: outcome.error, fieldErrors: outcome.fieldErrors },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: outcome.data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request payload. Please provide both names and birth dates.' },
      { status: 400 }
    );
  }
}
