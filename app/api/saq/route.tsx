import { NextRequest } from "next/server";
import { handleResponse } from "../utils/handleError";
import { addSaq, getSaqs } from "./methods";
import { sendEmail } from "../utils/smtp";

export async function POST(req: NextRequest) {
  try {
    const { email, name, phoneNumber, subject } = await req.json();

    if (!email || !name || !phoneNumber || !subject) {
      return handleResponse(
        null,
        null,
        400,
        "Preencha os campos corretamente",
        "error"
      );
    }

    // Salva a solicitação no banco de dados
    const { data, error, status } = await addSaq({
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      subject: subject,
      isActive: true,
    });

    if (error !== null) {
      return handleResponse(
        null,
        error,
        status,
        "Erro ao enviar solicitação. Tente novamente mais tarde",
        "error"
      );
    }

    // Envia email ao usuário para confirmar recebimento da solicitação
    await sendEmail(
      email,
      "Solicitação Recebida",
      `Olá, ${name}. Sua solicitação foi recebida com sucesso. Em breve entraremos em contato.`
    );

    return handleResponse(
      data,
      null,
      200,
      "Solicitação enviada com sucesso",
      "success"
    );
  } catch (err) {
    return handleResponse(
      null,
      err,
      500,
      "Erro ao enviar solicitação. Tente novamente mais tarde",
      "error"
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { data, error, status } = await getSaqs();

    if (error !== null) {
      return handleResponse(
        null,
        error,
        status,
        "Erro ao carregar informações",
        "error"
      );
    }

    return handleResponse(
      data,
      null,
      200,
      "Informações carregadas com sucesso",
      "success"
    );
  } catch (err) {
    return handleResponse(
      null,
      err,
      500,
      "Erro ao carregar informações",
      "error"
    );
  }
}
