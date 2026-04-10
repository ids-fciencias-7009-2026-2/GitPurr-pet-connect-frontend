import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./paginas/Login"
import Home from "./paginas/Home"
import Register from "./paginas/Register"
import Profile from "./paginas/Profile"
import Update from "./paginas/Update"
import ProtectedRoute from "./componentes/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* públicas */}
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>

        {/* protegidas */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }/>

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }/>

        <Route path="/update" element={
          <ProtectedRoute>
            <Update />
          </ProtectedRoute>
        }/>

        <Route path="*" element={<Navigate to="/login" />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
