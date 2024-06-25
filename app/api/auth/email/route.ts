import { supabaseRouteHandler } from "@/lib/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "../../user/methods";

import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (
      !email ||
      email.trim().length === 0 ||
      !password ||
      password.trim().length === 0
    ) {
      return NextResponse.json(
        { message: "Email e/ou senha inválidos" },
        { status: 400 }
      );
    }

    const supabase = supabaseRouteHandler(cookies);
    const { data, error } = await getUserByEmail(email);

    if (error || !data || data.length === 0) {
      return NextResponse.json(
        { message: "Email e/ou senha inválidos" },
        { status: 400 }
      );
    }

    const user = data[0];

    if (user.isActive) {
      const token = jwt.sign(
        { email: user.email, isAdmin: user.isAdmin },
        process.env.NEXT_PUBLIC_JWT_SECRET!
      );

      cookies().set("thimas-academia-auth", token);

      return NextResponse.json(
        {
          message: "Usuário autenticado",
          path: user.isAdmin ? "/admin" : "/aluno",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Email e/ou senha inválidos" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Erro no servidor" }, { status: 500 });
  }
}
