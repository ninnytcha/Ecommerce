import { Navigate, Route, Routes } from "react-router-dom"
import { Auth } from "./pages/Auth"
import { HomePage } from "./pages/HomePage"

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
    <Routes>
      <Route path="/login" element={<PublicRoute><Auth/></PublicRoute>}/>
      <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>}/>

    </Routes>
    
    </>
  )
}

export default App
