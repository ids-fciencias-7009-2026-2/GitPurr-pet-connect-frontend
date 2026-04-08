import { api } from "./axiosApi";

/**
 * Realiza una peticion POST al endpoint register que nos permite
 * dar de alta un usuario nuevo en el sistema.
 * 
 * @param {object} usuario - Objeto con los datos del nuevo usuario.
 * @param {string} usuario.nombre - Nombre del usuario.
 * @param {string} usuario.email - Correo electronico del usuario.
 * @param {string} usuario.password - Contrasena del usuario. 
 * @returns {Promise} Promesa con los datos del usuario creado.
 */
export const registro = (usuario) => {
    return api.post('/usuarios/register', usuario).then((respuesta) => respuesta.data)
}

/**
 * Realiza una peticion POST al endpoint de login que autentica al usuario 
 * si las credenciales son validas. 
 * 
 * Cuando recibe el token, este es almacenado en el localStorage del navegador
 * para su uso en peticiones posteriores.
 * 
 * @param {object} credenciales - Objeto con las credenciales del usuario.
 * @param {string} credenciales.email - Correo electronico del usuario.
 * @param {string} credenciales.password - Contrasena del usuario. 
 * @returns {Promise} Promesa con el token de sesion iniciada.
 */
export const login = (credenciales) => {
    return api.post('/usuarios/login', credenciales).then((respuesta) =>{
        localStorage.setItem('token', respuesta.data.token)
        return respuesta.data
    })
}

/**
 * Realiza una peticion GET al endpoint de me que nos permite recuperar
 * la informacion del usuario autenticado en la sesion actual. Requiere un
 * token de sesion activo.
 * 
 * @returns {Promise} Una promesa con los datos del usuario autenticado.
 */
export const me = () => {
    return api.get('/usuario/me').then((respuesta) => respuesta.data)
}

/**
 * Realiza una peticion POST al endpoint de ciere de sesion.
 * Elimina el token de inicio de sesion del localStorage del navegador
 * al completarse.
 * 
 * @returns {Promise} Promesa con la confirmacion de cierre de sesion.
 */
export const logout = () =>{
    return api.post('/usuarios/logout').then((respuesta) => {
        localStorage.removeItem('token')
        return respuesta.data
    })
}

/**
 * Realiza una peticion PATCH para actualizar parcialmente la informacion
 * del usuario con la sesion activa. Solo sera necesario enviar los campos 
 * a modificar.
 * 
 * Requiere un token de sesion activa.
 * 
 * @param {object} usuarioActualizado - Objeto con los campos a actualizar. 
 * @param {string} usuarioActualizado.nombre - Nuevo nombre del usuario (opcional).
 * @param {string} usuarioActualizado.email - Nuevo correo electronico del usuario (opcional).
 * @param  {string} usuarioActualizado.password - Nueva contrasena del usuario (opcional).
 * @returns {Promise} Promesa con los datos del usuario actualizado.
 */
export const update = (usuarioActualizado) => {
    return api.patch('/usaurios', usuarioActualizado).then((respuesta) => respuesta.data)
}