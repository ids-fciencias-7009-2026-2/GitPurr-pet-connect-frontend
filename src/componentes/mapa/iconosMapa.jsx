import { FaMapPin, FaHorse } from "react-icons/fa6";
import { PiCatFill } from "react-icons/pi";
import { FaDog } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

export const iconoGeneral = L.divIcon({
    html: renderToStaticMarkup(
        <SiGooglemaps size={34} color="#BF0413" />
    ),
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 32]
});

export const iconoUsuario = L.divIcon({
    html: renderToStaticMarkup(
        <FaMapPin size={38} color="#BF0413" />
    ),
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 32]
});

export const iconoAnimalito = (especie) => {
    const configuracionBase = {
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 32]
    };

    switch (especie?.toUpperCase()?.trim()) {
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