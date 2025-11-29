import { NavLink, Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "transition-colors hover:text-primary",
    isActive ? "text-primary" : "text-muted-foreground",
  )

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b bg-card/80 backdrop-blur">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              B
            </span>
            <h1 className="text-lg font-semibold tracking-tight">
              Beneficios
            </h1>
          </NavLink>

          <nav className="flex items-center gap-4 text-sm font-medium">
            <NavLink to="/" className={navLinkClass}>
              Inicio
            </NavLink>

            <NavLink to="/login" className={navLinkClass}>
              Iniciar sesión
            </NavLink>

            <Button asChild size="sm" className="ml-2">
              <NavLink to="/login">Acceder</NavLink>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-muted-foreground flex justify-between items-center">
          <p>&copy; 2024 Beneficios. Todos los derechos reservados.</p>
          <span className="hidden sm:inline">
            Construido con React, Vite, Redux Toolkit y shadcn/ui
          </span>
        </div>
      </footer>
    </div>
  )
}

