import { cn } from "@/lib/utils";

export interface IProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function Title({ title, subtitle, className }: IProps) {
  return (
    <div
      className={cn(
        "w-full p-5 border-b border-b-[#e9e9e9] leading-none space-y-1.5",
        className
      )}
    >
      <h3 className="text-[25px] font-bold text-[#333]">{title}</h3>
      <p className="text-gray-500">{subtitle}</p>
    </div>
  );
}
