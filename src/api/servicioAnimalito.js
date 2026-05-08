import { api } from "./axiosApi";

export const registrarAnimalito = (animalito) => {
    return api.post("/animalitos", animalito).then((respuesta) => respuesta.data);
};

export const obtenerAnimalitos = () => {
    return api.get("/animalitos").then((respuesta) => respuesta.data);
};