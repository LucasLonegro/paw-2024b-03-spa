import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">V</span>
            </div>
            <span className="font-semibold text-lg hidden sm:inline">Venta</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Inicio
            </Link>
            <Link to="/productos" className="text-foreground hover:text-primary transition-colors">
              Productos
            </Link>
            <Link to="/sobre-nosotros" className="text-foreground hover:text-primary transition-colors">
              Sobre nosotros
            </Link>
            <Link to="/contacto" className="text-foreground hover:text-primary transition-colors">
              Contacto
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link to="/login">Iniciar sesión</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Registrarse</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link to="/" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors">
              Inicio
            </Link>
            <Link
              to="/productos"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              Productos
            </Link>
            <Link
              to="/sobre-nosotros"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              Sobre nosotros
            </Link>
            <Link
              to="/contacto"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              Contacto
            </Link>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link to="/login">Iniciar sesión</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link to="/signup">Registrarse</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
