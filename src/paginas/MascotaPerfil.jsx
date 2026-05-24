import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaMapPin } from "react-icons/fa6";
import { Heart, MapPin, Calendar, Tag, HouseHeart, ShieldCheck, X, ArrowBigDown } from "lucide-react";
import { obtenerAnimalitoPorId, expresarInteres } from "../api/servicioAnimalito";
import { me, logout } from "../api/servicioUsuario";
import Navbar from "../componentes/Navbar";
import "../estilos/paginas/MascotaPerfil.css";

function MascotaPerfil() {

  const { id } = useParams();
  const [mascota, setMascota] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [confirmacionAbierta, setConfirmacionAbierta] = useState(false);
  const [resultado, setResultado] = useState(null);

  const [usuario, setUsuario] = useState(null);

  const navigate = useNavigate();

  /* encontramos a la mascota por su ID */
  useEffect(() => {
    const cargarMascota = async () => {
      try {
        const data = await obtenerAnimalitoPorId(id);
        setMascota(data);

        const usuarioActual = await me();
        setUsuario(usuarioActual);
      } catch (error) {
        console.error("Error al cargar mascota:", error);

        if (error.response?.status === 401) {
          sessionStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
    };

    cargarMascota();
  }, [id]);

  const logoutHandler = async () => {
    await logout
    navigate("/login");
  }

  if (!mascota) return <p className="mascota-loading">Cargando...</p>;

  /* Imagen de la mascota */
  const imagen = mascota.fotoUrl || "/recursos/imagenes/default.jpg";

  const datosMascota = () => navigate("/mapa", {
    state: {
      coordenadas: [
        mascota.latitudAprox,
        mascota.longitudAprox
      ],
      mascotaSeleccionada: mascota
    }
  })

return (
  <>
    <Navbar usuario={usuario} onLogout={logoutHandler} />

    <div className="mascota-container">
      <div className="mascota-wrapper">

        {/* sidebar */}
        <div className="mascota-sidebar">

          <div className="seccion-galeria">
            <h3 className="titulo-galeria"> Foto de {mascota.nombre} <ArrowBigDown size={16} color="#e74c3c" /> </h3>

            <div
              className="mascota-avatar-container"
              onClick={() => setModalAbierto(true)}
            >
              <img
                src={imagen}
                alt={mascota.nombre}
                className="mascota-avatar"
              />
            </div>
          </div>

          <h2 className="nombre-sidebar">{mascota.nombre}</h2>

          <p className="sidebar-role">
            <HouseHeart size={20} color="#e74c3c" />
            Buscando un hogar
          </p>

          <div className="sidebar-tags">
            <span className="tag-chip">{mascota.especie}</span>
            <span className="tag-chip">{mascota.sexo}</span>
            <span className="tag-chip">{mascota.tamano}</span>
          </div>

        </div>

        {/* contenido */}
        <div className="contenido-mascota">

          <h1 className="titulo-mascota">
            Conoce a {mascota.nombre}
          </h1>

          <p className="subtitulo-mascota">
            Información general y detalles sobre {mascota.nombre}.
          </p>

          <div className="mascota-info-grid">

            <div className="info-tarjeta">
              <div className="info-header">
                <MapPin size={18} />
                <h3>Código postal</h3>
              </div>
              <p>{mascota.codigoPostal}</p>
            </div>

            <div className="info-tarjeta">
              <div className="info-header">
                <Calendar size={18} />
                <h3>Edad</h3>
              </div>
              <p>{mascota.edad}</p>
            </div>

            <div className="info-tarjeta">
              <div className="info-header">
                <Tag size={18} />
                <h3>Raza</h3>
              </div>
              <p>{mascota.raza || "No especificada"}</p>
            </div>

          </div>

          <div className="seccion-descripcion">
            <h3>Descripción</h3>
            <p>{mascota.descripcion || "Sin descripción"}</p>
          </div>

          <div className="actions-mascota">
            <button
              className="animalito-btn adoptar-button"
              onClick={() => setConfirmacionAbierta(true)}
            >
              Me interesa <Heart size={16} color="#e74c3c" fill="#e74c3c" />
            </button>

            <button
              className="animalito-btn mostrar-mapa-btn"
              onClick={() => datosMascota()}
            >
              Mostrar en el mapa <FaMapPin size={16} color="#BF0413" />
            </button>
          </div>

        </div>

      </div>

      {/* modal galería */}
      {modalAbierto && (
        <div className="modal-galeria">

          <button
            className="close-modal-btn"
            onClick={() => setModalAbierto(false)}
          >
            <X size={30} />
          </button>

          <img
            src={imagen}
            alt="Galería mascota"
            className="galeria-img-completa"
          />

        </div>
      )}

      {/* modal confirmación */}
      {confirmacionAbierta && (
        <div className="confirmacion-overlay">

          <div className="confirmacion-modal">

            <h3>Confirmar solicitud de adopción</h3>

            <p>
              Esto enviará un correo al propietario de {mascota.nombre}. ¿Continuar?
            </p>

            <div className="actions-confirmacion">

              <button
                className="cancelar-btn"
                onClick={() => setConfirmacionAbierta(false)}
              >
                Mejor no...
              </button>

              <button
                className="confirmar-btn"
                onClick={async () => {
                  try {
                    await expresarInteres(id);
                    setConfirmacionAbierta(false);
                    setResultado("exito");
                  } catch (error) {
                    setConfirmacionAbierta(false);
                    setResultado("error");
                  }
                }}
              >
                ¡Adelante!
              </button>

            </div>

          </div>

        </div>
      )}

      {/* modal resultado */}
      {resultado && (
        <div className="confirmacion-overlay">
          <div className="confirmacion-modal">
            <h3>{resultado === "exito" ? "¡Correo enviado! 🐾" : "Algo salió mal 😿"}</h3>
            <p>
              {resultado === "exito"
                ? "Correo mandado exitosamente, espera respuesta del dueño."
                : "Hubo un problema al enviar el correo, intenta de nuevo."}
            </p>
            <div className="actions-confirmacion">
              {resultado === "error" && (
                <button
                  className="confirmar-btn"
                  onClick={() => {
                    setResultado(null);
                    setConfirmacionAbierta(true);
                  }}
                >
                  Volver a intentar
                </button>
              )}
              <button className="cancelar-btn" onClick={() => setResultado(null)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  </>
);
}

export default MascotaPerfil;