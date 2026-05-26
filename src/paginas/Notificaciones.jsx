import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { obtenerNotificaciones } from "../api/servicioAnimalito"
import "../estilos/paginas/Notificaciones.css"

/**
 * Pagina del panel de notificaciones del dueno de animalitos.
 *
 * Obtiene y muestra la lista de usuarios que han expresado interes
 * en adoptar los animalitos publicados por el usuario autenticado.
 * Las notificaciones se agrupan por animalito.
 *
 * @returns {JSX.Element} Panel de solicitudes de interes agrupadas por animalito.
 */
function Notificaciones() {
    const navegacion = useNavigate()
    const [notificaciones, setNotificaciones] = useState([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const cargarNotificaciones = async () => {
            try {
                const datos = await obtenerNotificaciones()
                setNotificaciones(datos)
            } catch (error) {
                console.error("Error al cargar notificaciones:", error)
            } finally {
                setCargando(false)
            }
        }
        cargarNotificaciones()
    }, [])

    if (cargando) {
        return <div className="cargando-mensaje">Cargando notificaciones...</div>
    }

    // Agrupa las notificaciones por nombre del animalito
    const agrupadas = notificaciones.reduce((acc, notif) => {
        const key = notif.animalitoNombre
        if (!acc[key]) acc[key] = []
        acc[key].push(notif)
        return acc
    }, {})

    const formatearFecha = (fechaStr) => {
        if (!fechaStr) return "Sin fecha"
        const fecha = new Date(fechaStr)
        return fecha.toLocaleString("es-MX", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
    }

    return (
        <div className="pagina-notificaciones">
            <div className="notificaciones-header">
                <div className="notificaciones-topbar">
                    <h1 className="notificaciones-titulo">Solicitudes de Interés</h1>
                    <button className="notif-btn-regresar" onClick={() => navegacion("/home")}>
                        Regresar a la página principal
                    </button>
                </div>
                <p className="notificaciones-subtitulo">Gestiona las solicitudes de adopción de mascotas</p>
            </div>

            <div className="notificaciones-contenido">
                {Object.keys(agrupadas).length === 0 ? (
                    <div className="estado-vacio">
                        <i className="fa-regular fa-bell" style={{ fontSize: "48px", color: "var(--color-primary)" }}></i>
                        <h2>¡Sin notificaciones aún!</h2>
                        <p>Cuando alguien exprese interés en tus mascotas, aparecerá aquí.</p>
                        <button className="btn-primario" onClick={() => navegacion("/home")}>
                            Ver mascotas
                        </button>
                    </div>
                ) : (
                    Object.entries(agrupadas).map(([nombreAnimalito, interesados]) => (
                        <div key={nombreAnimalito} className="notif-grupo">
                            <h2 className="notif-grupo-titulo">{nombreAnimalito}</h2>
                            {interesados.map((notif, index) => (
                                <div key={index} className="notif-tarjeta">
                                    <div className="notif-campo">
                                        <i className="fa-regular fa-user notif-icono"></i>
                                        <div>
                                            <span className="notif-label">NOMBRE</span>
                                            <span className="notif-valor">{notif.interesadoNombre}</span>
                                        </div>
                                    </div>
                                    <div className="notif-campo">
                                        <i className="fa-regular fa-envelope notif-icono"></i>
                                        <div>
                                            <span className="notif-label">EMAIL</span>
                                            <span className="notif-valor">{notif.interesadoEmail}</span>
                                        </div>
                                    </div>
                                    <div className="notif-campo">
                                        <i className="fa-regular fa-calendar notif-icono"></i>
                                        <div>
                                            <span className="notif-label">FECHA DE INTERÉS</span>
                                            <span className="notif-valor">{formatearFecha(notif.fechaInteres)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Notificaciones