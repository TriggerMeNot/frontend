"use client"

import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { cn } from "@/lib/utils"
import { Icons } from "./icons"
import { Button } from "./button"
import { Input } from "./input"

import { LoginSchema, RegisterSchema, useAuth } from "@/contexts/AuthProvider"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  mode: "login" | "register"
}

function UserLoginAuthForm({ className, ...props }: UserAuthFormProps) {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  })

  const { loginWithUsernameAndPassword, isLoading } = useAuth();

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    loginWithUsernameAndPassword(data);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-1">
          <Input
            id="email"
            placeholder="john.doe@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            {...form.register("email")}
          />
          <p className="text-red-600">{form.formState.errors.email?.message}</p>
        </div>
        <div className="grid gap-1">
          <Input
            id="password"
            placeholder="Password"
            type="password"
            autoComplete="current-password"
            disabled={isLoading}
            {...form.register("password")}
          />
          <p className="text-red-600">{form.formState.errors.password?.message}</p>
        </div>
        <Button disabled={isLoading} className="w-full">
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign In with Email
        </Button>
      </form>
    </div>
  )
}

function UserRegisterAuthForm({ className, ...props }: UserAuthFormProps) {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  })

  const { registerWithUsernameAndPassword, isLoading } = useAuth();

  async function onSubmit(data: z.infer<typeof RegisterSchema>) {
    registerWithUsernameAndPassword(data);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-1">
          <Input
            id="email"
            placeholder="john.doe@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            {...form.register("email")}
          />
          <p className="text-red-600">{form.formState.errors.email?.message}</p>
        </div>
        <div className="grid gap-1">
          <Input
            id="username"
            placeholder="Username"
            type="text"
            autoComplete="username"
            disabled={isLoading}
            {...form.register("username")}
          />
        </div>
        <div className="grid gap-1">
          <Input
            id="password"
            placeholder="Password"
            type="password"
            autoComplete="new-password"
            disabled={isLoading}
            {...form.register("password")}
          />
          <p className="text-red-600">{form.formState.errors.password?.message}</p>
        </div>
        <div className="grid gap-1">
          <Input
            id="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            autoComplete="new-password"
            disabled={isLoading}
            {...form.register("confirmPassword")}
          />
          <p className="text-red-600">{form.formState.errors.confirmPassword?.message?.toString()}</p>
        </div>
        <Button disabled={isLoading} className="w-full">
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Register with Email
        </Button>
      </form>
    </div>
  )
}

export function UserAuthForm({ mode, className, ...props }: UserAuthFormProps) {
  const { isLoading, loginWithGithub, loginWithGoogle, loginWithMicrosoft, loginWithDiscord } = useAuth();

  return (
    <>
      {mode === "login" ? (
        <UserLoginAuthForm mode={"login"} className={className} {...props} />
      ) : (
        <UserRegisterAuthForm mode={"register"} className={className} {...props} />
      )}
      <Button
        disabled={isLoading}
        className="w-full"
        onClick={loginWithGithub}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}
        Sign In with GitHub
      </Button>
      <Button
        disabled={isLoading}
        className="w-full"
        onClick={loginWithGoogle}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Sign In with Google
      </Button>
      <Button
        disabled={isLoading}
        className="w-full"
        onClick={loginWithMicrosoft}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.microsoft className="mr-2 h-4 w-4" />
        )}
        Sign In with Microsoft
      </Button>
      <Button
        disabled={isLoading}
        className="w-full"
        onClick={loginWithDiscord}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.discord className="mr-2 h-4 w-4" />
        )}
        Sign In with Discord
      </Button>
    </>
  )
}
