"use client";
import React from "react";

import {
  FadersHorizontal,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

export interface IProps {
  loading: boolean;
  setName: (value: string) => void;
  setIsActive: (value: string) => void;
  children?: React.ReactNode;
}

interface IFormData {
  name: string;
  isActive: string;
}

export function Filter({ setName, setIsActive, loading, children }: IProps) {
  const form = useForm<IFormData>({
    defaultValues: {
      name: "",
      isActive: "ativo",
    },
  });

  const handleSubmit = (value: IFormData) => {
    setName(value.name);
    setIsActive(value.isActive);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="px-5 py-5 flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="Pesquisar"
                        trailingIcon={<MagnifyingGlass size={20} />}
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        disabled={loading}
                        {...field}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="ativo">Ativo</SelectItem>
                            <SelectItem value="inativo">Inativo</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="flex items-center gap-x-3">
            <Button
              size="sm"
              type="submit"
              className="gap-x-2 bg-[#ff1e00] hover:bg-[#ff1e00]"
              loading={loading}
              disabled={loading}
            >
              <FadersHorizontal size={20} />
              Buscar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
