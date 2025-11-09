-- Migration: Add floors column to properties table
-- This column stores the number of floors for Commercial Building properties

-- Add floors column (nullable integer)
ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS floors INTEGER;

-- Add a comment to describe the column
COMMENT ON COLUMN public.properties.floors IS 'Number of floors (for Commercial Building properties only)';

-- Create an index on floors for better query performance (optional)
CREATE INDEX IF NOT EXISTS idx_properties_floors ON public.properties(floors);

