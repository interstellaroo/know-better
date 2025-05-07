import TopNavbar from "@/components/TopNavbar"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div>
      <TopNavbar />
      <main className="flex justify-center py-10 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
