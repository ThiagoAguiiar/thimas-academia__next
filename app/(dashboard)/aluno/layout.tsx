"use client";

import { useCookies } from "next-client-cookies";
import jwt from "jsonwebtoken";
import React from "react";
import { redirect } from "next/navigation";
import { IGetToken } from "@/types/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookie = useCookies();

  const token = cookie.get("thimas-academia-auth");
  const decode = jwt.decode(token!);

  if ((decode as IGetToken).isAdmin) redirect("/admin");

  return <React.Fragment>{children}</React.Fragment>;
}
