import { SaqView } from "@/components/admin/saq/saq-view";
import { Title } from "@/components/admin/title";
import { NotFound } from "@/components/dashboard/not-found";
import { IGetFormData } from "@/types/footer";

import Link from "next/link";
import React from "react";

export async function fetchData(): Promise<{ data: IGetFormData[] | null }> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/api/saq`, {
    cache: "no-cache",
  });

  const json = await response.json();
  return { data: json.data };
}

export default async function Page() {
  const { data } = await fetchData();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };

  return (
    <React.Fragment>
      <Title
        title="Contato"
        subtitle="Informações recebidas do formulário de contato do site"
      />

      <div className="h-[calc(100vh-87.8px)] max-h-full w-full grid grid-cols-12">
        <div className="col-span-4 border-r overflow-y-auto h-full">
          {data &&
            data.length > 0 &&
            data.map((item, index) => {
              const formattedDate = new Date(item.createdAt).toLocaleDateString(
                "pt-BR",
                options
              );

              return (
                <Link
                  href={`contato?id=${item.saqId}`}
                  key={index}
                  className="p-7 border-b block w-full hover:bg-[#f8fafc] cursor-pointer"
                >
                  <p className="font-bold text-lg text-[#ff1e00]">
                    {item.name}
                  </p>

                  <div className="mt-0.5 space-y-0.5">
                    <p className="text-gray-600 text-sm font-medium">
                      {item.email}
                    </p>
                    <p className="text-xs text-gray-500">{`${formattedDate}`}</p>
                  </div>
                </Link>
              );
            })}

          {!data ||
            (data.length === 0 && (
              <div className="w-full h-full flex items-center justify-center">
                <NotFound text="Nenhum contato encontrado" />
              </div>
            ))}
        </div>

        <div className="col-span-8 h-full flex items-center justify-center font-medium">
          <SaqView data={data || []} />
        </div>
      </div>
    </React.Fragment>
  );
}
