import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

export function WhatsApp() {
  return (
    <Link
      href="https://api.whatsapp.com/send?phone=19991723702"
      target="blank"
      className="w-[50px] h-[50px] z-50 flex items-center justify-center bg-green-500 rounded-full border-2 border-white fixed right-3 bottom-3"
    >
      <WhatsappLogo weight="fill" size={25} />
    </Link>
  );
}
