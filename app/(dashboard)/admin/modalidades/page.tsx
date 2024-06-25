import { Title } from "@/components/admin/title";
import React from "react";

export default async function Page() {
  return (
    <React.Fragment>
      <Title
        title="Modalidades"
        subtitle="Gerenciar modalidades disponíveis na academia. Ficarão visíveis na Home Page do site"
      />
    </React.Fragment>
  );
}
