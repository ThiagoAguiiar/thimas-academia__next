import Image from "next/image";

export function NotFound() {
  return (
    <div className="text-center">
      <p className="text-[25px] font-bold text-[#ff1e00]">Ops!</p>
      <p className="text-[16px] text-gray-500">
        Nenhum resultado foi encontrado para a pesquisa
      </p>

      <Image
        src="/not-found.svg"
        width={350}
        height={350}
        alt="Not Found data image"
        className="mx-auto"
      />
    </div>
  );
}
