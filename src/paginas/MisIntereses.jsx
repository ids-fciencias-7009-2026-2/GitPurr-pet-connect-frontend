import { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import TarjetaMascota from "../componentes/TarjetaMascota";
import { obtenerMisIntereses } from "../api/servicioAnimalito";
import { me, logout } from "../api/servicioUsuario";
import { useNavigate } from "react-router-dom";
import "../estilos/paginas/Favoritos.css";

function MisIntereses() {
    const [usuario, setUsuario] = useState(null);
    const [intereses, setIntereses] = useState([]);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const usuarioActual = await me();
                const misIntereses = await obtenerMisIntereses();

                setUsuario(usuarioActual);
                setIntereses(misIntereses);
            } catch (error) {
                console.error("Error al cargar mis intereses:", error);
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
        return <p>Cargando intereses...</p>;
    }

    return (
        <>
            <Navbar usuario={usuario} onLogout={logoutHandler} />

            <main className="pagina-favoritos">
                <h1 className="titulo-seccion">Mis intereses</h1>

                {intereses.length === 0 ? (
                    <div className="estado-vacio">
                        <h2>Aún no has mostrado interés por ningún animalito.</h2>
                        <p>Cuando marques “Me interesa” en una mascota disponible, aparecerá aquí.</p>
                    </div>
                ) : (
                    <div className="home-grid">
                        {intereses.map((mascota) => (
                            <TarjetaMascota
                                key={mascota.id}
                                mascota={mascota}
                                inicialFavorito={true}
                            />
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}

export default MisIntereses;