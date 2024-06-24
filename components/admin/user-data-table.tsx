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
import { TableActions } from "./table/table-actions";
import { TableNotFound } from "./table/table-notfound";
import { TableLoader } from "./table/table-loader";

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

export function UserDataTable({
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
                        className={
                          key === "isActive"
                            ? row[key] === "Ativo"
                              ? "text-green-500"
                              : "text-red-500"
                            : "text-current"
                        }
                      >
                        {row[key].toString()}
                      </Badge>
                    ) : (
                      row[key as keyof typeof row]!.toString()
                    )}
                  </TableCell>
                ))}

                {actions && (
                  <TableCell>
                    <TableActions id={row.userId} isActive={row.isActive} />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }

  return <TableNotFound />;
}
