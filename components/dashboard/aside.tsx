import { Barbell, Gear, House, User } from "@phosphor-icons/react/dist/ssr";
import { AsideLink } from "./aside-link";
import "./aside.css";

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
  ],
};

export function Aside() {
  return (
    <aside className="w-[250px] min-w-[250px] h-full border-r border-r-[#e9e9e9]">
      <div className="w-full h-screen grid-in p-7">
        <div></div>

        <div>
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
