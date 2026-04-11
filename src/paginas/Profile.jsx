import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { me, update } from "../api/servicioUsuario";
import { User, Mail, Lock, Camera, Heart, ShieldCheck, KeyRound } from "lucide-react"; 
import "../estilos/paginas/Profile.css"; 

function Profile() {
  const [usuario, setUsuario] = useState({ nombre: "", email: "", passwordOld: "", passwordNew: "" });
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const [cargando, setCargando] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const datos = await me();
        setUsuario({ nombre: datos.nombre, email: datos.email, passwordOld: "", passwordNew: "" });
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
        setMensaje({ texto: "Error al cargar tu información. Verifica tu sesión.", tipo: "error" });
      } finally {
        setCargando(false);
      }
    };
    cargarPerfil();
  }, []);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ texto: "Guardando cambios...", tipo: "info" });

    try {
      const datosActualizados = {
        nombre: usuario.nombre,
        email: usuario.email,
      };
      
      if (usuario.passwordNew.trim() !== "") {
        if (usuario.passwordOld.trim() === "") {
           setMensaje({ texto: "Debes ingresar tu contraseña actual para poder cambiarla.", tipo: "error" });
           return; 
        }
        datosActualizados.passwordNew = usuario.passwordNew;
        datosActualizados.passwordOld = usuario.passwordOld;
      }

      const respuesta = await update(datosActualizados);
      
      setMensaje({ texto: "¡Perfil actualizado con éxito! Redirigiendo al inicio...", tipo: "exito" });
      
      setUsuario({ nombre: respuesta.nombre, email: respuesta.email, passwordOld: "", passwordNew: "" }); 

      setTimeout(() => {
        navigate("/home");
      }, 1500);

    } catch (error) {
      console.error("Error al actualizar:", error);
      if (error.response && error.response.status === 403) {
         setMensaje({ texto: "La contraseña actual es incorrecta. Inténtalo de nuevo.", tipo: "error" });
      } else {
         setMensaje({ texto: "Hubo un error al intentar guardar los cambios.", tipo: "error" });
      }
    }
  };

  if (cargando) return <div className="profile-loading">Cargando tu perfil...</div>;

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        
        {/* PANEL IZQUIERDO */}
        <div className="profile-sidebar">
          <div className="profile-avatar-container">
            <img 
              src="/recursos/imagenes/usuario-navbar.png" 
              alt="Avatar" 
              className="profile-avatar"
            />
            <button className="avatar-edit-btn" title="Cambiar foto">
              <Camera size={18} />
            </button>
          </div>
          <h3 className="sidebar-name">{usuario.nombre || "Usuario PetConnect"}</h3>
          <p className="sidebar-role">
            <Heart size={16} color="#e74c3c" fill="#e74c3c" /> Amante de las mascotas
          </p>
          <div className="sidebar-stats">
            <div className="stat-item">
              <ShieldCheck size={20} className="stat-icon" />
              <span>Cuenta Verificada</span>
            </div>
          </div>
        </div>

        {/* PANEL DERECHO */}
        <div className="profile-content">
          <h2 className="profile-title">Configuración de Cuenta</h2>
          <p className="profile-subtitle">Actualiza tu información personal y de seguridad.</p>
          
          {mensaje.texto && (
            <div className={`profile-alert ${mensaje.tipo}`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo</label>
              <div className="input-with-icon">
                <User className="input-icon" size={20} />
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={usuario.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <div className="input-with-icon">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={usuario.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* SECCIÓN DE SEGURIDAD */}
            <div style={{ marginTop: "10px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px dashed #ced4da" }}>
                <h4 style={{ margin: "0 0 15px 0", color: "#34495e", fontSize: "15px" }}>Cambio de Contraseña <span className="opcional">(Opcional)</span></h4>
                
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label htmlFor="passwordOld">Contraseña Actual</label>
                  <div className="input-with-icon">
                    <KeyRound className="input-icon" size={20} />
                    <input
                      type="password"
                      id="passwordOld"
                      name="passwordOld"
                      value={usuario.passwordOld}
                      onChange={handleChange}
                      placeholder="Requerida si deseas cambiarla"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="passwordNew">Nueva Contraseña</label>
                  <div className="input-with-icon">
                    <Lock className="input-icon" size={20} />
                    <input
                      type="password"
                      id="passwordNew"
                      name="passwordNew"
                      value={usuario.passwordNew}
                      onChange={handleChange}
                      placeholder="Escribe tu nueva contraseña"
                    />
                  </div>
                </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="profile-button">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Profile;
