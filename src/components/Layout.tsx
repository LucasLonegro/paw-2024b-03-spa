import { Outlet } from "react-router-dom"
import { Navbar } from "@/components/NavBar"
import { Footer } from "@/components/Footer"

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}