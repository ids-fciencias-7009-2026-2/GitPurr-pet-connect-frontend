import { useState, useEffect } from "react";
import Navbar from "../componentes/Navbar";
import MapaLeaflet from "../componentes/mapa/MapaLeaflet";
import { useNavigate } from "react-router-dom";
import { me, logout, ubicacion } from "../api/servicioUsuario";
import { obtenerAnimalitos } from "../api/servicioAnimalito";
import "leaflet/dist/leaflet.css";
import "../estilos/componentes/MapaLeaflet.css";
import "../estilos/paginas/MapaAnimalitos.css";


function MapaAnimalitos() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [posicion, setPosicion] = useState(null);
    const [animalitos, setAnimalitos] = useState([]);
    const [cargando,setCargando] = useState(true);

    useEffect(() => {

        const cargarDatos = async () => {
            try {
                const usuarioActual = await me();
                setUsuario(usuarioActual);

                const ubicacionUsuario = await ubicacion();
                setPosicion([ubicacionUsuario.lat,ubicacionUsuario.lng]);

                const animalitosCercanos = await obtenerAnimalitos();
                setAnimalitos(animalitosCercanos);
            } catch(error) {
                console.log(error);
            }
        }

        cargarDatos();
    }, [])

    const logoutHandler = async () => {
        await logout()
        navigate('/login')
    }

    const animalitoHandler = (id) => {
        navigate(`/mascota/${id}`);
    }

    if(!posicion) return <div>Cargando mapa...</div>;
    
    return (
        <>
            <Navbar usuario={usuario} onLogout={logoutHandler} />

            <div className="mapa-animalitos">
                <MapaLeaflet posicion={posicion} animalitos={animalitos} animalitoHandler={animalitoHandler} />
            </div>
        </>
    );
}

export default MapaAnimalitos;