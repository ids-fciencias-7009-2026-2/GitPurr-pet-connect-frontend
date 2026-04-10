import axios from 'axios';

/**
 * URL base del servidor backend.
 * Todas las peticiones HTTP se dirigira a esta direccion.
 */
export const URL_Base = "http://localhost:8080";

/**
 * Instancia personalizada de Axios configurada con la URL del backend para 
 * permitir la comunicacion.
 * 
 * Utiliza BASE_URL como dirección base, de esta forma solo es necesario especificar
 * el path del endpoint para ejecutar las peticiones.
 */
export const api = axios.create({
    baseURL : URL_Base,
})

/**
 * Interceptor de peticiones HTTP salientes.
 * 
 * Al momento de realizar una peticion se ejecuta de forma automatica. Si
 * existe un token de sesion almacenado en el navegador, lo agrega al header
 * Authorization en formato Bearer, el cual es requerido por algunos endpoints. 
 * 
 * @param {object} config - Objeto de configuracion de la peticion HTTP saliente.
 * @returns {object} config - La configuracion inicial con el header Authorization 
 * agregado en caso de que exista.
 */
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
