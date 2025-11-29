import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance bg-gradient-to-r from-primary via-sky-500 to-emerald-500 bg-clip-text text-transparent">
            Bienvenido a Venta
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Una plataforma moderna y minimalista diseñada para simplificar la gestión de tu negocio. Todo lo que
            necesitas en un solo lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button size="lg" asChild>
              <Link to="/productos">Explorar productos</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contacto">Contáctanos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto bg-muted/40 rounded-3xl">
        <div className="space-y-12">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">Características</h2>
            <p className="text-lg text-muted-foreground">Todo lo que necesitas para tener éxito</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Simple y rápido",
                description: "Interfaz intuitiva que cualquiera puede usar sin capacitación.",
              },
              {
                title: "Seguro",
                description: "Tus datos están protegidos con los estándares de seguridad más altos.",
              },
              {
                title: "Escalable",
                description: "Crece con tu negocio sin preocupaciones técnicas.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border/70 hover:border-primary shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-primary via-sky-600 to-emerald-500 text-primary-foreground rounded-2xl p-12 text-center space-y-6 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold">¿Listo para comenzar?</h2>
          <p className="text-lg opacity-95 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya confían en nosotros para gestionar sus negocios.
          </p>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="bg-background text-foreground hover:bg-background/90"
          >
            <Link to="/signup">Crear cuenta gratis</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
