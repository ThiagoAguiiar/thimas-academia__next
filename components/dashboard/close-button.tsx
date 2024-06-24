import { X } from '@phosphor-icons/react/dist/ssr';

interface ICloseButtonProps {
  onClick?: () => void;
  size?: number;
}

export function CloseButton({ onClick, size = 18 }: ICloseButtonProps) {
  return (
    <div
      className="p-1.5 bg-[#e8e8e8] rounded-md flex items-center cursor-pointer justify-center hover:bg-[#dcdcdc]"
      onClick={() => onClick && onClick()}
    >
      <X size={size} />
    </div>
  );
}
