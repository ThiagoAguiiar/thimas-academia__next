"use client";

import Link from "next/link";

interface ILinkProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  noLink?: false;
}

interface INoLinkProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  noLink: true;
}

type IProps = ILinkProps | INoLinkProps;

export function AsideLink(props: IProps) {
  return (
    <div>
      {props.noLink ? (
        <span
          className="flex items-center gap-2 py-1.5 px-3 rounded-md transition-all hover:bg-[#f1f1f1] cursor-pointer"
          onClick={() => props.onClick}
        >
          {props.icon && props.icon}
          <span className="text-[14px]">{props.label}</span>
        </span>
      ) : (
        <Link
          href={props.href}
          className="flex items-center gap-2 py-1.5 px-3 rounded-md transition-all hover:bg-[#f1f1f1]"
        >
          {props.icon && props.icon}
          <span className="text-[14px]">{props.label}</span>
        </Link>
      )}
    </div>
  );
}
