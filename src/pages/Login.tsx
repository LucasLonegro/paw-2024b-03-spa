import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import { LoginCredentials, loginSchema } from "@/features/auth/loginSchema"
import { useLogin } from "@/features/auth/useLogin"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const loginMutation = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  })

  const onSubmit = async (values: LoginCredentials) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        navigate("/")
      },
      onError: (error) => {
        console.error("Error en login:", error)
      },
    })
  }

  return (
    <div className="bg-gradient-to-br from-background via-slate-950/5 to-background flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <Card className="border border-border/60 shadow-lg bg-card/95 backdrop-blur">
          <CardHeader className="space-y-2 text-center pb-5">
            <div className="flex justify-center mb-3">
              <div className="w-11 h-11 bg-gradient-to-br from-primary via-sky-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-primary-foreground font-bold text-xl">V</span>
              </div>
            </div>
            <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
            <CardDescription className="text-muted-foreground">
              Accede a tu cuenta para continuar
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Username or Email Input */}
              <div className="space-y-2">
                <Label htmlFor="usernameOrEmail">Usuario o Email</Label>
                <Input
                  id="usernameOrEmail"
                  type="text"
                  placeholder="usuario o tu@email.com"
                  className="h-11"
                  {...register("usernameOrEmail")}
                />
                {errors.usernameOrEmail && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.usernameOrEmail.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:underline underline-offset-4 transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-11 pr-10"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.password.message}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {loginMutation.error && (
                <div className="text-sm text-destructive bg-destructive/10 border border-destructive/40 p-3 rounded-lg">
                  {loginMutation.error instanceof Error
                    ? loginMutation.error.message
                    : "Ocurrió un error al iniciar sesión. Intenta nuevamente."}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 font-medium"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Iniciando..." : "Iniciar sesión"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">O</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">¿No tienes cuenta? </span>
              <Link to="/signup" className="text-primary font-semibold hover:underline transition-colors">
                Regístrate aquí
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Additional Links */}
        <div className="text-center mt-5 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Volver a inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
