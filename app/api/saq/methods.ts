import { supabaseComponent } from "@/lib/supabase";
import { IPostFormData } from "@/types/footer";

export async function addSaq(data: IPostFormData) {
  const response = await supabaseComponent.from("saq").insert(data);
  return { ...response };
}

export async function getSaqs() {
  const response = await supabaseComponent.from("saq").select("*");
  return { ...response };
}
