import { Aside } from "@/components/dashboard/aside";
import { IChildren } from "@/types/children";

export default function Layout({ children }: IChildren) {
  return (
    <div className="w-full h-screen flex">
      <Aside />

      <main id="main" className="w-full h-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
