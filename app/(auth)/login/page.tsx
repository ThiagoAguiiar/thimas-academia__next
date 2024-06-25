"use client";

import React from "react";
import Link from "next/link";

import { loginSchema } from "@/validations/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Google } from "@/components/forms/google";
import { Label } from "@/components/ui/label";

export default function Page() {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`${location.origin}/api/auth/email`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const json = await response.json();

      if (response.status === 200) {
        router.push(json.path);
        setError(null);
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="border border-[#c7c7c7] px-5 py-7 w-[400px] rounded-lg space-y-5 anime-left"
      >
        <div>
          <h3 className="text-[25px] font-semibold">Entrar</h3>
          <p>Acesse sua conta para continuar</p>
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
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <Label>Senha</Label>
                  <FormControl>
                    <Input
                      type="password"
                      className="w-full rounded-md text-[14px] ring-[#ff4500] border-[#c7c7c7] hover:border-none hover:ring-none hover:outline-[#ff4500] hover:outline outline-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Link
            href="/forgot"
            className="text-[14px] float-right block underline  text-blue-600 py-2"
          >
            Esqueci minha senha
          </Link>

          <Button
            type="submit"
            className="text-[15px] w-full justify-center rounded-md bg-[#ff1e00] hover:bg-[#d71900]"
            loading={loading}
          >
            Entrar
          </Button>

          <Google />

          <Link
            className="block text-[14px] underline text-blue-600"
            href="/register"
          >
            Criar uma conta
          </Link>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </form>
    </Form>
  );
}
