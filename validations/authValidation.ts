import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Digite um email válido"),
  password: z.string().min(1, "Preencha o campo corretamente"),
});

export const forgotSchema = z.object({
  email: z.string().email("Digite um email válido"),
});

export const resetSchema = z
  .object({
    email: z.string().email("Insira um e-mail válido"),
    code: z.string().min(6, "Código de verificação inválido"),
    password: z.string().min(6, "Senha deve conter no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "Senha deve conter no mínimo 6 caracteres"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas precisam ser iguais",
        path: ["confirmPassword"],
      });
    }
  });
