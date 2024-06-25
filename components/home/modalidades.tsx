"use client";

import Link from "next/link";

import { Suspense } from "react";

import { CardModalidades } from "./content/card-modalidades";
import { Carousel } from "./content/carousel";
import { Title } from "./content/title";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const breakpoints = {
  1468: {
    slidesPerView: 4,
  },
  1092: {
    slidesPerView: 3,
  },
  768: {
    slidesPerView: 2,
  },
  0: {
    slidesPerView: 1,
  },
};

const cards = [
  {
    image: "/m-musculacao.jpg",
    title: "Musculação",
    alt: "Pessoa levantando peso",
    href: "modalidades/musculacao",
  },
  {
    image: "/m-danca.jpg",
    title: "Fit dance",
    alt: "Pessoas dançando",
    href: "modalidades/fit-dance",
  },
  {
    image: "/m-natacao.jpg",
    title: "Natação",
    alt: "Pessoa nadando em uma piscina",
    href: "modalidades/natacao",
  },
  {
    image: "/m-cardio.jpg",
    title: "Cardio",
    alt: "Pessoa correndo em uma esteira",
    href: "modalidades/cardio",
  },
];

export function Modalidades() {
  const router = useRouter();

  return (
    <div className="w-[80%] mx-auto py-10 space-y-7" id="modalidades">
      <Title title="Modalidades" subtitle="Pegue pesado da forma como quiser" />

      <Suspense fallback="Loading...">
        <Carousel
          breakpoints={breakpoints}
          cards={cards.map(({ image, title, alt, href }, index) => {
            return (
              <CardModalidades
                image={image}
                title={title}
                href={href}
                key={index}
                alt={alt}
              />
            );
          })}
        />
      </Suspense>

      <div className={`text-center w-full space-y-5`}>
        <p className="mt-3 text-gray-500 max-[768px]:text-[15px]">
          Fique atento às modalidades disponíveis para o seu plano escolhido.
          Você poderá incluir ou trocar de modalidade quando quiser. Para isso,
          basta entrar em contato com sua unidade ou realizar o{" "}
          <Link href="/contato" className="underline text-[#ff4500]">
            pedido pelo site.
          </Link>
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            className="justify-center max-[370px]:w-full"
            onClick={() => router.push("/#planos")}
          >
            <span className="text-[15px]">Matricule-se</span>
          </Button>

          <Button
            variant="outline"
            color="#000"
            className="justify-center max-[370px]:w-full"
            onClick={() => router.push("/#contato")}
          >
            <span className="text-[15px]">Entre em contato</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
