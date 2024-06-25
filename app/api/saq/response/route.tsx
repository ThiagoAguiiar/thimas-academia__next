import { NextRequest } from "next/server";
import { handleResponse } from "../../utils/handleError";
import { sendEmail } from "../../utils/smtp";
import { updateSaq } from "../methods";
import { IPutFormData } from "@/types/footer";

export async function POST(req: NextRequest) {
  try {
    const { email, response, createdAt, name, phoneNumber, saqId, subject } =
      await req.json();

    if (!email || !response) {
      return handleResponse(
        null,
        null,
        400,
        "Preencha os campos corretamente",
        "error"
      );
    }

    const saq: IPutFormData = {
      createdAt: createdAt,
      email: email,
      isActive: false,
      name: name,
      phoneNumber: phoneNumber,
      saqId: saqId,
      subject: subject,
    };

    const { data: x, error: y } = await updateSaq({ ...saq });

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
