import { NavLink, Outlet } from "react-router-dom"
import styles from "./Layout.module.css"

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.container}>
          <NavLink to="/" className={styles.logo}>
            <h1>Beneficios</h1>
          </NavLink>
          <nav className={styles.nav}>
            <NavLink to="/" className={styles.navLink}>
              Inicio
            </NavLink>
            <NavLink to="/login" className={styles.navLink}>
              Iniciar Sesión
            </NavLink>
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

