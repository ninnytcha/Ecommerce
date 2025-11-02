import { Navigate, Route, Routes } from "react-router-dom"
import { Auth } from "./pages/Auth"
import { HomePage } from "./pages/HomePage"
import ProductDetail from "./pages/ProductDetail"
import { Cart } from "./pages/Cart"
import { Navbar } from "./components/Navbar"
import Register from "./pages/Register"
import { useEffect, useState } from "react"
import { Dashboard } from "./pages/admin/Dashboard"
import { CreateProduct } from "./pages/admin/CreateProduct"

function PrivateRoute ({children}) {
  const token = localStorage.getItem("token")
  return token? children: <Navigate to="/auth/login" replace/>
}

function PublicRoute ({children}) {
  const token = localStorage.getItem("token")
  return !token? children: <Navigate to="/" replace/>
}

function App() {
  const [profile, setProfile] = useState(null)
  const token = localStorage.getItem("token")
  useEffect(()=> {

    if (!token) {
      setProfile(null)
    }
    const fetchUserProfile = async () => {
    const token = localStorage.getItem("token")
    const response = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
        method: "GET",
        headers: { "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
         },
    })
    if (response.status === 400) {
        localStorage.removeItem("token")
        localStorage.removeItem("refresh-token")
        window.location.href = "/auth/login"
    }
    const data = await response.json()
    setProfile(data)
  }
fetchUserProfile()
  }, [token])
   
  return (
    <>
    <Navbar profile={profile}/>
    <Routes>
      <Route path="/auth/login" element={<Auth/>}/>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/product/:id" element={<ProductDetail/>}/>
      <Route path="/cart" element={<PrivateRoute><Cart/></PrivateRoute>}/>
      <Route path="/auth/register" element={<Register/>}/>
      <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
      <Route path="/dashboard/product-create" element={<PrivateRoute><CreateProduct/></PrivateRoute>}/>
    </Routes>
    
    </>
  )
}

export default App
