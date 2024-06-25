"use client";

import { SignOut } from "@phosphor-icons/react/dist/ssr";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

import React from "react";

export function Logout() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      const response = await fetch(`${location.origin}/api/auth/logout`);
      const json = await response.json();

      if (json.status === 200) router.push("/login");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={handleClick}
      loading={loading}
      disabled={loading}
      className="gap-x-2 bg-[#fa3b3b] hover:bg-[#be2525] hover:text-white text-white"
      variant="outline"
      size="sm"
    >
      <SignOut size={18} />
      Sair
    </Button>
  );
}
