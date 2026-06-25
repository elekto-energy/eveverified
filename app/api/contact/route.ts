import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = 'EVE Verified <noreply@eveverified.com>'
const TO = 'joakim@organiq.se'

const REQUIRED = ['name', 'email', 'message'] as const

const AUDIENCE_LABELS: Record<string, string> = {
  developer: 'Developer / AI builder',
  enterprise: 'Enterprise / GRC',
  partner: 'Partner / consultant',
  other: 'Other',
}

export async function POST(req: NextRequest) {
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  // Validate required fields
  for (const field of REQUIRED) {
    const val = body[field]?.trim()
    if (!val) {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 }
      )
    }
  }

  // Validate email format
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(body.email?.trim() ?? '')) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  // Truncate to prevent abuse
  const name = body.name.trim().slice(0, 120)
  const email = body.email.trim().slice(0, 160)
  const company = body.company?.trim().slice(0, 160) || '—'
  const message = body.message.trim().slice(0, 2000)
  const audienceLabel = AUDIENCE_LABELS[body.audience] ?? '—'

  const text = `EVE VERIFIED — Contact
${'─'.repeat(50)}

Name:        ${name}
Email:       ${email}
Company:     ${company}
Audience:    ${audienceLabel}

MESSAGE
${message}

${'─'.repeat(50)}
Submitted via eveverified.com/contact
`

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Contact — ${name}${company !== '—' ? ` (${company})` : ''}`,
      text,
    })
  } catch (err) {
    console.error('[contact/route] Resend error:', err)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or email joakim@organiq.se.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
