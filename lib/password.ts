import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  try {
    const salt = 10;
    const result = await bcrypt.hash(password, salt);
    return result;
  } catch (error) {
    console.error("Erro ao gerar senhas");
    throw error;
  }
}

export async function comparePassword(password: string, hash: string) {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    console.error("Erro ao comparar senhas");
    throw error;
  }
}
