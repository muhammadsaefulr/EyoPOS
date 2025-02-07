"use client"
import { GalleryVerticalEnd } from "lucide-react"
import { signIn } from "next-auth/react";

import { LoginForm } from "@/components/form/login-form"
import { Logo } from "@/components/logo"
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const searchParams = useSearchParams()

  const { toast } = useToast();

  const errorParams = searchParams.get("error");

  console.log(errorParams)

  if(errorParams === "AccessDenied"){
    toast({
      title: errorParams,
      description: "Email Kamu Tidak Terdaftar Di Database"
    })
  }

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

