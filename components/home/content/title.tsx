import { Bebas_Neue, } from 'next/font/google';

const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'] });

export interface ITitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  color?: string;
  titleSize?: string;
}

export function Title({
  title,
  subtitle,
  className,
  color = '#000',
  titleSize = 'text-[45px]',
}: ITitleProps) {
  return (
    <div className={`${className} leading-none space-y-0.5`} style={{ color }}>
      <h2 className={`${titleSize} ${bebas.className}`}>{title}</h2>
      <p className={`text-[18px]`}>{subtitle}</p>
    </div>
  );
}
