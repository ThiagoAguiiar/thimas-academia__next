import "../planos.css";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "@phosphor-icons/react/dist/ssr";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

interface ICardPlanosProps {
  badge: string;
  title: string;
  color: string;
  data: {
    avaiable: boolean;
    text: string;
  }[];
  price: {
    month: string;
    semester: string;
  };
}

export function CardPlanos({
  badge,
  data,
  price,
  title,
  color,
}: ICardPlanosProps) {
  return (
    <div className="min-w-[350px] min-h-[320px] bg-white rounded-3xl space-y-4 shadow-lg card-pl">
      <div className="flex justify-end">
        <div
          className={` px-7 py-0.5 badge min-w-[100px] text-white text-[18px] ${bebas.className}`}
          style={{ background: color }}
        >
          {badge}
        </div>
      </div>

      <div>
        <p
          className={`text-center text-[30px] ${bebas.className}`}
          style={{ color }}
        >
          {title}
        </p>

        <div className={`px-5 pb-5 text-center text-[15px] space-y-5`}>
          <div className="space-y-2">
            {data.map(({ avaiable, text }) => {
              return (
                <p className="flex items-center gap-x-1">
                  {avaiable ? (
                    <CheckCircle size={20} color="green" />
                  ) : (
                    <XCircle size={20} color="red" />
                  )}
                  {text}
                </p>
              );
            })}
          </div>

          <div className="w-full text-start">
            <p className="text-[18px] text-sm">
              Mensal:{" "}
              <strong className="text-lg" style={{ color }}>
                {price.month}
              </strong>
            </p>

            <p className="text-[18px] text-sm">
              Semestral:{" "}
              <strong className="text-lg" style={{ color }}>
                {price.semester}
              </strong>
            </p>
          </div>

          <div>
            <Button
              className={`rounded-full w-full justify-center`}
              style={{ background: color }}
            >
              Quero esse
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
