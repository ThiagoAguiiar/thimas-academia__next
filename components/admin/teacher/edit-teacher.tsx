import { SlideOver } from "@/components/dashboard/slide-over";
import { useSlideOverContext } from "@/contexts/slideOverContext";
import { IGetUser, IPostUser } from "@/types/user";
import { ArrowSquareIn } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import { Title } from "../title";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { validateAddTeacherSchema } from "@/validations/adminValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "@radix-ui/react-select";
import { Input } from "postcss";
import { useForm, Form } from "react-hook-form";

interface IProps {
  data: IGetUser | null;
  index: number;
}

export function EditTeacher({ data, index }: IProps) {
  const { setSlideOver, slideOvers } = useSlideOverContext();
  const [file, setFile] = React.useState<string | null>(null);

  return (
    <React.Fragment>
      <div
        className="flex items-center gap-x-2"
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
