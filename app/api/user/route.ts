import { NextRequest } from "next/server";
import { handleResponse } from "../utils/handleError";
import { getUsers } from "./methods";

export async function GET(req: NextRequest) {
  try {
    const name = req.nextUrl.searchParams.get("name") || "";

    const isAdmin = req.nextUrl.searchParams.get("isAdmin") === "admin";
    const isActive = req.nextUrl.searchParams.get("isActive") === "ativo";

    const { data, error, status } = await getUsers(name, isActive, isAdmin);

    return handleResponse(
      data,
      error,
      status,
      null,
      status === 200 ? "success" : "error"
    );
  } catch (err) {
    return handleResponse(null, err, 500, "Erro ao buscar usuários", "error");
  }
}
