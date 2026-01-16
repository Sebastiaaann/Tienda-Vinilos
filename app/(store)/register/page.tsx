"use client"

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { Loader2, Music, CheckCircle2, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { registerSchema, RegisterFormValues } from "@/lib/schemas/auth-schemas"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      terms: false
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    setIsLoading(true)
    setError(null)

    try {
      // 1. Register user
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || "Error al registrar usuario")
      }

      toast.success('Cuenta creada exitosamente', {
        description: 'Bienvenido a Tienda de Vinilos'
      });

      // 2. Auto login
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (result?.error) {
        // Fallback if auto-login fails, redirect to login page
        toast.info('Por favor inicia sesión', {
          description: 'Tu cuenta fue creada. Ahora puedes iniciar sesión.'
        });
        router.push("/login?registered=true")
      } else {
        router.push("/")
        router.refresh()
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Ocurrió un error inesperado. Intente más tarde.";
      setError(errorMessage);
      toast.error('Error al crear cuenta', {
        description: errorMessage
      });
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container relative flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 min-h-[calc(100vh-4rem)]">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Music className="mr-2 h-6 w-6" />
          Tienda Vinilos
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Coleccionar vinilos no es solo comprar música; es preservar momentos, arte y sentimientos en un formato tangible.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Crear una cuenta
            </h1>
            <p className="text-sm text-muted-foreground">
              Únete a nuestra comunidad de amantes del vinilo
            </p>
          </div>

          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <div className="grid gap-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="name">
                      Nombre completo
                    </label>
                    <Input
                      id="name"
                      placeholder="Juan Pérez"
                      autoComplete="name"
                      disabled={isLoading}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="grid gap-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                      Correo electrónico
                    </label>
                    <Input
                      id="email"
                      placeholder="nombre@ejemplo.com"
                      type="email"
                      autoComplete="email"
                      disabled={isLoading}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-1">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                        Contraseña
                      </label>
                      <Input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        disabled={isLoading}
                        {...register("password")}
                      />
                      {errors.password && (
                        <p className="text-xs text-destructive">{errors.password.message}</p>
                      )}
                    </div>
                    <div className="grid gap-1">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="confirmPassword">
                        Confirmar
                      </label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        disabled={isLoading}
                        {...register("confirmPassword")}
                      />
                      {errors.confirmPassword && (
                        <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground mt-1">
                    La contraseña debe tener al menos 8 caracteres.
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <input
                      id="terms"
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      {...register("terms")}
                      disabled={isLoading}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Acepto los <Link href="/terms" className="underline hover:text-primary">términos y condiciones</Link>
                      </label>
                      {errors.terms && (
                        <p className="text-xs text-destructive">{errors.terms.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <p>{error}</p>
                  </div>
                )}

                <Button disabled={isLoading} className="w-full">
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Crear cuenta
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center px-0 pt-4">
              <div className="text-sm text-muted-foreground">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Inicia sesión
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
