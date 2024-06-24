"use client";

import React from "react";

import { Button } from "../ui/button";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { useSlideOverContext } from "@/contexts/slideOverContext";
import { SlideOver } from "../dashboard/slide-over";
import { Title } from "./title";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { IPostuser } from "@/types/user";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateAddTeacherSchema } from "@/validations/adminValidation";
import { File } from "../forms/file";
import { Avatar } from "../forms/avatar";

interface IProps {
  loading?: boolean;
}

export function AddTeacher({ loading }: IProps) {
  const { setSlideOver, slideOvers } = useSlideOverContext();
  const [file, setFile] = React.useState<string | null>("");

  const form = useForm<IPostuser>({
    resolver: zodResolver(validateAddTeacherSchema),
    defaultValues: {
      name: "",
      email: "",
      image: "",
      isAdmin: "admin",
      isActive: true,
      isProvider: false,
    },
  });

  const handleSubmit = async (value: IPostuser) => {
    console.log(value);
  };

  return (
    <React.Fragment>
      <Button
        type="button"
        className="text-[13px] gap-x-2"
        size="sm"
        variant="outline"
        disabled={loading}
        onClick={() => setSlideOver("add-teacher", !slideOvers["add-teacher"])}
      >
        <Plus size={20} />
        Novo Professor
      </Button>

      <SlideOver id="add-teacher" width={500}>
        <div className="space-y-5">
          <Title
            title="Novo Professor"
            subtitle="Preencha os campos obrigatórios abaixo"
            className="px-0"
          />

          <Avatar src={file} setFile={setFile} alt={form.watch("name")} />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="space-y-2">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label>Nome</Label>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label>Email</Label>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label>Senha</Label>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormItem>
                  <Label>Upload Foto de Perfil</Label>
                  <FormControl>
                    <File file={file} setFile={setFile} />
                  </FormControl>
                </FormItem>

                <FormField
                  name="isAdmin"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem className="flex items-end gap-x-2">
                        <FormControl>
                          <Checkbox
                            {...field}
                            onCheckedChange={(e) => {
                              e
                                ? form.setValue("isAdmin", "admin")
                                : form.setValue("isAdmin", "colaborador");
                            }}
                          />
                        </FormControl>

                        <Label>
                          {field.value === "admin"
                            ? "Administrador"
                            : "Colaborador"}
                        </Label>
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="mt-5 flex justify-end">
                <Button
                  size="sm"
                  className="bg-[#ff1e00] hover:bg-[#ff1e00]"
                  loading={loading}
                >
                  Cadastrar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SlideOver>
    </React.Fragment>
  );
}
