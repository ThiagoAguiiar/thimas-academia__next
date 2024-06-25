"use client";

import React from "react";

import { ArrowSquareIn } from "@phosphor-icons/react/dist/ssr";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSlideOverContext } from "@/contexts/slideOverContext";
import { IGetUser, IPutUser } from "@/types/user";
import { cn } from "@/lib/utils";

import { SlideOver } from "@/components/dashboard/slide-over";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Title } from "../title";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";

import { validatePutTeacherSchema } from "@/validations/adminValidation";
import { File } from "@/components/forms/file";
import { Avatar } from "@/components/forms/avatar";

interface IProps {
  data: IGetUser | null;
  index: number;
}

export function EditTeacher({ data, index }: IProps) {
  const { setSlideOver } = useSlideOverContext();
  const [file, setFile] = React.useState<string | null>(data?.image || null);

  return (
    <React.Fragment>
      <div
        className="flex items-center gap-x-2 cursor-pointer text-[#ff1e00] hover:bg-[#ff1e001c] w-fit px-2 py-1.5 rounded-md"
        onClick={() => setSlideOver(`edit-teacher-${index}`, true)}
      >
        <ArrowSquareIn size={18} />
        Visualizar
      </div>

      <SlideOver id={`edit-teacher-${index}`} width={500}>
        <div className="space-y-5">
          <Title
            title={`Dados de ${data?.name}`}
            subtitle="Atenção aos campos obrigatórios"
            className="px-0"
          />

          <Avatar src={file} setFile={setFile} alt="Foto de perfil" />
          <UserDataForm
            file={file}
            setFile={setFile}
            data={data}
            index={index}
          />
        </div>
      </SlideOver>
    </React.Fragment>
  );
}

function UserDataForm({
  file,
  setFile,
  data,
  index,
}: {
  data: IGetUser | null;
  file: string | null;
  setFile: (value: string | null) => void;
  index: number;
}) {
  const [internalLoading, setInternalLoading] = React.useState(false);
  const { setSlideOver } = useSlideOverContext();
  const { toast } = useToast();

  const form = useForm<IPutUser>({
    resolver: zodResolver(validatePutTeacherSchema),
    defaultValues: {
      userId: data?.userId,
      name: data?.name,
      email: data?.email,
      image: data?.image,
      isAdmin: data?.isAdmin === "Administrador",
      isActive: data?.isActive === "ativo",
      isProvider: data?.isProvider,
      password: "",
    },
  });

  const handleSubmit = async (value: IPutUser) => {
    try {
      setInternalLoading(true);

      const response = await fetch(`${location.origin}/api/user`, {
        method: "PUT",
        body: JSON.stringify({ ...value, image: file }),
      });

      console.log(response.statusText);

      if (response.statusText === "OK") {
        setSlideOver(`edit-teacher-${index}`, false);
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
                    <Input {...field} autoComplete="off" type="password" />
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
                    {field.value.toString() == "true" ? "Ativo" : "Inativo"}
                  </Label>
                </FormItem>
              );
            }}
          />
        </div>

        <div className="mt-5 flex justify-end">
          <Button
            type="submit"
            size="sm"
            className="bg-[#ff1e00] hover:bg-[#ff1e00] gap-x-2"
            loading={internalLoading}
            disabled={internalLoading}
          >
            Atualizar
          </Button>
        </div>
      </form>
    </Form>
  );
}
