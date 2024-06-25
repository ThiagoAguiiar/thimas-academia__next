import { NextRequest } from "next/server";
import { handleResponse } from "../../utils/handleError";
import { getRecoveryByCode } from "./methods";
import { getUserByEmail, updateUser } from "../../user/methods";
import { hashPassword } from "@/lib/password";

export async function POST(req: NextRequest) {
  try {
    const { email, code, password, confirmPassword } = await req.json();

    if (!email || !code || !password || !confirmPassword) {
      return handleResponse(
        null,
        null,
        400,
        "Preencha todos os campos",
        "error"
      );
    }

    // Busca o código de recuperação
    const recovery = await getRecoveryByCode(code);

    // Verifica se o código é válido
    if (!recovery.data || recovery.data.length === 0) {
      console.log("caiu aqui 3");

      return handleResponse(
        null,
        null,
        404,
        "Código de recuperação inválido",
        "error"
      );
    }

    // Verifica se o código está expirado
    if (new Date(recovery.data[0].expiresAt) < new Date()) {
      console.log("caiu aqui");
      return handleResponse(
        null,
        null,
        404,
        "Código de recuperação expirado",
        "error"
      );
    }

    // Verifica se o código está válido
    if (!recovery.data[0].isValid) {
      console.log("caiu aqui 2");

      return handleResponse(
        null,
        null,
        404,
        "Código de recuperação inválido",
        "error"
      );
    }

    // Atualiza a senha
    const u = await getUserByEmail(email);

    if (!u.data || u.data.length === 0) {
      return handleResponse(null, null, 404, "Usuário não encontrado", "error");
    }

    const { data, error } = await updateUser({
      ...u.data[0],
      password: await hashPassword(password),
    });

    if (error !== null) {
      return handleResponse(
        null,
        error,
        500,
        "Ocorreu um erro ao atualizar senha",
        "error"
      );
    }

    return handleResponse(
      data,
      null,
      200,
      "Senha atualizada com sucesso",
      "success"
    );
  } catch (err) {
    return handleResponse(
      null,
      err,
      500,
      "Ocorreu um erro ao atualizar senha",
      "error"
    );
  }
}
