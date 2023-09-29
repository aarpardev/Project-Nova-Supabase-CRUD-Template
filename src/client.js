import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://blablabla.supabase.co'
const supabaseKey = 'randomlettersnnum8ers'
export const supabase = createClient(supabaseUrl, supabaseKey)