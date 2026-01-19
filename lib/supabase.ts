import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for EVE Pilot Applications
export type ApplicantType = 'company' | 'individual'

export type UseCaseCategory = 
  | 'compliance_governance'
  | 'ai_verification_audit'
  | 'cyber_physical_systems'
  | 'energy_infrastructure'
  | 'research_experimental'

export type ApplicationStatus = 'pending' | 'reviewing' | 'accepted' | 'declined'

export interface EvePilotApplication {
  id?: string
  created_at?: string
  applicant_type: ApplicantType
  organization_name?: string | null
  contact_name: string
  email: string
  country: string
  use_case_category: UseCaseCategory
  use_case_description: string
  contribution_intent: string
  technical_background?: string | null
  status?: ApplicationStatus
  notes?: string | null
  reviewed_at?: string | null
  reviewed_by?: string | null
}

// Insert a pilot application
export async function submitPilotApplication(data: Omit<EvePilotApplication, 'id' | 'created_at' | 'status' | 'notes' | 'reviewed_at' | 'reviewed_by'>) {
  const { data: result, error } = await supabase
    .from('eve_pilot_applications')
    .insert([data])
    .select()
    .single()

  if (error) {
    console.error('Supabase error:', error)
    throw new Error(error.message)
  }

  return result
}
