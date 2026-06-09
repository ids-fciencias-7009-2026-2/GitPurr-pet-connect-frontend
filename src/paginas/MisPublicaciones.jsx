import { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import TarjetaMascota from "../componentes/TarjetaMascota";
import { obtenerMisPublicaciones } from "../api/servicioAnimalito";
import { me, logout } from "../api/servicioUsuario";
import { useNavigate } from "react-router-dom";
import "../estilos/paginas/Favoritos.css";

function MisPublicaciones() {
    const [usuario, setUsuario] = useState(null);
    const [publicaciones, setPublicaciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const usuarioActual = await me();
                const misAnimalitos = await obtenerMisPublicaciones();

                setUsuario(usuarioActual);
                setPublicaciones(misAnimalitos);
            } catch (error) {
                console.error("Error al cargar mis publicaciones:", error);
                navigate("/login");
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();
    }, [navigate]);

    const logoutHandler = async () => {
        await logout();
        navigate("/login");
    };

    if (cargando) {
        return <p>Cargando publicaciones...</p>;
    }

    return (
        <>
            <Navbar usuario={usuario} onLogout={logoutHandler} />

            <main className="pagina-favoritos">
                <h1 className="titulo-seccion">Mis publicaciones</h1>

                {publicaciones.length === 0 ? (
                    <div className="estado-vacio">
                        <h2>Aún no has publicado animalitos.</h2>
                        <p>Cuando registres una mascota en adopción, aparecerá aquí.</p>
                    </div>
                ) : (
                    <div className="home-grid">
                        {publicaciones.map((mascota) => (
                            <TarjetaMascota
                                key={mascota.id}
                                mascota={mascota}
                                mostrarFavorito={false}
                                mostrarEstado={true}
                            />
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}

export default MisPublicaciones;