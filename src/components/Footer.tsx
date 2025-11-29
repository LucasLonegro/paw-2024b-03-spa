import { Link } from "react-router-dom"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-primary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">V</span>
              </div>
              <span className="font-semibold">Venta</span>
            </div>
            <p className="text-sm opacity-75">Plataforma moderna para gestionar tu negocio con facilidad.</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm opacity-75">
              <li>
                <Link to="/" className="hover:opacity-100 transition-opacity">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/productos" className="hover:opacity-100 transition-opacity">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/sobre-nosotros" className="hover:opacity-100 transition-opacity">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:opacity-100 transition-opacity">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm opacity-75">
              <li>
                <a href="/privacy" className="hover:opacity-100 transition-opacity">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:opacity-100 transition-opacity">
                  Términos de servicio
                </a>
              </li>
              <li>
                <a href="/cookies" className="hover:opacity-100 transition-opacity">
                  Política de cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-center text-sm opacity-75">© {currentYear} Venta. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
