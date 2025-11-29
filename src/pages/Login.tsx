"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validación básica
    if (!email || !password) {
      setError("Por favor completa todos los campos")
      return
    }

    if (!email.includes("@")) {
      setError("Por favor ingresa un email válido")
      return
    }

    // Simulación de login exitoso
    console.log("Login attempt with:", { email, password })
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-950/5 to-background flex items-center justify-center px-4 pt-16">
      <div className="w-full max-w-md">
        <Card className="border border-border/60 shadow-lg bg-card/95 backdrop-blur">
          <CardHeader className="space-y-3 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary via-sky-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-primary-foreground font-bold text-xl">V</span>
              </div>
            </div>
            <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
            <CardDescription className="text-muted-foreground">
              Accede a tu cuenta para continuar
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
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
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="h-11 pr-10"
                  />
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
              {error && (
                <div className="text-sm text-destructive bg-destructive/10 border border-destructive/40 p-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full h-11 font-medium">
                Iniciar sesión
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
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Volver a inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
