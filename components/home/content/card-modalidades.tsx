import Image from 'next/image';
import Link from 'next/link';

import { Bebas_Neue } from 'next/font/google';

const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'] });

interface ICardProps {
  image: string;
  title: string;
  alt: string;
  href: string;
}

export function CardModalidades({ image, title, alt, href }: ICardProps) {
  return (
    <Link
      href={`/${href}`}
      className="w-full h-[380px] inline-block rounded-3xl relative"
    >
      <Image
        src={image}
        alt={alt}
        width={280}
        height={350}
        className="object-cover object-center absolute top-0 left-0 w-full h-full rounded-3xl brightness-[60%] max-[720px]:object-right"
      />

      <div className="w-full h-full absolute top-0 left-0 z-20">
        <p
          className={`${bebas.className} absolute bottom-3 right-7 text-white text-[35px]`}
        >
          {title}
          <span className="block h-[2px] rounded-full bg-[#ff4500] w-[100px]"></span>
        </p>
      </div>
    </Link>
  );
}
