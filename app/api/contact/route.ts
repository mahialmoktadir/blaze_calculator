import { NextRequest, NextResponse } from 'next/server';
import { validateContactSubmission } from '@/lib/calculators';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const outcome = validateContactSubmission({
      name: body?.name,
      email: body?.email,
      subject: body?.subject,
      message: body?.message,
    });

    if (!outcome.ok) {
      return NextResponse.json(
        { error: outcome.error, fieldErrors: outcome.fieldErrors },
        { status: 400 }
      );
    }

    const referenceId = `BLZ-${Date.now().toString(36).toUpperCase().slice(-6)}`;

    return NextResponse.json(
      {
        data: {
          referenceId,
          receivedAt: new Date().toISOString(),
          name: outcome.data.name,
          subject: outcome.data.subject,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Unable to process your message. Please verify your inputs and try again.' },
      { status: 400 }
    );
  }
}
