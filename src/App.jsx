import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  const backgroundStyle = {
    backgroundImage: 'url("https://img.freepik.com/vector-gratis/fondo-particulas-tecnologia-realista-abstracta_52683-33064.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={backgroundStyle}
    >
      <div className="card col-md-2 d-flex flex-column">
        <div className="card-header text-center">
          <img
            src="https://img.freepik.com/vector-premium/k-letter-colorful-logo-gradient-vector_161396-900.jpg?w=140"
            alt="Logo React"
          />
          <h2>Iniciar Sesión</h2>
        </div>
        <div className="card-body">
          {/* Aquí coloca los campos de inicio de sesión (por ejemplo, email y contraseña) */}
          <form>
            {/* Campos de inicio de sesión */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input type="password" className="form-control" id="password" />
            </div>

            {/* Botón de inicio de sesión */}
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-outline-primary">
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <p className="text-center">
            ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App