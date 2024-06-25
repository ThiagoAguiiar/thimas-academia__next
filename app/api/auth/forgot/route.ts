import randomCode from "@/lib/randomCode";

import { NextRequest } from "next/server";
import { getUserByEmail } from "../../user/methods";
import { createRecovery } from "./methods";
import { sendEmail } from "../../utils/smtp";
import { handleResponse } from "../../utils/handleError";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");

    if (email) {
      const u = await getUserByEmail(email);

      if (u.data && u.data.length > 0 && !u.data[0].isProvider) {
        const rdm = randomCode(6);

        await createRecovery({
          email: email,
          code: rdm.toString(),
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
          isValid: true,
        });

        await sendEmail(
          email,
          "Thimas Academia - Redefinição de senha",
          `Este é seu link para redefinição de senha: http://localhost:3000/reset?code=${rdm}&email=${email}. 
          Lembre-se que este link é válido por 3 horas.`
        );
      }

      return handleResponse(
        null,
        null,
        200,
        "Se o email constar em nosso sitema, você receberá as demais instruções para redefinição de senha.",
        "success"
      );
    }

    return handleResponse(
      null,
      null,
      404,
      "Ocorreu um erro ao processar solicitação. Tente novamente mais tarde",
      "error"
    );
  } catch (err) {
    return handleResponse(
      null,
      err,
      404,
      "Ocorreu um erro ao processar solicitação. Tente novamente mais tarde",
      "error"
    );
  }
}
