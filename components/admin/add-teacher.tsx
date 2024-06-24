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
import { IPostUser } from "@/types/user";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateAddTeacherSchema } from "@/validations/adminValidation";
import { File } from "../forms/file";
import { Avatar } from "../forms/avatar";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface IProps {
  loading?: boolean;
  children?: React.ReactNode;
}

export function AddTeacher({ loading, children }: IProps) {
  const { setSlideOver, slideOvers } = useSlideOverContext();
  const [file, setFile] = React.useState<string | null>(null);
  const [internalLoading, setInternalLoading] = React.useState(false);

  const { toast } = useToast();

  const form = useForm<IPostUser>({
    resolver: zodResolver(validateAddTeacherSchema),
    defaultValues: {
      name: "",
      email: "",
      image: "",
      isAdmin: true,
      isActive: true,
      isProvider: false,
    },
  });

  const handleSubmit = async (value: IPostUser) => {
    try {
      setInternalLoading(true);

      const response = await fetch(`${location.origin}/api/user`, {
        method: "POST",
        body: JSON.stringify({ ...value, image: file }),
      });

      if (response.statusText === "Created") {
        setSlideOver("view-teacher", false);
      }

      const json = await response.json();

      toast({
        title: response.status === 200 ? "Sucesso" : "Atenção",
        description: json.message,
        duration: 2500,
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao cadastrar usuário",
        duration: 2500,
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <React.Fragment>
      {children ? (
        React.cloneElement(children, {
          onClick: () =>
            setSlideOver("view-teacher", !slideOvers["view-teacher"]),
        })
      ) : (
        <Button
          type="button"
          className="text-[13px] gap-x-2"
          size="sm"
          variant="outline"
          disabled={loading}
          onClick={() =>
            setSlideOver("view-teacher", !slideOvers["view-teacher"])
          }
        >
          <Plus size={20} />
          Novo Professor
        </Button>
      )}

      <SlideOver id="view-teacher" width={500}>
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
                          <Input {...field} autoComplete="off" />
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
                          <Input {...field} autoComplete="off" />
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
                          <Input
                            {...field}
                            autoComplete="off"
                            type="password"
                          />
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
                  name="isActive"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem className="flex items-end gap-x-2">
                        <FormControl>
                          <Checkbox
                            {...field}
                            onCheckedChange={(e) => {
                              e
                                ? form.setValue("isActive", true)
                                : form.setValue("isActive", false);
                            }}
                            value={field.value.toString()}
                            checked={field.value}
                          />
                        </FormControl>

                        <Label>
                          {field.value.toString() == "true"
                            ? "Ativo"
                            : "Inativo"}
                        </Label>
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="mt-5 flex justify-end">
                <Button
                  size="sm"
                  className="bg-[#ff1e00] hover:bg-[#ff1e00] gap-x-2"
                  loading={internalLoading}
                  disabled={internalLoading}
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
