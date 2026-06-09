import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./paginas/Login"
import Home from "./paginas/Home"
import Register from "./paginas/Register"
import Profile from "./paginas/Profile"
import Update from "./paginas/Update"
import ProtectedRoute from "./componentes/ProtectedRoute"
import RegisterAnimalito from "./paginas/RegisterAnimalito"
import MascotaPerfil from "./paginas/MascotaPerfil";
import MapaAnimalitos from "./paginas/MapaAnimalitos";
import Favoritos from "./paginas/Favoritos"
import Notificaciones from "./paginas/Notificaciones"
import MisPublicaciones from "./paginas/MisPublicaciones";
import MisIntereses from "./paginas/MisIntereses";

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

        <Route path="/mascota/:id" element={
          <ProtectedRoute>
            <MascotaPerfil />
          </ProtectedRoute>
        }/>

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }/>

        <Route
            path="/mis-publicaciones"
            element={
              <ProtectedRoute>
                <MisPublicaciones />
              </ProtectedRoute>
            }
        />

        <Route
            path="/mis-intereses"
            element={
              <ProtectedRoute>
                <MisIntereses />
              </ProtectedRoute>
            }
        />

        <Route path="/update" element={
          <ProtectedRoute>
            <Update />
          </ProtectedRoute>
        }/>

        <Route path="/animalitos/register" element={
          <ProtectedRoute>
            <RegisterAnimalito />
          </ProtectedRoute>
        }/>
        
        <Route path="/mapa" element={
          <ProtectedRoute>
              <MapaAnimalitos/>
          </ProtectedRoute>
        }/>

        <Route path="/favoritos" element={
          <ProtectedRoute>
              <Favoritos/>
          </ProtectedRoute>
        }/>

        <Route path="/notificaciones" element={
          <ProtectedRoute>
              <Notificaciones/>
          </ProtectedRoute>
        }/>

        <Route path="*" element={<Navigate to="/login" />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
