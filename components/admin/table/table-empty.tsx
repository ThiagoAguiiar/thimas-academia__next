import { NotFound } from "@/components/dashboard/not-found";

export function TableEmpty() {
  return (
    <div className="w-full min-h-[500px] flex items-center justify-center">
      <NotFound />
    </div>
  );
}
