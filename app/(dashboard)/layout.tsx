import jwt from "jsonwebtoken";

import { Aside } from "@/components/dashboard/aside";
import { IChildren } from "@/types/children";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Verifica se tem token
const protectRoute = async () => {
  const cookieStore = cookies();
  const auth = cookieStore.get("thimas-academia-auth")?.value;

  if (!auth) return null;

  return jwt.decode(auth);
};

export default async function Layout({ children }: IChildren) {
  const token = await protectRoute();

  if (!token) return redirect("/login");

  return (
    <div className="w-full h-screen flex">
      <Aside />

      <main id="main" className="w-full h-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
