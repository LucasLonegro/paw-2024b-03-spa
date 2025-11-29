import { Link } from "react-router-dom"
import { BenefitCard } from "../../components/BenefitCard/BenefitCard"
import { Button } from "@/components/ui/button"

// Datos de ejemplo para los beneficios
const benefits = [
  {
    id: 1,
    title: "Descuentos en Restaurantes",
    description: "Aprovecha descuentos exclusivos en los mejores restaurantes",
    icon: "🍽️",
    color: "#ff6b6b",
  },
  {
    id: 2,
    title: "Gimnasios y Fitness",
    description: "Acceso a gimnasios y clases de fitness con descuentos",
    icon: "💪",
    color: "#4ecdc4",
  },
  {
    id: 3,
    title: "Viajes y Turismo",
    description: "Ofertas especiales en hoteles y paquetes turísticos",
    icon: "✈️",
    color: "#45b7d1",
  },
  {
    id: 4,
    title: "Entretenimiento",
    description: "Descuentos en cines, teatros y eventos culturales",
    icon: "🎬",
    color: "#f9ca24",
  },
  {
    id: 5,
    title: "Salud y Bienestar",
    description: "Consultas médicas y tratamientos con precios especiales",
    icon: "🏥",
    color: "#6c5ce7",
  },
  {
    id: 6,
    title: "Educación",
    description: "Cursos y capacitaciones con descuentos exclusivos",
    icon: "📚",
    color: "#a29bfe",
  },
  {
    id: 7,
    title: "Tecnología",
    description: "Descuentos en dispositivos y accesorios tecnológicos",
    icon: "💻",
    color: "#00b894",
  },
  {
    id: 8,
    title: "Shopping",
    description: "Ofertas especiales en tiendas y marcas reconocidas",
    icon: "🛍️",
    color: "#e17055",
  },
]

export const Home = () => {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Bienvenido a tu Plataforma de Beneficios
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-primary-foreground/90">
            Descubre y aprovecha los mejores beneficios exclusivos para vos y tu
            equipo.
          </p>
          <div className="pt-2 flex justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/login">Iniciar sesión</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Grid de beneficios */}
      <section className="bg-muted/30 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              Nuestros beneficios
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Explorá nuestras categorías de beneficios disponibles.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {benefits.map(benefit => (
              <BenefitCard key={benefit.id} benefit={benefit} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


