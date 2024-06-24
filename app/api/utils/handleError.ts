import { NextResponse } from "next/server";

export async function handleResponse<D = any, E = any>(
  data: D,
  err: E,
  status: number,
  message: string | null,
  messageType: "success" | "warning" | "danger" | "error"
) {
  return NextResponse.json(
    {
      data: data,
      message: message,
      error: err,
      status: status,
      messageType: messageType,
    },
    { status: status }
  );
}
