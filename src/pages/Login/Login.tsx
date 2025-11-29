import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginSuccess } from "../../features/auth/authSlice"
import { Button } from "@/components/ui/button"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api"
      const loginEndpoint =
        import.meta.env.VITE_LOGIN_ENDPOINT || "/auth/login"

      const response = await fetch(`${apiUrl}${loginEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.message || `Error ${response.status}: ${response.statusText}`,
        )
      }

      // Extraer el token del header Authorization
      const authHeader =
        response.headers.get("authorization") ||
        response.headers.get("Authorization")

      if (!authHeader) {
        throw new Error("No se recibió token de autenticación")
      }

      // Extraer el token (puede venir como "Bearer <token>" o solo "<token>")
      let token = authHeader
      if (token.startsWith("Bearer ")) {
        token = token.substring(7)
      }

      // Intentar obtener el usuario del body (debería venir en la respuesta)
      const data = await response.json().catch(() => ({}))
      const user = data.user
      if (!user) {
        throw new Error("No se recibió información de usuario")
      }

      // Guardar en Redux usando la acción loginSuccess
      dispatch(
        loginSuccess({
          token,
          user,
        }),
      )

      // Redirigir al home después del login exitoso
      navigate("/")
    } catch (err: unknown) {
      // Manejar errores
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Error inesperado. Intenta nuevamente.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="rounded-xl border bg-card text-card-foreground shadow-lg p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Iniciar sesión
            </h1>
            <p className="text-sm text-muted-foreground">
              Accede a tu cuenta para disfrutar de todos los beneficios
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>

          <div className="pt-2 text-center text-xs text-muted-foreground space-y-2">
            <p>
              ¿No tienes cuenta?{" "}
              <a
                href="#"
                className="font-medium text-primary hover:underline underline-offset-4"
              >
                Regístrate aquí
              </a>
            </p>
            <a
              href="#"
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

