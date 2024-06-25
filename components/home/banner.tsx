"use client";

import Image from "next/image";

import { Bebas_Neue } from "next/font/google";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

export function Banner() {
  const router = useRouter();

  return (
    <div className={"h-[500px] bg-black text-white relative"}>
      <Image
        src="/hero.png"
        alt="Hero Banner - Homem fazendo levantamento de peso"
        className="object-cover object-center absolute top-0 left-0 w-full h-full max-[725px]:brightness-75"
        width={1920}
        height={500}
      />

      <div className="w-[90%] mx-auto h-full relative z-50 flex items-center max-[420px]:items-end max-[420px]:pb-10">
        <div className="space-y-5">
          <div className={`${bebas.className} space-y-2`}>
            <h1 className="text-[60px] leading-none max-[420px]:text-[50px]">
              O resultado não é foco,{" "}
              <span className="block max-[725px]:inline-block">é hábito</span>
            </h1>

            <h2 className="text-[28px]">
              Matricule-se já e comece sua transformação hoje mesmo
            </h2>
          </div>
          <Button
            className="rounded-full bg-[#ff1e00] hover:bg-[#d71900]"
            onClick={() => router.push("/#planos")}
          >
            <span className="text-[15px]">Matricule-se</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
