import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full h-full text-center flex items-center justify-center">
      <div>
        <Image
          src="/building.svg"
          width={500}
          height={200}
          alt="Página em construção"
        />
        <p className="text-[30px] text-gray-800 font-bold">
          Página em construção
        </p>
      </div>
    </div>
  );
}
