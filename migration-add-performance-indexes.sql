-- Performance Optimization: Add indexes for faster queries
-- Run this in your Supabase SQL Editor
-- 
-- ✅ SAFETY: This migration is NON-DESTRUCTIVE and safe to run multiple times
-- ✅ All statements use IF NOT EXISTS - no data will be modified or deleted
-- ✅ Only creates new indexes - does not drop or alter existing indexes
--
-- If Supabase shows a warning about "destructive operation", it's a false positive.
-- You can safely proceed - this migration only creates indexes and cannot cause data loss.

-- Index on price for filtering and sorting
-- Essential for price range filters and sorting by price
CREATE INDEX IF NOT EXISTS idx_properties_price ON public.properties(price);

-- Composite index for common filter combinations
-- Optimizes queries that filter by status AND city (very common pattern)
CREATE INDEX IF NOT EXISTS idx_properties_status_city ON public.properties(status, city);

-- Composite index for status and featured (with partial index for active only)
-- Optimizes queries for featured properties when status = 'active'
CREATE INDEX IF NOT EXISTS idx_properties_status_featured ON public.properties(status, featured) WHERE status = 'active';

-- Composite index for property type and city
-- Optimizes queries that filter by property type AND city
CREATE INDEX IF NOT EXISTS idx_properties_type_city ON public.properties(property_type, city);

-- Partial index for active properties sorted by created_at (MOST IMPORTANT)
-- This is the MOST IMPORTANT index for performance
-- Optimizes: WHERE status = 'active' ORDER BY created_at DESC
-- Note: idx_properties_created_at already exists in database-schema.sql
-- This partial index is more efficient for the most common query pattern
CREATE INDEX IF NOT EXISTS idx_properties_active_created_at ON public.properties(created_at DESC) WHERE status = 'active';

-- Partial index for featured active properties
-- Optimizes homepage queries: WHERE featured = true AND status = 'active' ORDER BY created_at DESC
CREATE INDEX IF NOT EXISTS idx_properties_featured_active ON public.properties(featured, created_at DESC) WHERE featured = true AND status = 'active';
