"use client";

import Link from "next/link";
import React from "react";
import useMediaQuery from "@/hooks/useMedia";

import { Logo } from "./logo";
import { useSlideOverContext } from "@/contexts/slideOverContext";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { SlideOver } from "../dashboard/slide-over";

export function Navbar() {
  const { setSlideOver } = useSlideOverContext();
  const { isMatch } = useMediaQuery(725, "max");

  const path = usePathname();
  const { push } = useRouter();

  React.useEffect(() => {
    !isMatch && setSlideOver("edit", false);
  }, [isMatch]);

  const handleClick = () => setSlideOver("edit", false);

  if (!path.startsWith("/admin") && !path.startsWith("/aluno"))
    return (
      <React.Fragment>
        <header className={`h-[70px] flex items-center`}>
          <nav className="w-[90%] mx-auto flex items-center justify-between text-[14px]">
            <Logo />

            {!path.startsWith("/admin") && !path.startsWith("/aluno") && (
              <ul className="flex items-center gap-x-3 max-[725px]:hidden">
                <li>
                  <Link
                    href="/#planos"
                    className="font-semibold text-[#ff4500]"
                  >
                    Matricule-se
                  </Link>
                </li>

                <li>
                  <Link href="/#modalidades">Modalidades</Link>
                </li>

                <li>
                  <Link href="/#planos">Planos</Link>
                </li>

                <li>
                  <Link href="/#unidades">Unidades</Link>
                </li>

                <li>
                  <Link href="/#contato">Contato</Link>
                </li>
              </ul>
            )}

            {!path.startsWith("/admin") && !path.startsWith("/aluno") && (
              <div className="max-[725px]:hidden">
                <Button
                  className="bg-[#ff1e00] hover:bg-[#d71900] rounded-full gap-x-2"
                  onClick={() => {
                    push("/login");
                    setSlideOver("edit", false);
                  }}
                >
                  <UserCircle size={22} />
                  <span className="text-[14px]">Área do aluno</span>
                </Button>
              </div>
            )}

            <div
              className="w-[30px] h-[30px] items-center justify-center cursor-pointer hidden max-[725px]:flex"
              onClick={() => setSlideOver("edit", true)}
            >
              <span className="block w-full h-[1px] bg-black hamburguer-line"></span>
            </div>
          </nav>
        </header>

        {isMatch && (
          <SlideOver id="edit">
            <div className="flex justify-center w-full py-10 px-5">
              <Logo />
            </div>

            <div className="space-y-5">
              {!path.startsWith("/admin") && !path.startsWith("/aluno") && (
                <ul className={`text-[16px] space-y-2`}>
                  <li>
                    <Link
                      href="/#planos"
                      className="font-semibold text-[#ff4500]"
                      onClick={handleClick}
                    >
                      Matricule-se
                    </Link>
                  </li>

                  <li>
                    <Link href="/#modalidades" onClick={handleClick}>
                      Modalidades
                    </Link>
                  </li>

                  <li>
                    <Link href="/#planos" onClick={handleClick}>
                      Planos
                    </Link>
                  </li>

                  <li>
                    <Link href="/#unidades" onClick={handleClick}>
                      Unidades
                    </Link>
                  </li>

                  <li>
                    <Link href="/#contato" onClick={handleClick}>
                      Contato
                    </Link>
                  </li>
                </ul>
              )}

              {!path.startsWith("/admin") && !path.startsWith("/aluno") && (
                <div className="flex justify-center">
                  <Button
                    className="bg-[#ff1e00] hover:bg-[#d71900] rounded-full gap-x-2"
                    onClick={() => {
                      push("/login");
                      setSlideOver("edit", false);
                    }}
                  >
                    <UserCircle size={22} />
                    <span className="text-[14px]">Área do aluno</span>
                  </Button>
                </div>
              )}
            </div>
          </SlideOver>
        )}
      </React.Fragment>
    );
}
