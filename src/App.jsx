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
import { fetchUserProfile } from "./api/user"
import { NotFound } from "./pages/NotFound404"
import { Products } from "./pages/admin/Products"
import { UserList } from "./pages/admin/UsersList"
import { CreateUser } from "./pages/admin/CreateUser"
import { CategoryPage } from "./pages/CategoryPage"

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
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token")
  useEffect(()=> {

    if (!token) {
      setProfile(null)
    }
    const fetchUser = async () => {
      try {
      setProfile(await fetchUserProfile())
    } catch {
      console.error("error in fetching user")
    } finally {
      setLoading(false)
    }}
    fetchUser()
    
  }, [token])
  
  if (loading) {
    return (
      <><span>Loading...</span></>
    )
  }
   function AdminRoute ({children}) {
    console.log(profile)
  if (token && profile?.role == "admin") {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }}
  return (
    <>
    <Navbar profile={profile}/>
    <Routes>
      <Route path="/auth/login" element={<Auth/>}/>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/product/:id" element={<ProductDetail/>}/>
      <Route path="/cart" element={<PrivateRoute><Cart/></PrivateRoute>}/>
      <Route path="/auth/register" element={<Register/>}/>
      <Route path="/dashboard" element={<AdminRoute><Dashboard/></AdminRoute>}/>
      <Route path="/dashboard/users" element={<AdminRoute><UserList/></AdminRoute>}/>
      <Route path="/dashboard/product-create" element={<AdminRoute><CreateProduct/></AdminRoute>}/>
      <Route path="/dashboard/products" element={<AdminRoute><Products/></AdminRoute>}/>
      <Route path="*" element={<NotFound/>}/>
      <Route path="/dashboard/user-create" element={<AdminRoute><CreateUser/></AdminRoute>}/>
      <Route path="/productsbycategory/:id" element={<CategoryPage/>}/>
    </Routes>
    
    </>
  )
}

export default App
