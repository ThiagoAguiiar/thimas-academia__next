import { IChildren } from "@/types/children";
import React from "react";

export default function Layout({ children }: IChildren) {
  return <React.Fragment>{children}</React.Fragment>;
}
