import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PawPrint, Heart, Dog, Cat, Eye, EyeOff, Mail, User, Lock } from "lucide-react";
import { registro } from '../api/servicioUsuario';
import SolicitarCampo from '../componentes/SolicitarCampo';
import '../estilos/paginas/Register.css';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    nombre: null,
    correo: null,
    password: null,
    general: null,
  })
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const validate = () => {
    const newErrors = {
      nombre: null,
      correo: null,
      password: null,
      general: null,
    }

    if(nombre.trim().length === 0) {
      newErrors.nombre = 'Por favor ingresa un nombre válido'
    }

    if(!emailRegex.test(correo)) {
      newErrors.correo = 'Por favor ingresa un correo válido'
    }

    if(password.trim().length === 0) {
      newErrors.password = 'Por favor ingresa una contraseña válida'
    }

    setErrors(newErrors)
    return Object.values(newErrors).every(error => error === null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMensaje('');

    if(!validate()) {
      setIsSubmitting(false);
      return
    }

    try {
      // Usamos la función de la API
      await registro({
        nombre: nombre,
        email: correo,
        password: password
      });

      setMensaje('¡Registro exitoso! Redirigiendo al login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      setMensaje('Error al registrar usuario. Verifica los datos.');
      console.error("Error en registro:", error);
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

              {/* Campos reutilizables */}
              <div className="form-group">
                <SolicitarCampo
                  id="nombre"
                  etiqueta="Nombre de usuario"
                  tipo="text"
                  placeholder="Tu nombre de usuario"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  error={errors.nombre}
                  icono={<User size={20} />}
                />
              </div>

              <div className="form-group">
                <SolicitarCampo
                  id="correo"
                  etiqueta="Correo electrónico"
                  tipo="email"
                  placeholder="tu@correo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  error={errors.correo}
                  icono={<Mail size={20} />}
                />
              </div>

              <div className="form-group" style={{ position: 'relative' }}>
                <SolicitarCampo
                  id="password"
                  etiqueta="Contraseña"
                  tipo={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  icono={<Lock size={20} />}
                  togglePassword={() => setShowPassword(!showPassword)}
                />
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