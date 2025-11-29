import { Link } from "react-router-dom"
import { BenefitCard } from "../../components/BenefitCard/BenefitCard"
import styles from "./Home.module.css"

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
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Bienvenido a tu Plataforma de Beneficios
          </h1>
          <p className={styles.heroDescription}>
            Descubre y aprovecha los mejores beneficios exclusivos para ti
          </p>
          <Link to="/login" className={styles.ctaButton}>
            Iniciar Sesión
          </Link>
        </div>
      </section>

      <section className={styles.benefitsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Nuestros Beneficios</h2>
          <p className={styles.sectionDescription}>
            Explora nuestras categorías de beneficios disponibles
          </p>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit) => (
              <BenefitCard key={benefit.id} benefit={benefit} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

