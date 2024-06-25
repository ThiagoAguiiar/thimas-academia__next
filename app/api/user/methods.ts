import { hashPassword } from "@/lib/password";
import { supabaseComponent } from "@/lib/supabase";
import { IGetUser, IPostUser } from "@/types/user";
import { PostgrestError } from "@supabase/supabase-js";

interface IUserResponse {
  data: IGetUser[] | null;
  error: PostgrestError | null;
  status: number;
}

export async function getUsers(
  name: string,
  isActive: boolean = true,
  isAdmin: boolean = false
): Promise<IUserResponse> {
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

export async function getUserByEmail(email: string): Promise<IUserResponse> {
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

export async function createUser(user: IPostUser): Promise<IUserResponse> {
  const response = await supabaseComponent.from("user").insert([user]);

  return {
    data: response.data,
    error: response.error,
    status: response.status,
  };
}

export async function updateUser(user: IGetUser): Promise<IUserResponse> {
  if (user.password !== null) {
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

    return {
      data: response.data,
      error: response.error,
      status: response.status,
    };
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

  return {
    data: response.data,
    error: response.error,
    status: response.status,
  };
}
