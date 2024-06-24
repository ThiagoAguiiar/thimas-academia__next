import { supabaseComponent } from "@/lib/supabase";
import { IGetUser, IPostUser } from "@/types/user";
import { PostgrestError } from "@supabase/supabase-js";

export async function getUsers(
  name: string,
  isActive: boolean = true,
  isAdmin: boolean = false
): Promise<{
  data: IGetUser[] | null;
  error: PostgrestError | null;
  status: number;
}> {
  if (name.trim().length > 0) {
    const response = await supabaseComponent
      .from("user")
      .select("*")
      .ilike("name", `%${name}%`)
      .eq("isActive", isActive);

    return {
      data: response.data,
      error: response.error,
      status: response.status,
    };
  }

  const response = await supabaseComponent
    .from("user")
    .select("*")
    .eq("isAdmin", isAdmin)
    .eq("isActive", isActive);

  return {
    data: response.data,
    error: response.error,
    status: response.status,
  };
}

export async function createUser(user: IPostUser) {
  const response = await supabaseComponent.from("user").insert([user]);

  return {
    data: response.data,
    error: response.error,
    status: response.status,
  };
}

export async function getUserByEmail(email: string) {
  const response = await supabaseComponent
    .from("user")
    .select("*")
    .eq("email", email);

  return {
    data: response.data,
    error: response.error,
    status: response.status,
  };
}
