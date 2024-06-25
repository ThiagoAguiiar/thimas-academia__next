import { supabaseComponent } from "@/lib/supabase";
import { IGetUser, IPostUser } from "@/types/user";
import { PostgrestError } from "@supabase/supabase-js";

export async function getUsers(
  name: string,
  isActive: boolean = true,
  isAdmin: boolean = false
) {
  if (name.trim().length > 0) {
    const response = await supabaseComponent
      .from("user")
      .select("*")
      .ilike("name", `%${name}%`)
      .eq("isActive", isActive);

    return { ...response };
  }

  const response = await supabaseComponent
    .from("user")
    .select("*")
    .eq("isAdmin", isAdmin)
    .eq("isActive", isActive);

  return { ...response };
}

export async function getUserByEmail(email: string) {
  const response = await supabaseComponent
    .from("user")
    .select("*")
    .eq("email", email);

  return { ...response };
}

export async function createUser(user: IPostUser) {
  const response = await supabaseComponent.from("user").insert([user]);

  return { ...response };
}

export async function updateUser(user: IGetUser) {
  if (user.password && user.password.length > 0) {
    const response = await supabaseComponent
      .from("user")
      .update({
        name: user.name,
        email: user.email,
        isActive: user.isActive,
        isAdmin: user.isAdmin,
        isProvider: user.isProvider,
        password: user.password,
        image: user.image,
      })
      .eq("userId", user.userId);

    return { ...response };
  }

  const response = await supabaseComponent
    .from("user")
    .update({
      name: user.name,
      email: user.email,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
      isProvider: user.isProvider,
      image: user.image,
    })
    .eq("userId", user.userId);

  return { ...response };
}
