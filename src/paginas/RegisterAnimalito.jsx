import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PawPrint, Heart, Dog, Cat } from "lucide-react";
import { registrarAnimalito } from "../api/servicioAnimalito";
import SolicitarCampo from "../componentes/SolicitarCampo";
import "../estilos/paginas/Register.css";

function RegisterAnimalito() {
    const navigate = useNavigate();

    const [formulario, setFormulario] = useState({
        nombre: "",
        edad: "",
        especie: "",
        raza: "",
        sexo: "",
        tamano: "",
        descripcion: "",
        codigoPostal: "",
        latitudAprox: "",
        longitudAprox: "",
        fotoUrl: ""
    });

    const [mensaje, setMensaje] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMensaje("");

        try {
            await registrarAnimalito({
                nombre: formulario.nombre,
                edad: formulario.edad,
                especie: formulario.especie,
                raza: formulario.raza,
                sexo: formulario.sexo,
                tamano: formulario.tamano,
                descripcion: formulario.descripcion,
                codigoPostal: formulario.codigoPostal,
                latitudAprox: formulario.latitudAprox ? Number(formulario.latitudAprox) : null,
                longitudAprox: formulario.longitudAprox ? Number(formulario.longitudAprox) : null,
                fotoUrl: formulario.fotoUrl || "/recursos/imagenes/pet-shop.png"
            });

            setMensaje("¡Animalito registrado con éxito! Redirigiendo al inicio...");

            setTimeout(() => {
                navigate("/home");
            }, 1500);

        } catch (error) {
            console.error("Error al registrar animalito:", error);

            if (error.response && error.response.status === 401) {
                setMensaje("Tu sesión no es válida. Inicia sesión nuevamente.");
                sessionStorage.removeItem("token");
                setTimeout(() => navigate("/login"), 1500);
            } else {
                setMensaje("Error al registrar el animalito. Verifica los datos.");
            }

            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="decoraciones-fondo">
                <PawPrint className="icono-fondo paw-1" />
                <Heart className="icono-fondo heart-1" />
                <Dog className="icono-fondo dog-1" />
                <Cat className="icono-fondo cat-1" />
            </div>

            <main className="register-container">
                <div>
                    <img
                        src="/recursos/imagenes/pet-shop.png"
                        alt="Logo Pet Connect"
                        className="register-logo"
                    />
                    <h1 className="register-title">Registra un animalito</h1>
                    <p className="register-subtitle">
                        Comparte la información básica de la mascota para que pueda aparecer en PetConnect.
                    </p>
                </div>

                <div className="register-card">
                    <div className="register-card-bar"></div>

                    <div className="register-card-body">
                        <div className="register-icon-container">
                            <PawPrint size={32} />
                        </div>

                        <h2 className="card-title">Datos del animalito</h2>
                        <p className="card-subtitle">
                            La ubicación será aproximada para proteger la privacidad del usuario.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <SolicitarCampo
                                    id="nombre"
                                    etiqueta="Nombre"
                                    tipo="text"
                                    placeholder="Ej. Luna"
                                    value={formulario.nombre}
                                    onChange={handleChange}
                                    name="nombre"
                                />
                            </div>

                            <div className="form-group">
                                <SolicitarCampo
                                    id="edad"
                                    etiqueta="Edad"
                                    tipo="text"
                                    placeholder="Ej. 2 años"
                                    value={formulario.edad}
                                    onChange={handleChange}
                                    name="edad"
                                />
                            </div>

                            <div className="form-group">
                                <label>Especie</label>
                                <select name="especie" value={formulario.especie} onChange={handleChange} className="input-select" required>
                                    <option value="">Selecciona una opción</option>
                                    <option value="Perro">Perro</option>
                                    <option value="Gato">Gato</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <SolicitarCampo
                                    id="raza"
                                    etiqueta="Raza"
                                    tipo="text"
                                    placeholder="Ej. Mestizo"
                                    value={formulario.raza}
                                    onChange={handleChange}
                                    name="raza"
                                />
                            </div>

                            <div className="form-group">
                                <label>Sexo</label>
                                <select name="sexo" value={formulario.sexo} onChange={handleChange} className="input-select" required>
                                    <option value="">Selecciona una opción</option>
                                    <option value="Hembra">Hembra</option>
                                    <option value="Macho">Macho</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Tamaño</label>
                                <select name="tamano" value={formulario.tamano} onChange={handleChange} className="input-select" required>
                                    <option value="">Selecciona una opción</option>
                                    <option value="Pequeño">Pequeño</option>
                                    <option value="Mediano">Mediano</option>
                                    <option value="Grande">Grande</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea
                                    name="descripcion"
                                    value={formulario.descripcion}
                                    onChange={handleChange}
                                    placeholder="Describe brevemente al animalito"
                                    className="input-textarea"
                                />
                            </div>

                            <div className="form-group">
                                <SolicitarCampo
                                    id="codigoPostal"
                                    etiqueta="Código postal"
                                    tipo="text"
                                    placeholder="Ej. 04510"
                                    value={formulario.codigoPostal}
                                    onChange={handleChange}
                                    name="codigoPostal"
                                />
                            </div>

                            <div className="form-group">
                                <SolicitarCampo
                                    id="fotoUrl"
                                    etiqueta="URL de foto"
                                    tipo="text"
                                    placeholder="Opcional"
                                    value={formulario.fotoUrl}
                                    onChange={handleChange}
                                    name="fotoUrl"
                                />
                            </div>

                            <div className="form-group">
                                <SolicitarCampo
                                    id="latitudAprox"
                                    etiqueta="Latitud aproximada"
                                    tipo="number"
                                    placeholder="Opcional"
                                    value={formulario.latitudAprox}
                                    onChange={handleChange}
                                    name="latitudAprox"
                                />
                            </div>

                            <div className="form-group">
                                <SolicitarCampo
                                    id="longitudAprox"
                                    etiqueta="Longitud aproximada"
                                    tipo="number"
                                    placeholder="Opcional"
                                    value={formulario.longitudAprox}
                                    onChange={handleChange}
                                    name="longitudAprox"
                                />
                            </div>

                            {mensaje && (
                                <div className={`mensaje-alerta ${mensaje.includes("éxito") ? "mensaje-exito" : "mensaje-error"}`}>
                                    {mensaje}
                                </div>
                            )}

                            <button type="submit" disabled={isSubmitting} className="btn-submit">
                                {isSubmitting ? "Registrando..." : "Registrar animalito"}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

export default RegisterAnimalito;