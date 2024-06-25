"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { IGetFormData } from "@/types/footer";
import { Info } from "@phosphor-icons/react/dist/ssr";
import { useRouter, useSearchParams } from "next/navigation";

import React from "react";
import { revalidateSaq } from "../actions";

export function SaqView({ data }: { data: IGetFormData[] }) {
  const params = useSearchParams().get("id");
  const router = useRouter();

  const { toast } = useToast();

  const [selected, setSelected] = React.useState<IGetFormData | null>(null);
  const [response, setResponse] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (params) {
      const find = data.find((item) => item.saqId === params);
      if (find) setSelected(find);
    } else {
      setSelected(null);
    }
  }, [params]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (response.trim().length > 0) {
        const res = await fetch(`${location.origin}/api/saq/response`, {
          method: "POST",
          body: JSON.stringify({
            ...selected,
            response: response,
          }),
        });

        if (res.statusText === "OK") {
          router.push("/admin/contato");
          await revalidateSaq();
        }

        const json = await res.json();

        toast({
          title: res.status === 200 ? "Sucesso" : "Atenção",
          description: json.message,
          duration: 2000,
        });
      }
    } catch (err) {
      toast({
        title: "Erro Interno",
        description:
          "Ocorreu um erro ao enviar mensagem. Tente novamente mais tarde",
        duration: 2000,
      });
    } finally {
      setLoading(false);
      setResponse("");
    }
  };

  return (
    <div
      className={`w-full h-full ${
        !selected && "flex items-center justify-center"
      }`}
    >
      {selected ? (
        <div className="p-10 flex h-full flex-col justify-between">
          <div className="space-y-1.5">
            <p className="text-lg">{selected.name}</p>
            <p className="font-normal">{selected.subject}</p>
          </div>

          <div className="flex items-start gap-x-5">
            <Textarea
              className="resize-none"
              value={response}
              rows={5}
              disabled={loading}
              onChange={(e) => setResponse(e.target.value)}
              placeholder={`Enviar resposta para ${selected.name}`}
            />
            <Button
              className="gap-x-2"
              loading={loading}
              onClick={handleSubmit}
            >
              Enviar Resposta
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-x-2.5">
          <Info size={25} />
          Clique nos cards para visualizar seu conteúdo
        </div>
      )}
    </div>
  );
}
