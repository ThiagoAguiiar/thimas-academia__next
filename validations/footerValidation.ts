import { z } from 'zod';

export const formFooterSchema = z.object({
  name: z.string().min(1, 'Preencha o campo corretamente'),
  email: z.string().email('Digite um email válido'),
  phoneNumber: z
    .string()
    .min(14, 'Digite um telefone válido')
    .max(15, 'Digite um telefone válido'),
  subject: z.string().min(1, 'Insira o motivo do contato'),
});
