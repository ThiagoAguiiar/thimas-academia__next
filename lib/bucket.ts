import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export async function uploadFiles(
  file: File,
  bucket_name: string,
  path: string
) {
  // Deleta o arquivo antigo
  await supabase.storage.from(bucket_name).remove([path]);

  // Cadastra o novo arquivo
  const { data, error } = await supabase.storage
    .from(bucket_name)
    .upload(path, file);

  return { data, error };
}
