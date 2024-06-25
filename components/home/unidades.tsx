"use client";

import React, { Suspense } from "react";
import { useStateCityContext } from "@/contexts/stateCityContext";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { unidadesSchema } from "@/validations/unidadesValidation";
import { CardUnidades } from "./content/card-unidades";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Title } from "./content/title";
import { Loading } from "../dashboard/loading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

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

  const form = useForm({
    resolver: zodResolver(unidadesSchema),
    defaultValues: {
      state: selectState,
      city: selectCity,
    },
  });

  const handleSubmit = (data: IFormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className={`py-10 w-[80%] mx-auto space-y-4`} id="unidades">
      <Title title="Thimas perto de você" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex gap-x-3 flex-wrap gap-3"
        >
          <FormField
            name="state"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="max-[465px]:w-full">
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(e) => {
                        form.setValue("state", e);
                        form.setValue("city", "");
                        setSelectedState(e);
                        setSelectedCity("");
                      }}
                    >
                      <SelectTrigger className="w-[230px] max-[465px]:w-full rounded-full h-10 border-black">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Estados</SelectLabel>
                          {states.map((state, index) => {
                            return (
                              <SelectItem value={state.value} key={index}>
                                {state.label}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            name="city"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="max-[465px]:w-full">
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(e) => {
                        form.setValue("city", e);
                        setSelectedCity(e);
                      }}
                    >
                      <SelectTrigger className="w-[230px] max-[465px]:w-full rounded-full h-10 border-black">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Cidades</SelectLabel>
                          {cities.map((city, index) => {
                            return (
                              <SelectItem value={city.value} key={index}>
                                {city.label}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button
            loading={loading}
            type="submit"
            className="rounded-full bg-[#ff1e00] hover:bg-[#d71900] gap-x-2 text-[15px] justify-center max-[590px]:w-full"
          >
            <MagnifyingGlass size={20} />
            Buscar unidades
          </Button>
        </form>
      </Form>

      <Suspense fallback={<Loading />}>
        <CardUnidades />
      </Suspense>
    </div>
  );
}
