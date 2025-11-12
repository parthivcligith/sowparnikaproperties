-- SQL Migration: Add Land Area columns to properties table
-- Run this in your Supabase SQL Editor

-- Add land_area column (nullable, for House and Villa properties)
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS land_area DECIMAL(10, 2);

-- Add land_area_unit column with default value 'Cent'
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS land_area_unit VARCHAR(20) DEFAULT 'Cent';

-- Optional: Add a comment to document the columns
COMMENT ON COLUMN public.properties.land_area IS 'Land/Plot area for House and Villa properties';
COMMENT ON COLUMN public.properties.land_area_unit IS 'Unit for land area (Cent, Acres, Sq. Ft., etc.)';

