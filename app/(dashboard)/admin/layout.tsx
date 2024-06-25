import { IGetToken } from "@/types/auth";
import { IChildren } from "@/types/children";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import React from "react";

const protectRoute = async () => {
  const auth = cookies().get("thimas-academia-auth")?.value;
  const token = jwt.decode(auth!);

  return token as IGetToken;
};

export default async function Layout({ children }: IChildren) {
  const token = await protectRoute();

  if (!token.isAdmin) return redirect("/login");

  return <React.Fragment>{children}</React.Fragment>;
}
