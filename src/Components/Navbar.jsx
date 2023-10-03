import { NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
const Navbar = () => {

  // Recupera el token de localStorage
  const authToken = localStorage.getItem('authToken')

  const navigate = useNavigate()

  // Cerrar sesión
  const handleLogout = () => {
    fetch(`http://127.0.0.1:8000/api/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: 'Éxito',
          text: 'La sesión se ha cerrado correctamente.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
        })
        // Cierre de sesión exitoso, redirige al usuario
        navigate('/')
      } else {
        // Manejar errores o mostrar un mensaje de error
        console.error('Error al cerrar sesión');
        Swal.fire({
          title: 'Error',
          text: 'Error al cerrar sesión',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
        });
      }
    })
    .catch((error) => {
      console.error('Error en la solicitud de cierre de sesión:', error)
    })
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand" href="/Dashboard">
          <i className="fa fa-tachometer" aria-hidden="true"></i> Dashboard
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/Dashboard">
                <i className="fa fa-home" aria-hidden="true"></i> <span className="d-none d-lg-inline">Inicio</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fa fa-table" aria-hidden="true"></i> <span className="d-none d-lg-inline">Ver Tabla</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fa fa-bar-chart" aria-hidden="true"></i> <span className="d-none d-lg-inline">Estadísticas</span>
              </a>
            </li>

            <li className="nav-item ms-3">
              <img
                    src="https://yt3.googleusercontent.com/vRF8BHREiJ3Y16AbMxEi_oEuoQlnNNqGpgULuZ6zrWSAi24HcxX3Vko42RN8ToctH-G0qlWd=s900-c-k-c0x00ffffff-no-rj"
                    alt="Avatar"
                    className="rounded-circle mr-2"
                    width="32"
                    height="32"
                  />
            </li>
            
            <li className="nav-item">
              <NavDropdown id="basic-nav-dropdown" alignRight>
                <NavDropdown.Item href="/Perfil">Editar Perfil</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
              </NavDropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar