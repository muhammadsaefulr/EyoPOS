import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"form"> {
  onGoogleSignIn?: () => void;
}

export function LoginForm({
  className,
  onGoogleSignIn,
  ...props
}: LoginFormProps) {

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
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
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button onClick={onGoogleSignIn} variant="outline" className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
  <path fill="#EA4335" d="M24 9.5c3.54 0 6.69 1.35 9.14 3.55l6.84-6.84C35.7 2.54 30.15 0 24 0 14.34 0 6.16 5.64 2.34 13.86l7.95 6.16C12.34 13.6 17.72 9.5 24 9.5z"/>
  <path fill="#4285F4" d="M46.45 24.55c0-1.74-.14-3.43-.41-5.05H24v9.58h12.62c-.55 2.98-2.18 5.54-4.65 7.22l7.33 5.67c4.34-4.02 6.85-9.95 6.85-17.42z"/>
  <path fill="#FBBC05" d="M8.29 28.11c-.59-1.75-.93-3.63-.93-5.61s.34-3.86.93-5.61L.34 10.73C-.62 13.03-1 15.63-1 18.5s.38 5.47 1.34 7.77l7.95-6.16z"/>
  <path fill="#34A853" d="M24 38.5c-4.65 0-8.8-1.54-12.09-4.15l-7.95 6.16C6.16 42.36 14.34 48 24 48c6.15 0 11.7-2.54 15.98-6.61l-7.33-5.67c-2.01 1.54-4.58 2.53-7.64 2.53z"/>
  <path fill="none" d="M0 0h48v48H0z"/>
</svg>
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}

