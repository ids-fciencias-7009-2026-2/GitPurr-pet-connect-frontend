import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { obtenerFavoritos } from "../api/servicioUsuario"
import TarjetaMascota from "../componentes/TarjetaMascota"
import "../estilos/paginas/Favoritos.css"

/**
 * Pagina de las mascotas favoritas del usuario.
 *
 * Obtiene las mascotas que el usuario marcó como favoritas
 * y muestra sus tarjetas.
 *
 * @returns {JSX.Element} Página de las mascotas marcadas
 * como favoritas.
 */
function Favoritos() {
    const navegacion = useNavigate()
    const [mascotasFavoritas, setMascotasFavoritas] = useState([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const cargarFavoritos =
            async () => {
                try {
                    const misFavoritos = await obtenerFavoritos();
                    setMascotasFavoritas(misFavoritos)
                } catch(error) {
                    console.error("Error al cargar favoritos:", error)
                } finally {
                    setCargando(false)
                }
            }
        cargarFavoritos()
    }, [])

    if(cargando) {
        return <div className="cargando-mensaje">Cargando favoritos...</div>
    }

    return (
        <div className="pagina-favoritos">
            <h1 className="titulo-seccion">Mis mascotas favoritas</h1>

            {mascotasFavoritas.length === 0 ? (
                <div className="estado-vacio">
                    <h2>¡Aún no tienes mascotas favoritas!</h2>
                    <p>Explora nuestra lista de mascotas y dales un corazón para guardarlos aquí.</p>
                    <button className="btn-primario" onClick={() => navegacion("/home")}>
                        Ver mascotas
                    </button>
                </div>
            ) : (
                <div className="home-grid">
                    {mascotasFavoritas.map(mascota => (
                        <TarjetaMascota
                            key={mascota.id}
                            mascota={{
                                ...mascota,
                                imagen: mascota.fotoUrl || "/recursos/imagenes/default.jpg",
                                ubicacion: mascota.codigoPostal
                            }}
                            inicialFavorito={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favoritos;
