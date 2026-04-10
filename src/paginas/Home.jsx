import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { me, logout } from "../api/servicioUsuario"
import "../estilos/paginas/Home.css"
import Navbar from "../componentes/Navbar"
import TarjetaMascota from "../componentes/TarjetaMascota"

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

    /** Datos de ejemplo de mascotas disponibles para adopcion */
    const mascotas = [
        { id: 1, nombre: 'Alaska', raza: 'Husky Siberiano', ubicacion: 'Puebla, Mexico', edad: '4 años', sexo: 'Hembra', imagen: '/recursos/imagenes/pet-shop.png' },
        { id: 2, nombre: 'Garfield', raza: 'Gato Naranja', ubicacion: 'Guadalajara, Mexico', edad: '2 años', sexo: 'Macho', imagen: '/recursos/imagenes/pet-shop.png' },
        { id: 3, nombre: 'Chaparrito', raza: 'Pitbull', ubicacion: 'CDMX, Mexico', edad: '3 años', sexo: 'Macho', imagen: '/recursos/imagenes/pet-shop.png' },
    ]

    /**
     * Al montar el componente, obtiene la informacion del usuario
     * autenticado mediante el endpoint /usuarios/me.
     */
    useEffect(() => {
        me().then(setUsuario).catch(() => setUsuario(null))
    }, [])

    /**
     * Cierra la sesion del usuario y lo redirige al login.
     */
    const handleLogout = async () => {
        await logout()
        navegacion('/login')
    }

    return (
        <div className="pagina-home">
            <Navbar usuario={usuario} onLogout={handleLogout} />

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
                <p className="home-mascotas-subtitulo">{mascotas.length} mascotas esperando encontrar un hogar</p>
                <div className="home-grid">
                    {mascotas.map(mascota => (
                        <TarjetaMascota key={mascota.id} mascota={mascota} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Home