"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { useSlideOverContext } from "@/contexts/slideOverContext";
import { SlideOver } from "@/components/dashboard/slide-over";
import { Title } from "@/components/admin/title";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { IGetUser, IPostUser } from "@/types/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateAddTeacherSchema } from "@/validations/adminValidation";
import { File } from "@/components/forms/file";
import { Avatar } from "@/components/forms/avatar";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface IProps {
  loading?: boolean;
}

export function AddUser({ loading }: IProps) {
  const [file, setFile] = React.useState<string | null>(null);
  const { setSlideOver, slideOvers } = useSlideOverContext();

  return (
    <React.Fragment>
      <Button
        type="button"
        className="text-[13px] gap-x-2"
        size="sm"
        variant="outline"
        disabled={loading}
        onClick={() => setSlideOver("add-user", !slideOvers["add-user"])}
      >
        <Plus size={20} />
        Novo usuário
      </Button>

      <SlideOver id="add-user" width={500}>
        <div className="space-y-5">
          <Title
            title="Novo Usuário"
            subtitle="Preencha os campos obrigatórios abaixo"
            className="px-0"
          />

          <Avatar src={file} setFile={setFile} alt="Foto de perfil" />
          <UserDataForm file={file} setFile={setFile} />
        </div>
      </SlideOver>
    </React.Fragment>
  );
}

function UserDataForm({
  file,
  setFile,
}: {
  data?: IGetUser | null;
  file: string | null;
  setFile: (value: string | null) => void;
}) {
  const [internalLoading, setInternalLoading] = React.useState(false);
  const { setSlideOver } = useSlideOverContext();
  const { toast } = useToast();

  const form = useForm<IPostUser>({
    resolver: zodResolver(validateAddTeacherSchema),
    defaultValues: {
      name: "",
      email: "",
      image: "",
      isAdmin: false,
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
        setSlideOver("add-user", false);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-2">
          <FormItem>
            <Label>Upload Foto de Perfil</Label>
            <FormControl>
              <File file={file} setFile={setFile} />
            </FormControl>
          </FormItem>

          <FormField
            name="name"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <Label required>Nome</Label>
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
                  <Label required>Email</Label>
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
                  <Label required>Senha</Label>
                  <FormControl>
                    <Input {...field} autoComplete="off" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

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
                    {field.value.toString() == "true" ? "Ativo" : "Inativo"}
                  </Label>
                </FormItem>
              );
            }}
          />

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
                          ? form.setValue("isAdmin", true)
                          : form.setValue("isAdmin", false);
                      }}
                      value={field.value.toString()}
                      checked={field.value}
                    />
                  </FormControl>

                  <Label>
                    {field.value.toString() == "true"
                      ? "Administrador"
                      : "Aluno"}
                  </Label>
                </FormItem>
              );
            }}
          />
        </div>

        <div className="mt-5 flex justify-end gap-x-2">
          <Button
            size="sm"
            type="button"
            variant="outline"
            onClick={() => setSlideOver(`add-user`, false)}
          >
            Cancelar
          </Button>

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
  );
}
