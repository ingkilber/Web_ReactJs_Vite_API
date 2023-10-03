import { Link } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const backgroundStyle = {
  backgroundImage: 'url("https://img.freepik.com/vector-gratis/fondo-particulas-tecnologia-realista-abstracta_52683-33064.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

const Login = () => {

  // Estados para almacenar los valores de email y contraseña
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Datos a enviar
      });
      // response.status === 200
      if (response.ok) {

        const data = await response.json()
        const authToken = data.token
        const id = data.user_id

        // Almacena el token en localStorage
        localStorage.setItem('authToken', authToken)

        // Almacena el id en localStorage
        localStorage.setItem('id', id)

        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          text: "¡Bienvenido!",
        });

        console.log("Inicio de sesión exitoso", response);

        // Redirige al usuario a la página de Dashboard
        navigate('/Dashboard');

      } else {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Correo o contraseña incorrectos',
        })

        console.error('Inicio de sesión fallido')
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error)
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={backgroundStyle}
    >
      <div className="card col-md-2 d-flex flex-column">
        <div className="card-header text-center">
          <img src="https://img.freepik.com/vector-premium/k-letter-colorful-logo-gradient-vector_161396-900.jpg?w=140" alt="Logo React" />
          <h2>Iniciar Sesión</h2>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">

              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-outline-primary">
                Iniciar Sesión
              </button>
            </div>

          </form>
        </div>
        <div className="card-footer">
          <p className="text-center">
            ¿No tienes una cuenta? <Link to="/Registro">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login