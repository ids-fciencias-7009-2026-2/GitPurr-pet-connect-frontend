import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { iconoUsuario, iconoGeneral, iconoAnimalito } from "../mapa/iconosMapa.jsx";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import "../../estilos/componentes/MapaLeaflet.css";

function MapaLeaflet({ usuario, animalitos, animalitoHandler, centro }) {

    return (
        <MapContainer className="mapa" center={centro} zoom={15}>
            {/** Trae la imagen que permite renderizar el mapa */}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/** Marcador del usuario */}
            <Marker position={usuario} icon={iconoUsuario}>
                <Popup>
                    <div className="popup-usuario">
                        <div className="popup-header popup-usuario-header"> ¡Aquí estás tú! </div>
                    </div>
                </Popup>
            </Marker>

            {/** Agrupa todos los animalitos cercanos en el layout */}
            <MarkerClusterGroup chunkedLoading>
                {
                    animalitos.map((animalito) => (
                        /** Marcador individual por cada animalito */
                        <Marker
                            key={animalito.id}
                            position={[animalito.latitudAprox, animalito.longitudAprox]}
                            icon={iconoAnimalito(animalito.especie) || iconoGeneral}
                        >
                            <Popup>
                                <div className="popup-animalito">
                                    <div className="popup-header popup-animalito-header">{animalito.nombre.toUpperCase()}</div>
                                    <button className="popup-animalito-button" onClick={() => animalitoHandler(animalito.id)}>Ver tarjeta</button>
                                </div>
                            </Popup>
                        </Marker>
                    ))
                }
            </MarkerClusterGroup>

        </MapContainer>
    );
}

export default MapaLeaflet;

