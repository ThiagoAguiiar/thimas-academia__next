import { NextRequest } from "next/server";
import { handleResponse } from "../utils/handleError";
import { createUser, getUserByEmail, getUsers } from "./methods";
import { hashPassword } from "@/lib/password";
import { uploadFiles } from "@/lib/bucket";
import { base64StringToFile } from "@/lib/file";

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

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, image, isAdmin, isActive, isProvider } =
      await req.json();

    if (!name || !email || !password) {
      return handleResponse(
        null,
        null,
        400,
        "Preencha os campos corretamente",
        "error"
      );
    }

    // Verificar se o usuário já está cadastrado
    const u = await getUserByEmail(email);

    if (u.data == null || u.data.length === 0) {
      const imageId = crypto.randomUUID();

      // Cadastra o usuário
      const { data, error, status } = await createUser({
        email: email,
        isActive: isActive,
        isAdmin: isAdmin,
        isProvider: isProvider,
        name: name,
        password: await hashPassword(password),
        image: imageId,
      });

      if (image && image.trim().length > 0) {
        const file = base64StringToFile(image, `${name}`);
        await uploadFiles(file, "profile-img", imageId);
      }

      if (error == null) {
        return handleResponse(
          data,
          null,
          status,
          "Usuário cadastrado com sucesso",
          "success"
        );
      }

      return handleResponse(
        null,
        error,
        status,
        "Erro ao cadastrar usuário",
        "error"
      );
    }

    return handleResponse(
      null,
      null,
      409,
      "Usuário já cadastrado no sistema",
      "warning"
    );
  } catch (err) {
    return handleResponse(null, err, 500, "Erro ao cadastrar usuário", "error");
  }
}
