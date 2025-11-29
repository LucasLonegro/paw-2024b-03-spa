import { Link, Outlet } from "react-router-dom"
import styles from "./Layout.module.css"

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            <h1>Beneficios</h1>
          </Link>
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>
              Inicio
            </Link>
            <Link to="/login" className={styles.navLink}>
              Iniciar Sesión
            </Link>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; 2024 Beneficios. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

