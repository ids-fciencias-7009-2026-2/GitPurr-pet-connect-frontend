import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./paginas/Login"
import Home from "./paginas/Home"
import Register from "./paginas/Register"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="*" element={<Navigate to="/login" />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App