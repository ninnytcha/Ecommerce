import { Navigate, Route, Routes } from "react-router-dom"
import { Auth } from "./pages/Auth"
import { HomePage } from "./pages/HomePage"
import ProductDetail from "./pages/ProductDetail"
import { Cart } from "./pages/Cart"
import { Navbar } from "./components/Navbar"
import Register from "./pages/Register"

function PrivateRoute ({children}) {
  const token = localStorage.getItem("token")
  return token? children: <Navigate to="/login" replace/>
}

function PublicRoute ({children}) {
  const token = localStorage.getItem("token")
  return !token? children: <Navigate to="/" replace/>
}

function App() {
  const token = localStorage.getItem("token")
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/auth/login" element={<Auth/>}/>
      <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>}/>
      <Route path="/product/:id" element={<PrivateRoute><ProductDetail/></PrivateRoute>}/>
      <Route path="/cart" element={<PrivateRoute><Cart/></PrivateRoute>}/>
      <Route path="/auth/register" element={<Register/>}/>
    </Routes>
    
    </>
  )
}

export default App
