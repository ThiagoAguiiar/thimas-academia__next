import { supabaseComponent } from "@/lib/supabase";
import { IPostFormData, IPutFormData } from "@/types/footer";

export async function addSaq(data: IPostFormData) {
  const response = await supabaseComponent.from("saq").insert(data);
  return { ...response };
}

export async function getSaqs() {
  const response = await supabaseComponent
    .from("saq")
    .select("*")
    .eq("isActive", true);
  return { ...response };
}

export async function updateSaq(saq: IPutFormData) {
  const response = await supabaseComponent
    .from("saq")
    .update(saq)
    .eq("saqId", saq.saqId);

  return { ...response };
}
