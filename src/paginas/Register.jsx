import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { PawPrint, Heart, Dog, Cat, Eye, EyeOff, Mail, User, Lock } from "lucide-react";
import '../estilos/paginas/Register.css';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMensaje('');

    try {
      const response = await axios.post('http://localhost:8080/usuarios/register', {
        nombre: nombre,
        email: correo,
        password: password
      });

      if (response.status === 200 || response.status === 201) {
        setMensaje('¡Registro exitoso! Redirigiendo al login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setMensaje('Error al registrar usuario. Verifica los datos.');
      console.error("Error en Axios:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Fondo decorativo */}
      <div className="decoraciones-fondo">
        <PawPrint className="icono-fondo paw-1" />
        <Heart className="icono-fondo heart-1" />
        <Dog className="icono-fondo dog-1" />
        <Cat className="icono-fondo cat-1" />
      </div>

      <main className="register-container">

        {/* Header */}
        <div>
          <img
            src="/recursos/imagenes/pet-shop.png"
            alt="Logo Pet Connect"
            className="register-logo"
          />
          <h1 className="register-title">Encuentra a tu compañero perfecto</h1>
          <p className="register-subtitle">
            Miles de mascotas esperan un hogar amoroso. Regístrate y comienza tu búsqueda hoy.
          </p>
        </div>

        {/* Formulario (Card) */}
        <div className="register-card">
          <div className="register-card-bar"></div>

          <div className="register-card-body">
            <div className="register-icon-container">
              <PawPrint size={32} />
            </div>
            <h2 className="card-title">Únete a PetConnect</h2>
            <p className="card-subtitle">Crea tu cuenta y encuentra a tu nuevo mejor amigo</p>

            <form onSubmit={handleSubmit}>

              {/* Input Nombre */}
              <div className="form-group">
                <label>Nombre de usuario</label>
                <div className="input-wrapper">
                  <User className="input-icon" />
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre de usuario"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              {/* Input Correo */}
              <div className="form-group">
                <label>Correo electrónico</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="tu@correo.com"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              {/* Input Contraseña */}
              <div className="form-group">
                <label>Contraseña</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Mensaje de éxito/error */}
              {mensaje && (
                <div className={`mensaje-alerta ${mensaje.includes('exitoso') ? 'mensaje-exito' : 'mensaje-error'}`}>
                  {mensaje}
                </div>
              )}

              {/* Botón Submit */}
              <button type="submit" disabled={isSubmitting} className="btn-submit">
                {isSubmitting ? (
                  <>
                    <PawPrint className="animate-spin" size={20} />
                    Creando cuenta...
                  </>
                ) : (
                  <>
                    <Heart size={20} />
                    Registrarse
                  </>
                )}
              </button>

              <div className="login-link">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;