import { Button } from "@/components/ui/button"
import { UserAuthForm } from "@/components/ui/user-auth-form"
import { Link } from "react-router-dom"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/contexts/AuthProvider"
import { Input } from "@/components/ui/input"

function Login() {
  const [mode, setMode] = useState<"login" | "register">("login")
  const { backendAddress, setBackendAddress } = useAuth();

  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute right-8 top-8 md:top-16 flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Backend address"
            value={backendAddress}
            onChange={(e) => setBackendAddress(e.target.value)}
            className="w-40 hidden md:block"
          />
          <Button
            variant="ghost"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Register" : "Login"}
          </Button>
          <ThemeToggle />
        </div>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img
              src="/favicon-32x32.png"
              alt="AREA"
              className="h-6 w-6 mr-2"
            />
            AREA
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;I should have lead Apple the same way AREA is being lead&rdquo;
              </p>
              <footer className="text-sm">Steve Jobless</footer>
            </blockquote>
          </div>
        </div>
        <div className="p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {mode === "login" ? "Welcome back" : "Create an account"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {mode === "login"
                  ? "Enter your email to sign in"
                  : "Enter your email below to create your account"}
              </p>
            </div>
            <Input
              type="text"
              placeholder="Backend address"
              value={backendAddress}
              onChange={(e) => setBackendAddress(e.target.value)}
              className="w-full block md:hidden"
            />
            <UserAuthForm mode={mode} />
            <p className="px-8 text-center text-sm text-muted-foreground">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setMode("register")}
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Sign up
                  </button>
                  .
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Sign in
                  </button>
                  .
                </>
              )}
            </p>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
