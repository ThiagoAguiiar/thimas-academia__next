"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loading } from "../dashboard/loading";
import { NotFound } from "../dashboard/not-found";

interface IProps {
  loading?: boolean;
  data: any;
  columns: IDataTableColumns[];
  caption?: string;
}

interface IDataTableColumns {
  label: string;
  key: string;
}

export function DataTable({ loading, data, columns, caption }: IProps) {
  if (loading) {
    return <TableLoader />;
  }

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
          {data.map((row: any, rowIndex: number) => (
            <TableRow key={rowIndex}>
              {columns.map(({ key }, colIndex) => (
                <TableCell key={colIndex}>{row[key].toString()}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return <TableNotFound />;
}

function TableLoader() {
  return (
    <div className="w-full px-5 h-[500px] flex items-center justify-center">
      <Loading />
    </div>
  );
}

function TableNotFound() {
  return (
    <div className="w-full min-h-[500px] flex items-center justify-center">
      <NotFound />
    </div>
  );
}
