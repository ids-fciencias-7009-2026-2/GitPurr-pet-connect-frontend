import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../estilos/componentes/Navbar.css";

/**
 * Componente de barra de navegacion principal de la aplicacion.
 * * Muestra el logo, barra de busqueda, iconos de favoritos y notificaciones,
 * y el icono de usuario con un dropdown que muestra la informacion del usuario
 * autenticado y la opcion de cerrar sesion. Se mantiene fija en la parte
 * superior de la pantalla mientras el usuario se desplaza.
 * * @param {object} usuario - Objeto con la informacion del usuario autenticado.
 * @param {string} usuario.nombre - Nombre del usuario autenticado.
 * @param {string} usuario.email - Correo electronico del usuario autenticado.
 * @param {Function} onLogout - Funcion que se ejecuta al cerrar sesion.
 * @returns {JSX.Element} Barra de navegacion fija con logo, busqueda, 
 * iconos de accion y menu de usuario.
 */
function Navbar({ usuario, onLogout, onBuscar }) {
    const [menuAbierto, setMenuAbierto] = useState(false);
    
    const [textoBusqueda, setTextoBusqueda] = useState("");

    const navigate = useNavigate();

	const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (onBuscar) {
                onBuscar(textoBusqueda);
            }
        }
    };

    const limpiarBusqueda = () => {
        setTextoBusqueda("");
        if (onBuscar) {
            onBuscar(""); 
        }
    };

    return (
        <nav className="navbar">	
            <div className="navbar-logo">
                <Link to="/home">
                    <img src="/recursos/imagenes/pet-shop.png" alt="logo" className="navbar-petshop" />
                </Link>
                <div className="navbar-logo-texto">
                    <span className="navbar-titulo">Pet Connect</span>
                    <span className="navbar-subtitulo">Cambie su vida para siempre</span>
                </div>
            </div>
            
            <div className="navbar-busqueda" style={{ position: "relative" }}>
                <img 
                    src="/recursos/imagenes/lupa-navbar.png" 
                    alt="lupa" 
                    className="navbar-lupa" 
                />
                <input 
                    type="text" 
                    placeholder="Buscar mascotas..." 
                    value={textoBusqueda}
                    onChange={(e) => setTextoBusqueda(e.target.value)}
                    onKeyDown={handleKeyDown} 
                    style={{ paddingRight: "30px" }} 
                />
                {textoBusqueda && (
                    <button 
                        onClick={limpiarBusqueda}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "14px",
                            color: "#888"
                        }}
                    >
                        ✖
                    </button>
                )}
            </div>

            <div className="navbar-acciones">
                <button className="btn-mapa" onClick={() => navigate("/mapa")}>Buscar en mapa</button>
                <img
                    src="/recursos/imagenes/corazon-navbar.png"
                    alt="favoritos"
                    className="navbar-icono"
                    onClick={() => navigate("/favoritos")}
                />
                <img
                    src="/recursos/imagenes/campana-navbar.png"
                    alt="notificaciones"
                    className="navbar-icono"
                    onClick={() => navigate("/notificaciones")}
                />
                <div className="navbar-usuario" onClick={() => setMenuAbierto(!menuAbierto)}>
                    <img src="/recursos/imagenes/usuario-navbar.png" alt="usuario" className="navbar-icono" />
                    {menuAbierto && (
                        <div className="navbar-dropdown">
                            <p className="navbar-nombre">{usuario?.nombre ?? 'Usuario'}</p>
                            <p className="navbar-email">{usuario?.email ?? ''}</p>
                            <hr />
                            
                            <Link to="/profile" style={{ textDecoration: 'none' }}>
                                <button style={{ marginBottom: '8px', width: '100%' }}>Mi Perfil</button>
                            </Link>

                            <Link to="/animalitos/register" style={{ textDecoration: 'none' }}>
                                <button style={{ marginBottom: '8px', width: '100%' }}>
                                    Registrar Mascota
                                </button>
                            </Link>

                            <button onClick={onLogout}>Cerrar sesión</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
