import "../estilos/componentes/TarjetaMascota.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { agregarFavorito, eliminarFavorito } from "../api/servicioUsuario"
import { Heart } from "lucide-react";
/**
 * Componente que muestra la informacion de una mascota disponible para adopcion.
 *
 * Muestra la foto, nombre, raza, ubicacion, edad y sexo de la mascota,
 * ademas de un boton para ver su perfil completo.
 *
 * @param {object} mascota - Objeto con la informacion de la mascota.
 * @param {string} mascota.nombre - Nombre de la mascota.
 * @param {string} mascota.raza - Raza de la mascota.
 * @param {string} mascota.ubicacion - Ubicacion de la mascota.
 * @param {string} mascota.edad - Edad de la mascota.
 * @param {string} mascota.sexo - Sexo de la mascota.
 * @param {string} mascota.imagen - Ruta de la imagen de la mascota.
 * @returns {JSX.Element} Tarjeta con la informacion de la mascota.
 */
function TarjetaMascota({
                            mascota,
                            inicialFavorito,
                            mostrarFavorito = true,
                            mostrarEstado = false
                        }) {
    const navigate = useNavigate();
    const [favorito, setFavorito] = useState(inicialFavorito || false);
    // para evitar muchos clicks rápidos mientras el backend está procesando el reqeust
    const [procesando, setProcesando] = useState(false);

    const favoritoClick = async () => {

        if(procesando) return;
        setProcesando(true);

        try {
            if(favorito) {
                await eliminarFavorito(mascota.id);
                setFavorito(false);
            } else {
                await agregarFavorito(mascota.id);
                setFavorito(true);
            }
        } catch(error) {
            console.error("Error al agrear o eliminar favorito:", error);
        } finally {
            setProcesando(false);
        }
    };

    return (
        <div className="tarjeta-mascota">
            <div className="tarjeta-imagen-contenedor">
                <img
                  src={mascota.fotoUrl || "/recursos/imagenes/default.jpg"}
                  alt={mascota.nombre}
                  className="tarjeta-imagen"
                />
                {mostrarFavorito && (
                    <button className="tarjeta-favorito" onClick={favoritoClick} disabled={procesando}>
                        {favorito ? (
                            <Heart size={18} color="#000000" fill="#e74c3c" />
                        ) : (
                            <Heart size={18} color="#000000" />
                        )}
                    </button>
                )}
            </div>
            <div className="tarjeta-info">
                <div className="tarjeta-encabezado">
                    <div>
                        <p className="tarjeta-nombre">{mascota.nombre}</p>
                        <p className="tarjeta-raza">
                          {mascota.raza || "Sin especificar"}
                        </p>
                        {mostrarEstado && (
                            <span className={mascota.adoptado ? "estado-adoptado" : "estado-disponible"}>
                                {mascota.adoptado ? "Adoptado" : "Disponible"}
                            </span>
                        )}
                    </div>
                    <span className="tarjeta-sexo">{mascota.sexo}</span>
                </div>
                <p className="tarjeta-ubicacion">
                  {mascota.codigoPostal}
                </p>
                <p className="tarjeta-edad">{mascota.edad}</p>
                <button
                    className="tarjeta-boton"
                    onClick={() => navigate(`/mascota/${mascota.id}`)}
                >
                    Ver perfil
                </button>
            </div>
        </div>
    )
}

export default TarjetaMascota