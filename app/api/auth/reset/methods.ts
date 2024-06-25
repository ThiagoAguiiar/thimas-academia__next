import { supabaseClient } from "@/lib/supabase";
import { IPostRecovery } from "@/types/recovery";

export async function getRecoveryByCode(code: string) {
  const response = await supabaseClient
    .from("recovery")
    .select("*")
    .eq("code", code);
    
  return { ...response };
}
