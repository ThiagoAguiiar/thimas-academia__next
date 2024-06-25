import { Banner } from "@/components/home/banner";
import { Modalidades } from "@/components/home/modalidades";
import { Planos } from "@/components/home/planos";
import { Unidades } from "@/components/home/unidades";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <Banner />
      <Modalidades />
      <Planos />
      <Unidades />
    </React.Fragment>
  );
}
