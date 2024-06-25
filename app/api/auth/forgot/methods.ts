import { supabaseClient } from "@/lib/supabase";
import { IPostRecovery } from "@/types/recovery";

export async function createRecovery(data: IPostRecovery) {
  const response = await supabaseClient.from("recovery").insert(data);
  return { ...response };
}
