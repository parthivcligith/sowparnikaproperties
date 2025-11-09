import { createServerSupabaseClient, PROPERTY_SELECT_COLUMNS } from '@/lib/supabase-server';

export const getProperty = async (id: string | string[]) => {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('Database not configured');
    }

    // Use server-side Supabase client
    const supabase = createServerSupabaseClient();

    // Fetch property from Supabase by ID - only select required columns
    const { data, error } = await supabase
      .from('properties')
      .select(PROPERTY_SELECT_COLUMNS)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      if (error.code === 'PGRST116') {
        throw new Error('Property not found');
      }
      throw error;
    }

    if (!data) {
      throw new Error('Property not found');
    }

    return data;
  } catch (error) {
    console.error('Error fetching property:', error);
    throw error;
  }
};
