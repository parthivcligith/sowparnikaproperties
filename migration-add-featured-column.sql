-- Migration: Add featured column to properties table
-- Run this in your Supabase SQL Editor

ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_properties_featured ON public.properties(featured);

