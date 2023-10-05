import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qxqttcfaelniqjchzepi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4cXR0Y2ZhZWxuaXFqY2h6ZXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUzMDMxMDIsImV4cCI6MjAxMDg3OTEwMn0.tPBAKIRxb_F9Pm-nJJfANNy2zwebodPB2yALsH2L8Kw'
export const supabase = createClient(supabaseUrl, supabaseKey)