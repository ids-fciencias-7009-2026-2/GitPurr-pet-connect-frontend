import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      // Petición al backend en Kotlin con la ruta y variable correctas
      const response = await axios.post('http://localhost:8080/usuarios/register', {
        nombre: nombre,
        email: correo, // Aquí mandamos el correo con la clave "email" que espera el backend
        password: password
      });

      if (response.status === 200 || response.status === 201) {
        setMensaje('¡Registro exitoso! Redirigiendo al login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setMensaje('Error al registrar usuario. Verifica los datos.');
      console.error("Error en Axios:", error);
    }
  };

  return (
    <div className="register-container">
      <h2>Crear Cuenta en Pet Connect</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>Correo:</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}; // <--- ¡ESTA es la llave y punto y coma que te faltaba!

export default Register;