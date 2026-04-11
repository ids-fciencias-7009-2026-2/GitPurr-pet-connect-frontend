import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PawPrint, Heart, Dog, Cat, Eye, EyeOff } from "lucide-react";
import { registro } from '../api/servicioUsuario';
import SolicitarCampo from '../componentes/SolicitarCampo';
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
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle"
                      style={{ position: 'absolute', right: '10px', top: '32px' }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
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