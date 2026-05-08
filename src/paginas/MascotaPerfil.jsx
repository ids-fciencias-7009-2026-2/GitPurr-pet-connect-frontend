import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart, MapPin, Calendar, Tag, HouseHeart, ShieldCheck, X, ArrowBigDown } from "lucide-react";
import { obtenerAnimalitoPorId } from "../api/servicioAnimalito";
import "../estilos/paginas/MascotaPerfil.css";

function MascotaPerfil() {

  const { id } = useParams();
  const [mascota, setMascota] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [confirmacionAbierta, setConfirmacionAbierta] = useState(false);

  /* encontramos a la mascota por su ID */
  useEffect(() => {
    const cargarMascota = async () => {
      try {
        const data = await obtenerAnimalitoPorId(id);
        setMascota(data);
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

  if (!mascota) return <p className="mascota-loading">Cargando...</p>;

  /* Imagen de la mascota */
  const imagen = mascota.fotoUrl || "/recursos/imagenes/default.jpg";

  return (
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
              className="adoptar-button"
              onClick={() => setConfirmacionAbierta(true)}
            >
              Me interesa <Heart size={16} color="#e74c3c" fill="#e74c3c" />
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
                onClick={() => {
                  setConfirmacionAbierta(false);
                  // ya que se hizo la petición al backend...
                  alert("Correo enviado");
                }}
              >
                ¡Adelante!
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default MascotaPerfil;