import { IChildren } from "@/types/children";

import React from "react";

export default async function Layout({ children }: IChildren) {
  return <React.Fragment>{children}</React.Fragment>;
}
