import { useState, useEffect } from "react";
import { FaMapPin, FaHorse } from "react-icons/fa6";
import { PiCatFill } from "react-icons/pi";
import { FaDog } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { ubicacion } from "../api/servicioUsuario";
import { obtenerAnimalitosCercanos } from "../api/servicioAnimalito";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import "../estilos/paginas/MapaAnimalitos.css"

const iconoGeneral = L.divIcon({
    html: renderToStaticMarkup(
        <SiGooglemaps size={34} color="#BF0413" />
    ),
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 32]
});

const iconoUsuario = L.divIcon({
    html: renderToStaticMarkup(
        <FaMapPin size={38} color="#BF0413" />
    ),
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 32]
});

const iconoAnimalito = (especie) => {
    const configuracionBase = {
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 32]
    };

    switch (especie.toUpperCase()) {
        case "PERRO":
            return L.divIcon({
                ...configuracionBase,
                html: renderToStaticMarkup(
                    <FaDog size={34} color="#2D3F54" />
                ),
            });

        case "GATO":
            return L.divIcon({
                ...configuracionBase,
                html: renderToStaticMarkup(
                    <PiCatFill size={34} color="#2D3F54" />
                ),
            });

        default:
            return L.divIcon({
                ...configuracionBase,
                html: renderToStaticMarkup(
                    <FaHorse size={34} color="#2D3F54" />
                )
            });
    }
}

function MapaAnimalitos() {

    const [posicion, setPosicion] = useState(null);
    const [animalitos, setAnimalitos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        const cargarDatos = async () => {
            try {
                const ubicacionUsuario = await ubicacion();

                setPosicion([ubicacionUsuario.lat, ubicacionUsuario.lng]);

                const animalitosCercanos = await obtenerAnimalitosCercanos();
                setAnimalitos(animalitosCercanos);

            } catch (error) {
                console.log(error);
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();

    }, [])

    if (cargando || !posicion) {
        return <div className="mapa-estado">Cargando mapa...</div>;
    }


    const animalitoHandler = (id) => {
        navigate(`/mascota/${id}`);
    }

    return (
        <div className="pagina-mapa">
            <MapContainer className="mapa" center={posicion} zoom={15}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Marker position={posicion} icon={iconoUsuario}>
                    <Popup>
                        <div className="popup-usuario">
                            <div className="popup-header popup-usuario-header"> ¡Aquí estás tú! <FaMapPin/></div>
                        </div>
                    </Popup>
                </Marker>
                <MarkerClusterGroup chunkedLoading>
                    {
                        animalitos.map((animalito) => (
                            <Marker icon={iconoAnimalito(animalito.especie.toUpperCase().trim()) || iconoGeneral}
                                key={animalito.id} position={[animalito.latitudAprox, animalito.longitudAprox]}>
                                <Popup>
                                    <div className="popup-animalito">
                                        <div className="popup-header popup-animalito-header">{animalito.nombre.toUpperCase()}</div>
                                        <button className="popup-animalito-button" onClick={()=>animalitoHandler(animalito.id)}>Ver tarjeta</button>
                                    </div>
                                </Popup>
                            </Marker>
                        ))
                    }
                </MarkerClusterGroup>

            </MapContainer>
        </div>
    );
}

export default MapaAnimalitos;