import { NextRequest } from "next/server";
import { handleResponse } from "../../utils/handleError";
import { sendEmail } from "../../utils/smtp";

export async function POST(req: NextRequest) {
  try {
    const { email, response } = await req.json();

    if (!email || !response) {
      return handleResponse(
        null,
        null,
        400,
        "Preencha os campos corretamente",
        "error"
      );
    }

    const { data, error } = await sendEmail(
      email,
      "Resposta ao seu contato",
      response
    );

    if (error) {
      return handleResponse(
        null,
        error,
        500,
        "Erro ao responder usuário",
        "error"
      );
    }

    return handleResponse(
      data,
      null,
      200,
      "Resposta enviada com sucesso",
      "success"
    );
  } catch (err) {
    return handleResponse(
      null,
      null,
      500,
      "Erro ao responder usuário",
      "error"
    );
  }
}
