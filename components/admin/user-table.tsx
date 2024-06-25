"use client";

import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";

import { IGetUser } from "@/types/user";
import { TableEmpty } from "./table/table-empty";
import { TableLoader } from "./table/table-loader";
import { EditUser } from "./user/edit-user";

interface IProps {
  loading?: boolean;
  data: IGetUser[] | null;
  columns: IDataTableColumns[];
  caption?: string;
  actions?: boolean;
}

interface IDataTableColumns {
  label: string;
  key: string;
}

export function UserTable({
  loading,
  data,
  columns,
  caption,
  actions,
}: IProps) {
  if (loading) return <TableLoader />;

  if (data !== null && data.length > 0) {
    return (
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}

        <TableHeader>
          <TableRow>
            {columns.map(({ label }, index) => (
              <TableHead key={index}>{label}</TableHead>
            ))}

            <TableHead>Informações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, index) => {
            return (
              <TableRow key={index}>
                {columns.map(({ key }, colIndex) => (
                  <TableCell key={colIndex}>
                    {key === "isAdmin" || key === "isActive" ? (
                      <Badge
                        variant="outline"
                        className={getBadgeClass(key, row[key].toString())}
                      >
                        {row[key].toString()}
                      </Badge>
                    ) : (
                      row[key as keyof typeof row]?.toString()
                    )}
                  </TableCell>
                ))}

                {actions && (
                  <TableCell>
                    <EditUser data={row} index={index} />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }

  return <TableEmpty />;
}

// Funções auxiliares
function getBadgeClass(key: string, value: string) {
  if (key === "isActive") {
    return value === "ativo" ? "text-green-500" : "text-red-500";
  }

  return "text-current";
}
