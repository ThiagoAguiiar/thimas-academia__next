import { supabaseRouteHandler } from "@/lib/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail } from "../../user/methods";
import { IPostUser } from "@/types/user";

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = supabaseRouteHandler(cookies);
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Cadastrar o usuário no banco (via google auth)
  const session = (await supabaseRouteHandler(cookies).auth.getSession()).data
    .session;

  if (session) {
    const userDb = await getUserByEmail(session.user.user_metadata.email);

    cookies().set("sb-admin", "false", {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
    });

    if (userDb.data && userDb.data.length === 0) {
      const user: IPostUser = {
        isProvider: true,
        isActive: true,
        isAdmin: false,
        email: session.user.user_metadata.email,
        name: session.user.user_metadata.name,
        image: session.user.user_metadata.avatar_url,
        password: "",
      };

      const res = await createUser(user);

      if (res.error === null) {
        return NextResponse.redirect(`${requestUrl.origin}/aluno`);
      }
    }

    return NextResponse.redirect(`${requestUrl.origin}/aluno`);
  }

  return NextResponse.redirect(`${requestUrl.origin}`);
}
