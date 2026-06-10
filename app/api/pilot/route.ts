import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = 'EVE Verified <noreply@eveverified.com>'
const TO = 'joakim@organiq.se'

// Required fields and their labels
const REQUIRED = [
  'applicant_type',
  'contact_name',
  'email',
  'country',
  'use_case_category',
  'use_case_description',
  'contribution_intent',
] as const

const CATEGORY_LABELS: Record<string, string> = {
  compliance_governance: 'Compliance & Governance',
  ai_verification_audit: 'AI Verification / Audit',
  cyber_physical_systems: 'Cyber-Physical Systems',
  energy_infrastructure: 'Energy / Infrastructure',
  research_experimental: 'Research / Experimental',
}

export async function POST(req: NextRequest) {
  // Parse JSON body
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

  // Validate enum values
  const validTypes = ['company', 'individual']
  if (!validTypes.includes(body.applicant_type)) {
    return NextResponse.json({ error: 'Invalid applicant type.' }, { status: 400 })
  }

  const validCategories = Object.keys(CATEGORY_LABELS)
  if (!validCategories.includes(body.use_case_category)) {
    return NextResponse.json({ error: 'Invalid use case category.' }, { status: 400 })
  }

  // If company, organization_name is required
  if (body.applicant_type === 'company' && !body.organization_name?.trim()) {
    return NextResponse.json(
      { error: 'Organization name is required for company applicants.' },
      { status: 400 }
    )
  }

  // Truncate long fields to prevent abuse
  const desc = body.use_case_description.trim().slice(0, 1000)
  const intent = body.contribution_intent.trim().slice(0, 1000)
  const background = body.technical_background?.trim().slice(0, 500) || '—'

  const categoryLabel = CATEGORY_LABELS[body.use_case_category] ?? body.use_case_category
  const orgLine = body.applicant_type === 'company'
    ? `\nOrganization:        ${body.organization_name?.trim()}`
    : ''

  const text = `EVE VERIFIED — Pilot Application
${'─'.repeat(50)}

Applicant type:      ${body.applicant_type}${orgLine}
Contact name:        ${body.contact_name.trim()}
Email:               ${body.email.trim()}
Country:             ${body.country.trim()}
Use case category:   ${categoryLabel}

USE CASE DESCRIPTION
${desc}

CONTRIBUTION INTENT
${intent}

TECHNICAL BACKGROUND
${background}

${'─'.repeat(50)}
Submitted via eveverified.com/pilot
`

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `Pilot application — ${body.contact_name.trim()}${body.organization_name ? ` (${body.organization_name.trim()})` : ''}`,
      text,
    })
  } catch (err) {
    // Log server-side only, never expose internals to client
    console.error('[pilot/route] Resend error:', err)
    return NextResponse.json(
      { error: 'Failed to send application. Please try again or contact joakim@organiq.se.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
