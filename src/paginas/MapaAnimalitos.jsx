import { useState, useEffect } from "react";
import Navbar from "../componentes/Navbar";
import MapaLeaflet from "../componentes/mapa/MapaLeaflet";
import { useNavigate,useLocation } from "react-router-dom";
import { me, logout, ubicacion } from "../api/servicioUsuario";
import { obtenerAnimalitos } from "../api/servicioAnimalito";
import "leaflet/dist/leaflet.css";
import "../estilos/componentes/MapaLeaflet.css";
import "../estilos/paginas/MapaAnimalitos.css";


function MapaAnimalitos() {
    const navigate = useNavigate();
    const location =useLocation();
    const [usuario, setUsuario] = useState(null);
    const [posicionUsuario, setPosicionUsuario] = useState(null);
    const [posicionCentro,setPosicionCentro] = useState(null);
    const [animalitos, setAnimalitos] = useState([]);
    const coordenadasAnimalito = location.state?.coordenadas;
    const animalitoSeleccionado = location.state?.animalitoSeleccionado;
    const [cargando,setCargando] = useState(true);

    useEffect(() => {

        const cargarDatos = async () => {
            try {
                const usuarioActual = await me();
                setUsuario(usuarioActual);

                const ubicacionUsuario = await ubicacion();
                setPosicionUsuario(ubicacionUsuario);

                const ubicacionInicial = coordenadasAnimalito ? coordenadasAnimalito : [ubicacionUsuario.lat,ubicacionUsuario.lng]
                setPosicionCentro(ubicacionInicial);

                const animalitosCercanos = await obtenerAnimalitos();

                if(animalitoSeleccionado) {
                    const animalitoExistente = animalitosCercanos.some(
                        (animalito) => animalito.id === animalitoSeleccionado.id
                    );

                    if(!animalitoExistente) {
                        animalitosCercanos.push(animalitoSeleccionado);
                    }
                }

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

    if(!posicionUsuario || !posicionCentro) return <div>Cargando mapa...</div>;
    
    return (
        <>
            <Navbar usuario={usuario} onLogout={logoutHandler} />

            <div className="mapa-animalitos">
                <MapaLeaflet 
                    usuario={posicionUsuario} 
                    animalitos={animalitos} 
                    animalitoHandler={animalitoHandler} 
                    centro={posicionCentro}
                />
            </div>
        </>
    );
}

export default MapaAnimalitos;