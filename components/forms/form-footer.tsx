"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formFooterSchema } from "@/validations/footerValidation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import { IPostFormData } from "@/types/footer";
import { useToast } from "../ui/use-toast";

export function FormFooter() {
  const [loading, setLoading] = React.useState(false);

  const { toast } = useToast();

  const form = useForm<IPostFormData>({
    resolver: zodResolver(formFooterSchema),
    defaultValues: {
      email: "",
      subject: "",
      name: "",
      phoneNumber: "",
    },
  });

  const handleSubmit = async (data: IPostFormData) => {
    try {
      setLoading(true);
      const response = await fetch(`${location.origin}/api/saq`, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });

      const json = await response.json();
      toast({
        title: response.status === 200 ? "Sucesso" : "Atenção",
        description: json.message,
        duration: 2500,
      });
    } catch (err) {
      toast({
        title: "Erro Interno",
        description: "Ocorreu um erro ao processar solicitação. Tente novamente mais tarde",
        duration: 2500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input placeholder="Nome" className="text-black" {...field} />
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
                <FormControl>
                  <Input
                    placeholder="Email"
                    className="text-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          name="phoneNumber"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Telefone"
                    mask="(99) 99999-9999"
                    className="text-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          name="subject"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Descreva o motivo do contato"
                    className="text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="flex justify-end">
          <Button
            loading={loading}
            type="submit"
            className="text-[15px] gap-x-2 rounded-md bg-[#ff1e00] hover:bg-[#d71900]"
          >
            Enviar soliticação
          </Button>
        </div>
      </form>
    </Form>
  );
}
