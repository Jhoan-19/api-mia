
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gtgadotzksgsvojblxzs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0Z2Fkb3R6a3Nnc3ZvamJseHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNTc0NjcsImV4cCI6MjA2MzkzMzQ2N30.XEKTTL2Kx0Xd0dNHgwtin5WR6c9oOXpLrzIh7_CgVTA';

export const supabase = createClient(supabaseUrl, supabaseKey);