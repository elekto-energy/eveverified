-- EVE Verified Pilot Applications Table
-- Run this in Supabase SQL Editor

-- Create the pilot_applications table
CREATE TABLE IF NOT EXISTS pilot_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Application data
    company TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    use_case TEXT NOT NULL,
    message TEXT,
    
    -- Status tracking
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'accepted', 'declined')),
    notes TEXT,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by TEXT
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_pilot_applications_status ON pilot_applications(status);
CREATE INDEX IF NOT EXISTS idx_pilot_applications_email ON pilot_applications(email);

-- Enable Row Level Security
ALTER TABLE pilot_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (for the public form)
CREATE POLICY "Allow anonymous inserts" ON pilot_applications
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Policy: Only authenticated users can view applications
CREATE POLICY "Allow authenticated users to view" ON pilot_applications
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Only authenticated users can update
CREATE POLICY "Allow authenticated users to update" ON pilot_applications
    FOR UPDATE
    TO authenticated
    USING (true);

-- Create a view for quick stats
CREATE OR REPLACE VIEW pilot_stats AS
SELECT 
    COUNT(*) FILTER (WHERE status = 'pending') as pending,
    COUNT(*) FILTER (WHERE status = 'reviewing') as reviewing,
    COUNT(*) FILTER (WHERE status = 'accepted') as accepted,
    COUNT(*) FILTER (WHERE status = 'declined') as declined,
    COUNT(*) as total
FROM pilot_applications;

-- Sample query to get all pending applications
-- SELECT * FROM pilot_applications WHERE status = 'pending' ORDER BY created_at DESC;
