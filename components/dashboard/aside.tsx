import {
  Barbell,
  ChatCircle,
  House,
  User,
} from "@phosphor-icons/react/dist/ssr";
import { AsideLink } from "./aside-link";
import "./aside.css";
import { Logo } from "../navigate/logo";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { IGetToken } from "@/types/auth";
import { Logout } from "../navigate/logout";

const asideLinks = {
  admin: [
    {
      label: "Página Inicial",
      href: "/admin",
      icon: <House size={20} />,
    },
    {
      label: "Professores",
      href: "/admin/professores",
      icon: <Barbell size={20} />,
    },
    {
      label: "Alunos",
      href: "/admin/alunos",
      icon: <User size={20} />,
    },
    {
      label: "Contato",
      href: "/admin/contato",
      icon: <ChatCircle size={20} />,
    },
  ],
  aluno: [
    {
      label: "Página Inicial",
      href: "/aluno",
      icon: <House size={20} />,
    },
  ],
};

const userRoutes = async () => {
  const token = cookies().get("thimas-academia-auth")?.value;
  const decode = jwt.decode(token!);
  return decode as IGetToken;
};

export async function Aside() {
  const data = await userRoutes();

  return (
    <aside className="w-[250px] min-w-[250px] h-full border-r border-r-[#e9e9e9]">
      <div className="w-full h-screen grid-in p-7">
        <div className="mx-auto">
          <Logo />
        </div>

        <div className="border-t pt-5">
          <p className="text-[13px] font-medium text-gray-500 mb-3">
            Informações Gerais
          </p>

          {data.isAdmin
            ? asideLinks.admin.map(({ href, icon, label }, index) => {
                return (
                  <AsideLink
                    key={index}
                    href={href}
                    icon={icon}
                    label={label}
                  />
                );
              })
            : asideLinks.aluno.map(({ href, icon, label }, index) => {
                return (
                  <AsideLink
                    key={index}
                    href={href}
                    icon={icon}
                    label={label}
                  />
                );
              })}
        </div>

        <div className="flex items-end justify-end border-t">
          <Logout />
        </div>
      </div>
    </aside>
  );
}
