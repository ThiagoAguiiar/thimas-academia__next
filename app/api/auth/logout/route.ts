import { cookies } from "next/headers";
import { handleResponse } from "../../utils/handleError";

export async function GET() {
  try {
    cookies().delete("thimas-academia-auth");

    return handleResponse(
      null,
      null,
      200,
      "Usuário deslogado com sucesso",
      "success"
    );
  } catch (err) {
    return handleResponse(err, null, 500, "Erro ao deslogar usuário", "error");
  }
}
