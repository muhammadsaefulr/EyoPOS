"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import Image from "next/image";
import { useState } from "react";
import { LoaderCircle } from "lucide-react"

interface LoginFormProps extends React.ComponentPropsWithoutRef<"form"> {
  onGoogleSignIn?: () => void;
}

export function LoginForm({
  className,
  onGoogleSignIn,
  ...props
}: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (type: "google" | "email") => {
    setIsLoading(true);

    if (type === "google" && onGoogleSignIn) {
      onGoogleSignIn();
    }
    

  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Login untuk akses dashboard eyopos
        </p>
      </div>
      {/* <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button  type="submit" className="w-full">
          Login
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div> */}
        <Button onClick={() => handleSignIn("google")} disabled={isLoading} variant="outline" className="w-full">
          {isLoading ? (
            <LoaderCircle className="w-5 h-5 animate-spin text-gray-600" />
          ) : (
            <div className="flex items-center gap-2">
              <Image width={15} height={15} src="/google.svg" alt="Google" />
              <span>Login with Google</span>
            </div>
          )}
        </Button>
      {/* </div> */}
    </form>
  )
}
