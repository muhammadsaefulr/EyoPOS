"use client"
import { signIn } from "next-auth/react";

import { LoginForm } from "@/components/form/login-form"
import { Logo } from "@/components/logo"
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const searchParams = useSearchParams()

  const { toast } = useToast();

  const errorParams = searchParams.get("error");

  useEffect(() => {
    if(errorParams == "AccessDenied"){
      setTimeout(() => {
        toast({ variant: "destructive", title: "Unathorized", description: "Email Tidak Terdaftar Atau Password Salah"});
      }, 100);
    }
  }, [errorParams]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a className="flex items-center gap-2 font-medium">
            <Logo/>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm onGoogleSignIn={handleGoogleSignIn} />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://c4.wallpaperflare.com/wallpaper/179/915/685/photography-water-reflection-bali-wallpaper-preview.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

