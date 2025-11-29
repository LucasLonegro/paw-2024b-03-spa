import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "../../features/auth/authSlice"
import styles from "./Login.module.css"

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

      // Intentar obtener el usuario del body (opcional)
      const data = await response.json().catch(() => ({}))
      const user = data.user || null

      // Guardar en Redux usando la acción setCredentials
      dispatch(
        setCredentials({
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
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1 className={styles.title}>Iniciar Sesión</h1>
          <p className={styles.subtitle}>
            Accede a tu cuenta para disfrutar de todos los beneficios
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="••••••••"
                required
              />
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              ¿No tienes cuenta?{" "}
              <a href="#" className={styles.link}>
                Regístrate aquí
              </a>
            </p>
            <a href="#" className={styles.forgotPassword}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

