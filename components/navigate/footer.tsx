"use client";

import Link from "next/link";

import { Title } from "../home/content/title";
import { Logo } from "./logo";

import { WhatsApp } from "./whatsapp";
import { InstagramLogo } from "../svg/instagram-logo";
import { YoutubeLogo } from "../svg/youtube-logo";
import { FacebookLogo } from "../svg/facebook-logo";
import { FormFooter } from "../forms/form-footer";
import { usePathname } from "next/navigation";

export function Footer() {
  const path = usePathname();

  if (path === "/")
    return (
      <footer
        className={`py-8 mx-auto bg-black text-white relative`}
        id="contato"
      >
        <WhatsApp />

        <div className="w-[80%] mx-auto grid grid-cols-2 max-[915px]:grid-cols-1">
          <div className="border-r border-white space-y-5 pr-10 max-[915px]:border-none max-[915px]:pr-0">
            <Title
              title="Tem dúvidas ou sugestões? Chama a gente aí"
              color="#fff"
              titleSize="text-[35px]"
            />

            <FormFooter />
          </div>

          <div className="px-10 space-y-5 max-[915px]:px-0">
            <div className="space-y-10">
              <Logo variant="white" />

              <div className="space-y-1">
                <Link
                  className="block w-fit font-semibold text-[#ff4500]"
                  href="/#planos"
                >
                  Matricule-se
                </Link>

                <Link className="block w-fit" href="/#modalidades">
                  Modalidades
                </Link>

                <Link className="block w-fit" href="/#unidades">
                  Unidades
                </Link>

                <Link className="block w-fit" href="/#planos">
                  Planos
                </Link>
              </div>
            </div>

            <div className="py-3 border-t border-t-white">
              <p className="text-sm">Redes sociais</p>

              <div className="flex items-center gap-x-1.5 mt-2">
                <Link href="https://www.instagram.com/" target="_blank">
                  <InstagramLogo />
                </Link>

                <Link href="https://www.youtube.com/" target="_blank">
                  <YoutubeLogo />
                </Link>

                <Link href="https://www.facebook.com/" target="_blank">
                  <FacebookLogo />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-center mt-6">
          © {new Date().getFullYear()} Thimas Academia - Todos os direitos
          reservados
        </p>
      </footer>
    );
}
