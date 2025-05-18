
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://erwyocngnsqigdbemltn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyd3lvY25nbnNxaWdkYmVtbHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MjE5NzQsImV4cCI6MjA1OTA5Nzk3NH0.sAXhq_gFMymlfxzIuPCAxl-eR9-cwlr9kYe_uMqaN_U';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;