/**
 * Componente reutilizable para campos de formularios.
 * 
 * Agrupa una etiqueta y un input con caracteristicas especificas
 * con la finalidad de evitar repetir codigo.
 * 
 * @param {string} id - Identificador unico del campo.
 * @param {string} etiqueta - Texto de la etiqueta de campo.
 * @param {string} tipo - Tipo de input.
 * @param {string} placeholder - Texto de ayuda dentro del campo.
 * @param {string} value - Valor actual del campo.
 * @param {Function} onChange - Funcion que se ejecuta al escribir en el campo.
 * @param {string} error - Mensaje de error del campo en caso de tenerlo.
 * @returns {JSX.Element} label e input agrupados dentro de un contenedor.
 */
function SolicitarCampo ({id,etiqueta,tipo,placeholder,value,onChange,error,icono}) {
    return(
   <div className="solicitud-campo">
        <label htmlFor={id}>{etiqueta}</label>
        <div className="solicitud-input-wrapper">
            {icono && <span className="solicitud-input-icon">{icono}</span>}
            <input
                id={id}
                name={id}
                type={tipo}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={icono ? "con-icono" : ""}
            />
        </div>
        {error && <p className="error-de-campo">{error}</p>}
    </div>
   ) 
}

export default SolicitarCampo