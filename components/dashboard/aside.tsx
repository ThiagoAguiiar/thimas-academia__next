import {
  Barbell,
  ChatCircle,
  Gear,
  House,
  SquaresFour,
  User,
} from "@phosphor-icons/react/dist/ssr";
import { AsideLink } from "./aside-link";
import "./aside.css";
import { Logo } from "../navigate/logo";

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
    {
      label: "Modalidades",
      href: "/admin/modalidades",
      icon: <SquaresFour size={20} />,
    },
  ],
};

export function Aside() {
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

          {asideLinks.admin.map(({ href, icon, label }, index) => {
            return (
              <AsideLink key={index} href={href} icon={icon} label={label} />
            );
          })}

          <p className="text-[13px] font-medium text-gray-500 mt-3 mb-3">
            Configurações
          </p>

          <AsideLink noLink icon={<Gear size={20} />} label="Configurações" />
        </div>
      </div>
    </aside>
  );
}
