"use client"

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Loader2, Shield, Lock, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const loginSchema = z.object({
  email: z.string().email({ message: "Ingrese un correo electrónico válido" }),
  password: z.string().min(1, { message: "La contraseña es requerida" }),
  rememberMe: z.boolean().optional(),
})

type LoginValues = z.infer<typeof loginSchema>

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/admin"
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl,
      })

      if (result?.error) {
        const errorMsg = "Credenciales inválidas. Por favor intente nuevamente.";
        setError(errorMsg);
        toast.error('Error de autenticación', {
          description: errorMsg
        });
      } else {
        toast.success('Sesión iniciada', {
          description: 'Bienvenido al panel de administración'
        });
        // We will let the middleware or client-side protection handle the role check redirect
        // Ideally, we'd check the session here, but signIn returns a status, not the user object directly.
        // For now, we assume successful login redirects to /admin, which should be protected.
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (err) {
      const errorMsg = "Ocurrió un error inesperado. Intente más tarde.";
      setError(errorMsg);
      toast.error('Error del sistema', {
        description: errorMsg
      });
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="rounded-full bg-slate-800 p-3 mb-2">
            <Shield className="h-10 w-10 text-indigo-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Panel de Administración
          </h1>
          <p className="text-slate-400">
            Tienda de Vinilos
          </p>
        </div>

        <Card className="border-slate-800 bg-slate-900 text-slate-200 shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center text-slate-400">
              Acceso restringido a personal autorizado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium leading-none text-slate-300" htmlFor="email">
                    Correo Corporativo
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      placeholder="admin@tiendavinilos.cl"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      className="bg-slate-950 border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20 text-slate-200 pl-10"
                      {...register("email")}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Shield className="h-4 w-4" />
                    </div>
                  </div>
                  {errors.email && (
                    <p className="text-xs text-rose-500 font-medium">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium leading-none text-slate-300" htmlFor="password">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="current-password"
                      disabled={isLoading}
                      className="bg-slate-950 border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20 text-slate-200 pl-10"
                      {...register("password")}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Lock className="h-4 w-4" />
                    </div>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-rose-500 font-medium">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-indigo-500 focus:ring-indigo-500/20"
                    {...register("rememberMe")}
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-sm font-medium leading-none text-slate-400 select-none cursor-pointer"
                  >
                    Mantener sesión iniciada
                  </label>
                </div>
              </div>

              {error && (
                <div className="bg-rose-950/30 border border-rose-900/50 text-rose-400 text-sm p-3 rounded-md flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <Button 
                disabled={isLoading} 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white border-0 shadow-lg shadow-indigo-500/20"
              >
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isLoading ? "Verificando..." : "Ingresar al Sistema"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-slate-800 py-4 bg-slate-900/50 rounded-b-lg">
            <p className="text-xs text-slate-500 text-center">
              Sistema de Gestión Interna v1.0 <br/>
              &copy; {new Date().getFullYear()} Tienda de Vinilos
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
