import { z } from "zod";

export const unidadesSchema = z.object({
  city: z.string().min(1, "Selecione uma cidade"),
  state: z.string().min(1, "Selecione um estado"),
});
