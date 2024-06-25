import { Info } from "@phosphor-icons/react/dist/ssr";

export default function Page() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <span className="font-medium flex items-center gap-x-2">
        <Info size={20} />
        Clique nos links para visualizar seu conteúdo
      </span>
    </div>
  );
}
