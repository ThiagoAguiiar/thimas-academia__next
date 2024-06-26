import { IPostUser, IPutUser } from "@/types/user";
import { z } from "zod";

export const validateAddTeacherSchema: z.ZodType<IPostUser> = z.object({
  name: z.string().min(1, "Preencha o campo corretamente"),
  email: z.string().email("Insira um email válido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
  image: z.string().nullable(),
  isProvider: z.boolean(),
  isAdmin: z.boolean(),
  isActive: z.boolean(),
});

export const validatePutTeacherSchema: z.ZodType<IPutUser> = z.object({
  userId: z.string(),
  name: z.string().min(1, "Preencha o campo corretamente"),
  email: z.string().email("Insira um email válido"),
  image: z.string().nullable(),
  password: z
    .string()
    .optional()
    .refine((value) => !value || value.length >= 6, {
      message: "A senha deve conter no mínimo 6 caracteres",
    }),
  isProvider: z.boolean(),
  isAdmin: z.boolean(),
  isActive: z.boolean(),
});
