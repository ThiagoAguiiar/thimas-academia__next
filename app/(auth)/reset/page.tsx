"use client";

import React from "react";

import { forgotSchema, resetSchema } from "@/validations/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { redirect, useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const email = useSearchParams().get("email") || "";
  const code = useSearchParams().get("code") || "";

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState({
    message: "",
    opened: false,
  });

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      code: code,
      email: email,
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async ({
    email,
    code,
    confirmPassword,
    password,
  }: {
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`${location.origin}/api/auth/reset`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          code: code,
          confirmPassword: confirmPassword,
          password: password,
        }),
      });

      const json = await response.json();

      console.log(json);

      if (json.status === 200) {
        setOpen({
          message: json.message,
          opened: true,
        });
      } else {
        setError(json.message);
      }
    } catch (err) {
      setError("Ocorreu umm erro interno");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (email.length === 0 && code.length === 0) redirect("/login");

  return (
    <React.Fragment>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="border border-[#c7c7c7] px-5 py-7 w-[400px] rounded-lg space-y-5 anime-left"
        >
          <div>
            <h3 className="text-[25px] font-semibold">Alterar sua senha</h3>
          </div>

          <div className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <Label>Email</Label>
                    <FormControl>
                      <Input
                        type="text"
                        className="w-full rounded-md text-[14px] border-[#c7c7c7] hover:border-none hover:ring-none hover:outline-[#ff4500] hover:outline outline-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => {
                return (
                  <FormItem>
                    <Label>Código de Verificação</Label>
                    <FormControl>
                      <Input
                        type="text"
                        className="w-full rounded-md text-[14px] border-[#c7c7c7] hover:border-none hover:ring-none hover:outline-[#ff4500] hover:outline outline-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <Label>Senha</Label>
                    <FormControl>
                      <Input
                        type="password"
                        className="w-full rounded-md text-[14px] border-[#c7c7c7] hover:border-none hover:ring-none hover:outline-[#ff4500] hover:outline outline-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <Label>Confirmar senha</Label>
                    <FormControl>
                      <Input
                        type="password"
                        className="w-full rounded-md text-[14px] border-[#c7c7c7] hover:border-none hover:ring-none hover:outline-[#ff4500] hover:outline outline-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button
              type="submit"
              className="gap-x-2 text-[15px] w-full justify-center rounded-md bg-[#ff1e00] hover:bg-[#d71900]"
              loading={loading}
            >
              Enviar
            </Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </form>
      </Form>

      <AlertDialog open={open.opened}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sucesso!</AlertDialogTitle>
            <AlertDialogDescription>{open.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => router.push("/login")}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  );
}
