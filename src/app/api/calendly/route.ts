import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body || !body.event || !body.payload) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const invitee = body.payload?.invitee;
  const event = body.payload?.event;

  const fullName = invitee?.name;
  const email = invitee?.email;
  const startTime = event?.start_time;
  const endTime = event?.end_time;
  const answers = invitee?.questions_and_answers;

  console.log('[Calendly] Nova consulta marcada:', {
    fullName,
    email,
    startTime,
    endTime,
    answers,
  });

  return NextResponse.json({ received: true });
}
