import "../estilos/componentes/TarjetaMascota.css"

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
function TarjetaMascota({ mascota }) {
    return (
        <div className="tarjeta-mascota">
            <div className="tarjeta-imagen-contenedor">
                <img src={mascota.imagen} alt={mascota.nombre} className="tarjeta-imagen" />
                <button className="tarjeta-favorito">
                    <img src="/recursos/imagenes/corazon-navbar.png" alt="favorito" className="tarjeta-favorito-icono" />
                </button>
            </div>
            <div className="tarjeta-info">
                <div className="tarjeta-encabezado">
                    <div>
                        <p className="tarjeta-nombre">{mascota.nombre}</p>
                        <p className="tarjeta-raza">{mascota.raza}</p>
                    </div>
                    <span className="tarjeta-sexo">{mascota.sexo}</span>
                </div>
                <p className="tarjeta-ubicacion">{mascota.ubicacion}</p>
                <p className="tarjeta-edad">{mascota.edad}</p>
                <button className="tarjeta-boton">Ver perfil</button>
            </div>
        </div>
    )
}

export default TarjetaMascota