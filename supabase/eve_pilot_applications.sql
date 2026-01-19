-- EVE VERIFIED Pilot Applications Table
-- Run this in Supabase SQL Editor
-- Purpose: Select 3-5 serious pilots to help develop and stabilize EVE VERIFIED

-- Drop existing table if rebuilding
-- DROP TABLE IF EXISTS eve_pilot_applications;

-- Create the eve_pilot_applications table
CREATE TABLE IF NOT EXISTS eve_pilot_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Applicant info
    applicant_type TEXT NOT NULL CHECK (applicant_type IN ('company', 'individual')),
    organization_name TEXT,  -- Required if applicant_type = 'company'
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    country TEXT NOT NULL,
    
    -- Use case
    use_case_category TEXT NOT NULL CHECK (use_case_category IN (
        'compliance_governance',
        'ai_verification_audit', 
        'cyber_physical_systems',
        'energy_infrastructure',
        'research_experimental'
    )),
    use_case_description TEXT NOT NULL,  -- Max ~800 chars, enforced in frontend
    
    -- Contribution intent (THE KEY FIELD)
    contribution_intent TEXT NOT NULL,
    
    -- Optional
    technical_background TEXT,
    
    -- Status tracking
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'accepted', 'declined')),
    notes TEXT,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by TEXT
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_eve_pilot_status ON eve_pilot_applications(status);
CREATE INDEX IF NOT EXISTS idx_eve_pilot_email ON eve_pilot_applications(email);
CREATE INDEX IF NOT EXISTS idx_eve_pilot_category ON eve_pilot_applications(use_case_category);

-- Enable Row Level Security
ALTER TABLE eve_pilot_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (for the public form)
CREATE POLICY "Allow anonymous inserts" ON eve_pilot_applications
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Policy: Only authenticated users can view applications
CREATE POLICY "Allow authenticated users to view" ON eve_pilot_applications
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Only authenticated users can update
CREATE POLICY "Allow authenticated users to update" ON eve_pilot_applications
    FOR UPDATE
    TO authenticated
    USING (true);

-- Create a view for quick stats
CREATE OR REPLACE VIEW eve_pilot_stats AS
SELECT 
    COUNT(*) FILTER (WHERE status = 'pending') as pending,
    COUNT(*) FILTER (WHERE status = 'reviewing') as reviewing,
    COUNT(*) FILTER (WHERE status = 'accepted') as accepted,
    COUNT(*) FILTER (WHERE status = 'declined') as declined,
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE applicant_type = 'company') as companies,
    COUNT(*) FILTER (WHERE applicant_type = 'individual') as individuals
FROM eve_pilot_applications;

-- Sample queries:
-- SELECT * FROM eve_pilot_applications WHERE status = 'pending' ORDER BY created_at DESC;
-- SELECT * FROM eve_pilot_stats;
