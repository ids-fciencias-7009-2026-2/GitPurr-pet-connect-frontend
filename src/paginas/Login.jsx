import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Mail, User } from "lucide-react"
import { login } from "../api/servicioUsuario"
import SolicitarCampo from "../componentes/SolicitarCampo"
import "../estilos/paginas/Login.css"
import "../estilos/componentes/SolicitarCampo.css"

/**
 * Pagina de inicio de sesion del usuario.
 * 
 * Permite al usuario autenticarse con sus credenciales (correo electronico
 * y contrasena). Si las credenciales son validas redirige al pefil del usuario,
 * de lo contrario muestra un mensaje de error en pantalla.
 * 
 * @returns {JSX.Element} Formulario de inicio de sesion con campos de correo 
 * electronico y contrasena. Muestra un mensaje de error condicional y 
 * muestra un enlace a la pagina de registro.
 */
function Login() {
    /**Permite redirigir al usuario entre paginas */
    const navegacion = useNavigate()

    /**Permite almacenar el correo electronico ingresado por el usuario */
    const [email, setEmail] = useState('')

    /**Permite almacenar la contrasena ingresada por el usuario */
    const [password, setPassword] = useState('')

    /**
     * Almacena el mensaje de error a mostrar
     * Es null cuando no se encuentran errores en la operacion.
     */
    const [errores, setErrores] = useState({
        email: null,
        password: null,
        general: null,
    })

    /** Expresion regular que delimita el formato del correo electronico. */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    /* const passwordRegex = /^/ */

    /**
     * Valida los campos del formulario de inicio de sesion.
     * 
     * Verifica que:
     * - El correo tenga un formato valido
     * - La contrasena no sea vacia o solo contenga espacios.
     * 
     * Actualiza el estado de los errores con los mensajes correspondientes.
     * 
     * @returns {boolean} true si no hay errores, false en caso contrario.
     */
    const validar = () => {
        const erroresNuevos = {
            email: null,
            password: null,
            general: null,
        }

        if (!emailRegex.test(email)) {
            erroresNuevos.email = 'Por favor ingresa un correo válido'
        }

        if (password.trim().length === 0) {
            erroresNuevos.password = 'Por favor ingresa una contraseña válida'
        }

        setErrores(erroresNuevos)
        return Object.values(erroresNuevos).every(error => error === null)
    }

    /**
     * Maneja el envio del formulario de inicio de sesion.
     * 
     * Llama al servicio de autenticacion de las credenciales ingresadas
     * y redirige al perfil del usuario en caso de ser validas. En caso 
     * de que ocurra un error en la operacion actualiza el mensaje almacenado
     * en error.
     * 
     * @param {Event} event - evento de envio del formulario. 
     */
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!validar()) return
        try {
            await login({ email, password })
            navegacion('/home')
        } catch (error) {
            setErrores(prev => ({
                ...prev,
                general: 'Credenciales No Validas'
            }))
        }
    }


    return (
        <div className="pagina-inicio-sesion">
            <div className="inicio-sesion-video-side">
                <div className="text-container">
                    <h2>Pet Connect</h2>
                    <p>Cambien sus vidas para siempre.</p>
                </div>
                <video autoPlay loop muted playsInline>
                    <source src="/recursos/videos/pet-video-asset.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="inicio-sesion-side">
                <div className="inicio-sesion-card">
                    <i className="fa-solid fa-paw login-icon"></i>
                    <h2>Bienvenido de vuelta!</h2>
                    <p className="subtitulo-inicio-sesion">Inicia sesion para encontrar a tu nuevo compañero</p>
                    <form onSubmit={handleSubmit}>
                        <SolicitarCampo
                            id="email"
                            etiqueta="Dirección de correo electrónico"
                            tipo="email"
                            placeholder="usuario@ejemplo.com"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value)
                                setErrores(prev => ({...prev,general:null}))
                            }}
                            icono={<Mail size={20}/>}
                            error={errores.email}
                        />
                        <SolicitarCampo
                            id="password"
                            etiqueta="Ingresa tu contraseña"
                            tipo="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            icono={<User size={20}/>}
                            error={errores.password}
                        />
                        {errores.general && <p className="mensaje-error">{errores.general}</p>}
                        <button type="submit">Iniciar Sesión</button>
                    </form>
                </div>
                <p>No tienes una cuenta? <Link to="/register">Crear cuenta nueva</Link></p>
            </div>
        </div>
    )
}

export default Login