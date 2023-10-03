import { Link } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Register = () => {
    const backgroundStyle = {
        backgroundImage: 'url("https://img.freepik.com/vector-gratis/fondo-particulas-tecnologia-realista-abstracta_52683-33064.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    // Estados para almacenar los valores del formulario de registro
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setConfirmPassword] = useState('');

    // Envío del formulario de registro
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Verifica si las contraseñas coinciden
        if (password !== password_confirmation) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden',
            })
            return
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ name, email, password, password_confirmation }), // Datos a enviar
            });

            if (response.ok) {

                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: '¡Bienvenido!',
                    didClose: () => {
                        // Redirigir al login después de que el usuario cierre la alerta
                        window.location.href = '/';
                    },
                })

            } else if (response.status === 422) {
                // Correo electrónico ya existe
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'El correo electrónico ya existe',
                })

            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error en el registro',
                })

            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={backgroundStyle}>
            <div className="card col-md-3 d-flex flex-column">
                <div className="card-header text-center">
                    <img src="https://img.freepik.com/vector-premium/k-letter-colorful-logo-gradient-vector_161396-900.jpg?w=140" alt="Logo React" />
                    <h2>Regístrate</h2>
                </div>
                <div className="card-body">
                    {/* Formulario de registro */}
                    <form onSubmit={handleSubmit}>
                        {/* Campo de nombre */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        {/* Campo de correo electrónico */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Campo de contraseña */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Campo de confirmación de contraseña */}
                        <div className="mb-3">
                            <label htmlFor="password_confirmation" className="form-label">Confirmar Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password_confirmation"
                                value={password_confirmation}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Botón de registro */}
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-outline-primary">Registrarse</button>
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <p className="text-center">¿Ya tienes una cuenta? <Link to="/">Iniciar Sesión</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register