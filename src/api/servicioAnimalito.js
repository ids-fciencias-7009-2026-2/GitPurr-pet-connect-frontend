import { api } from "./axiosApi";

export const registrarAnimalito = (animalito) => {
    return api.post("/animalitos", animalito).then((respuesta) => respuesta.data);
};

export const obtenerAnimalitos = () => {
    return api.get("/animalitos").then((respuesta) => respuesta.data);
};

export const obtenerAnimalitoPorId = (id) => {
    return api.get(`/animalitos/${id}`)
        .then(res => res.data);
};

export const obtenerAnimalitosCercanos = () => {
    return api.get("/animalitos/cercanos").then(respuesta => respuesta.data);
};

export const expresarInteres = (animalitoId) => {
    return api.post(`/animalitos/${animalitoId}/interes`).then((respuesta) => respuesta.data);
};

export const buscarAnimalitosPorPalabraClave = (palabraClave) => {
    return api.get(`/animalitos/buscar?q=${palabraClave}`).then((respuesta) => respuesta.data);
};
