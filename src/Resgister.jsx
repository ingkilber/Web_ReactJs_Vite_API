import { Link } from 'react-router-dom'

const Register = () => {
    const backgroundStyle = {
        backgroundImage: 'url("https://img.freepik.com/vector-gratis/fondo-particulas-tecnologia-realista-abstracta_52683-33064.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={backgroundStyle}>
            <div className="card col-md-3 d-flex flex-column">
                <div className="card-header text-center">
                    <img src="https://img.freepik.com/vector-premium/k-letter-colorful-logo-gradient-vector_161396-900.jpg?w=140" alt="Logo React" />
                    <h2>Regístrate</h2>
                </div>
                <div className="card-body">
                    {/* Formulario de registro */}
                    <form>
                        {/* Campo de nombre */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="name" />
                        </div>

                        {/* Campo de correo electrónico */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input type="email" className="form-control" id="email" />
                        </div>

                        {/* Campo de contraseña */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="password" />
                        </div>

                        {/* Campo de confirmación de contraseña */}
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                            <input type="password" className="form-control" id="confirmPassword" />
                        </div>

                        {/* Botón de registro */}
                        <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-outline-primary">Registrarse</button>
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <p className="text-center">¿Ya tienes una cuenta? <Link to="/Login">Iniciar Sesión</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;
