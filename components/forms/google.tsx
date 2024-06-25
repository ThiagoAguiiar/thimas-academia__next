"use client";

import React from "react";

import { GoogleLogo } from "../svg/google-logo";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "../ui/button";

export function Google() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const supabase = createClientComponentClient();

  const handleClick = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          redirectTo: `${location.origin}/api/auth/callback`,
        },
      });
    } catch (err) {
      console.error("Ocorreu um erro ao logar: " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      loading={loading}
      className="justify-center gap-x-2 text-[15px] gap-x-2 border w-full  bg-white text-black hover:bg-[#f8fafc] border-[#c7c7c7]"
      onClick={handleClick}
    >
      <GoogleLogo />
      Entrar com o Google
    </Button>
  );
}
