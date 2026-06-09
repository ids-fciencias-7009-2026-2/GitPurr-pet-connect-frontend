import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { me, logout, obtenerFavoritos } from "../api/servicioUsuario"
import "../estilos/paginas/Home.css"
import Navbar from "../componentes/Navbar"
import TarjetaMascota from "../componentes/TarjetaMascota"
import { obtenerAnimalitos, buscarAnimalitosPorPalabraClave } from "../api/servicioAnimalito"

/**
 * Pagina principal de la aplicacion.
 * 
 * Obtiene la informacion del usuario autenticado y la pasa al navbar.
 * Muestra el hero, los filtros de busqueda por tipo de mascota,
 * el grid de mascotas disponibles para adopcion y el footer.
 * 
 * @returns {JSX.Element} Pagina de inicio con navbar, hero, filtros,
 * grid de mascotas y footer.
 */
function Home() {
    /** Permite redirigir al usuario entre paginas */
    const navegacion = useNavigate()

    /** Almacena la informacion del usuario autenticado */
    const [usuario, setUsuario] = useState(null)

    /** Almacena el filtro activo seleccionado */
    const [filtroActivo, setFiltroActivo] = useState('Todos')

    /** Mascotas disponibles para adopcion */
    const [mascotas, setMascotas] = useState([])

    /** IDs de las mascotas marcadas como favoritos */
    const [favoritosIds, setFavoritosIds] = useState([])
    
    /** Estado para saber si el sistema está buscando */
    const [cargando, setCargando] = useState(false)

    /**
     * Al montar el componente, obtiene la informacion del usuario
     * autenticado mediante el endpoint /usuarios/me.
     */
    useEffect(() => {
        me()
          .then(setUsuario)
          .catch(() => {
             sessionStorage.removeItem("token")
             navegacion("/login")
        })

        setCargando(true)
        obtenerAnimalitos()
          .then(setMascotas)
          .catch(error => {
            console.error("Error al cargar mascotas:", error)
          })
          .finally(() => setCargando(false))

    }, [])

    /**
     * Al montar el componente, se cargan las mascotas que
     * el usuario tiene agregadas como favoritas.
     */
    useEffect(() => {
        const cargarFavoritos =
            async () => {
                try {
                    const misFavoritos = await obtenerFavoritos();
                    const ids = misFavoritos.map(mascota => mascota.id)
                    setFavoritosIds(ids)
                } catch(error) {
                    console.error("Error al cargar favoritos:", error)
                }
            }
        cargarFavoritos()
    }, [])

    const mascotasFiltradas = mascotas.filter(mascota => {
        if (filtroActivo === 'Todos') return true
        if (filtroActivo === 'Perros') return mascota.especie?.toLowerCase() === 'perro'
        if (filtroActivo === 'Gatos') return mascota.especie?.toLowerCase() === 'gato'
        if (filtroActivo === 'Otros') {
            const esp = mascota.especie?.toLowerCase()
            return esp !== 'perro' && esp !== 'gato'
        }
        return true
    })	

    /**
     * Cierra la sesion del usuario y lo redirige al login.
     */
    const handleLogout = async () => {
        await logout()
        navegacion('/login')
    }
    
    const handleBuscar = useCallback((palabraClave) => {
        setCargando(true);

        if (!palabraClave || palabraClave.trim() === "") {
            obtenerAnimalitos()
                .then(setMascotas)
                .catch(console.error)
                .finally(() => setCargando(false));
            return;
        }

        buscarAnimalitosPorPalabraClave(palabraClave)
            .then((resultados) => {
                setMascotas(resultados);
            })
            .catch(error => {
                console.error("Error en la búsqueda:", error);
            })
            .finally(() => setCargando(false));
    }, []);

    return (
        <div className="pagina-home">
            <Navbar usuario={usuario} onLogout={handleLogout} onBuscar={handleBuscar} />

            {/* Seccion hero con titulo y subtitulo sobre fondo naranja */}
            <section className="home-hero">
                <h1 className="home-hero-titulo">Encuentra tu compañero perfecto</h1>
                <p className="home-hero-subtitulo">Miles de mascotas esperando un hogar lleno de amor. Adopta, no compres.</p>
            </section>

            {/* Seccion de filtros por tipo de mascota */}
            <section className="home-filtros">
                {['Todos', 'Perros', 'Gatos', 'Otros'].map(filtro => (
                    <button
                        key={filtro}
                        className={filtroActivo === filtro ? 'filtro-activo' : 'filtro'}
                        onClick={() => setFiltroActivo(filtro)}
                    >
                        {filtro}
                    </button>
                ))}
            </section>
            {/* Seccion de mascotas disponibles */}
            <section className="home-mascotas">
                <h2 className="home-mascotas-titulo">Mascotas disponibles</h2>
                <p className="home-mascotas-subtitulo">{mascotasFiltradas.length} mascotas esperando encontrar un hogar</p>
                <div className="home-grid">
                    {cargando ? (
                        <div className="spinner" style={{ gridColumn: "1 / -1", margin: "50px auto" }}></div>
                    ) : mascotasFiltradas.length === 0 ? (
                        <div style={{ textAlign: "center", gridColumn: "1 / -1", padding: "50px 20px" }}>
                            <h3>No encontramos peluditos con esa búsqueda 🐾</h3>
                            <p style={{ color: "#666" }}>Intenta con otras palabras o limpia el buscador.</p>
                        </div>
                    ) : (
                        mascotasFiltradas.map(mascota => (
                            <TarjetaMascota
                                key={mascota.id}
                                mascota={{
                                    ...mascota,
                                    imagen: mascota.fotoUrl || "/recursos/imagenes/default.jpg",
                                    ubicacion: mascota.codigoPostal
                                }}
                                inicialFavorito={favoritosIds.includes(mascota.id)}
                                mostrarFavorito={
                                    usuario?.id?.toString() !== mascota.usuarioId?.toString()
                                }
                            />
                        ))
                    )}
                </div>
            </section>
        </div>
    )
}
export default Home

