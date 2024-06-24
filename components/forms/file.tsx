"use client";

import base64String from "@/lib/base64String";
import React from "react";

const acceptedFileTypes = {
  pdf: "application/pdf",
  jpeg: "image/jpeg",
  png: "image/png",
  txt: "text/plain",
  image: "image/*",
};

interface IFileProps {
  size?: number;
  file: string | null;
  setFile: (value: string) => void;
  accept?: "pdf" | "image" | "jpeg" | "png" | "txt";
}

export function File({ size = 5, setFile, accept = "image" }: IFileProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<{
    status: number;
    message: string;
  } | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      const fileSizeInMB = selectedFile.size / (1024 * 1024);

      if (fileSizeInMB > size) {
        setStatus({
          status: 400,
          message: `O arquivo deve ter no máximo ${size}mb`,
        });

        setOpen(true);
        e.target.value = "";
      } else {
        setOpen(true);

        setStatus({
          status: 200,
          message: "Arquivo carregado com sucesso!",
        });

        setFile(await base64String(selectedFile));
      }
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>

          <p className="text-sm text-gray-500 text-center">
            <span className="font-semibold">Buscar arquivos</span>
          </p>

          <p className="text-xs text-gray-500">
            Arquivos com tamanho máximo de {size}mb
          </p>
        </div>

        <input
          hidden
          type="file"
          accept={acceptedFileTypes[accept]}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
