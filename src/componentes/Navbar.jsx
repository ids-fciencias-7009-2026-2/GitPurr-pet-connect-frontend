import { useState } from "react"
import "../estilos/componentes/Navbar.css"

/**
 * Componente de barra de navegacion principal de la aplicacion.
 * 
 * Muestra el logo, barra de busqueda, iconos de favoritos y notificaciones,
 * y el icono de usuario con un dropdown que muestra la informacion del usuario
 * autenticado y la opcion de cerrar sesion. Se mantiene fija en la parte
 * superior de la pantalla mientras el usuario se desplaza.
 * 
 * @param {object} usuario - Objeto con la informacion del usuario autenticado.
 * @param {string} usuario.nombre - Nombre del usuario autenticado.
 * @param {string} usuario.email - Correo electronico del usuario autenticado.
 * @param {Function} onLogout - Funcion que se ejecuta al cerrar sesion.
 * @returns {JSX.Element} Barra de navegacion fija con logo, busqueda, 
 * iconos de accion y menu de usuario.
 */
function Navbar({ usuario, onLogout }) {
    /** Controla si el dropdown del usuario esta abierto o cerrado */
    const [menuAbierto, setMenuAbierto] = useState(false)

    return (
        <nav className="navbar">
            <div className="navbar-logo">
            <img src="/recursos/imagenes/pet-shop.png" alt="logo" className="navbar-petshop" />
            <div className="navbar-logo-texto">
                <span className="navbar-titulo">Pet Connect</span>
                <span className="navbar-subtitulo">Cambie su vida para siempre</span>
            </div>
        </div>

            <div className="navbar-busqueda">
                <img src="/recursos/imagenes/lupa-navbar.png" alt="lupa" className="navbar-lupa" />
                <input type="text" placeholder="Buscar mascotas" />
            </div>

            <div className="navbar-acciones">
                <img src="/recursos/imagenes/corazon-navbar.png" alt="favoritos" className="navbar-icono" />
                <img src="/recursos/imagenes/campana-navbar.png" alt="notificaciones" className="navbar-icono" />
                <div className="navbar-usuario" onClick={() => setMenuAbierto(!menuAbierto)}>
                    <img src="/recursos/imagenes/usuario-navbar.png" alt="usuario" className="navbar-icono" />
                    {menuAbierto && (
                        <div className="navbar-dropdown">
                            <p className="navbar-nombre">{usuario?.nombre ?? 'Usuario'}</p>
                            <p className="navbar-email">{usuario?.email ?? ''}</p>
                            <hr />
                            <button onClick={onLogout}>Cerrar sesión</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar