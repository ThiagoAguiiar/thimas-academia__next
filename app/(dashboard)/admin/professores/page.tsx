"use client";

import React from "react";

import { Filter } from "@/components/admin/filter";
import { Title } from "@/components/admin/title";

import { IGetUser } from "@/types/user";
import { UserTable } from "@/components/admin/user/user-table";
import { AddUser } from "@/components/admin/user/add-user";

const dataColumns = [
  {
    label: "Nome",
    key: "name",
  },
  {
    label: "Email",
    key: "email",
  },
  {
    label: "Administrador",
    key: "isAdmin",
  },
  {
    label: "Status",
    key: "isActive",
  },
];

export default function Page() {
  const [name, setName] = React.useState("");
  const [isActive, setIsActive] = React.useState("ativo");
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<IGetUser[] | null>(null);

  React.useEffect(() => {
    const getTableData = async () => {
      try {
        setLoading(true);

        const url = `${location.origin}/api/user?name=${name}&isActive=${isActive}&isAdmin=admin`;
        const response = await fetch(url);
        const json = await response.json();

        const aux: IGetUser[] = [];

        json.data.map((item: IGetUser) => {
          aux.push({
            ...item,
            isAdmin: item.isAdmin ? "Administrador" : "Aluno",
            isActive: item.isActive ? "ativo" : "inativo",
          });
        });

        setData(aux);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    getTableData();
  }, [isActive, name]);

  return (
    <div>
      <Title title="Professores" subtitle="Lista de professores da academia" />
      <Filter setName={setName} setIsActive={setIsActive} loading={loading} />

      <div className="px-5 mb-4">
        <AddUser loading={loading} />
      </div>

      <UserTable
        data={data}
        loading={loading}
        columns={dataColumns}
        caption={`${data?.length} Resultado(s) encontrado(s)`}
        actions
      />
    </div>
  );
}
