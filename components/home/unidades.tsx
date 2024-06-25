"use client";

import React, { Suspense } from "react";
import { useStateCityContext } from "@/contexts/stateCityContext";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { unidadesSchema } from "@/validations/unidadesValidation";
import { CardUnidades } from "./content/card-unidades";

import { Select } from "../ui/select";
import { Button } from "../ui/button";
import { Title } from "./content/title";
import { Loading } from "../dashboard/loading";

interface IFormData {
  city: string;
  state: string;
}

export function Unidades() {
  const {
    states,
    cities,
    selectCity,
    setSelectedCity,
    selectState,
    setSelectedState,
  } = useStateCityContext();

  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(unidadesSchema),
    defaultValues: {
      state: selectState,
      city: selectCity,
    },
  });

  const onSubmit = (data: IFormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className={`py-10 w-[80%] mx-auto space-y-4`} id="unidades">
      <Title title="Thimas perto de você" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap items-start gap-2.5"
      >
        <Controller
          control={control}
          name="state"
          render={({ field }) => <Select {...field} />}
        />

        <Controller
          control={control}
          name="city"
          render={({ field }) => <Select {...field} />}
        />

        <Button
          type="submit"
          className="text-[15px] justify-center max-[590px]:w-full"
        >
          <MagnifyingGlass size={20} />
          Buscar unidades
        </Button>
      </form>

      <Suspense fallback={<Loading />}>
        <CardUnidades />
      </Suspense>
    </div>
  );
}
