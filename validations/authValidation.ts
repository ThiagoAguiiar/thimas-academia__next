import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Digite um email válido'),
  password: z.string().min(1, 'Preencha o campo corretamente'),
});
