import { Loading } from "@/components/dashboard/loading";

export function TableLoader() {
  return (
    <div className="w-full px-5 h-[500px] flex items-center justify-center">
      <Loading />
    </div>
  );
}
