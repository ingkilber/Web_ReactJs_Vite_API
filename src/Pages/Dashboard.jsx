import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Swal from 'sweetalert2'

const Dashboard = () => {

    // Recupera el token de localStorage
    const authToken = localStorage.getItem('authToken')

    const [users, setUsers] = useState([])

    // Eliminar usuario
    const deleteUser = (IdDelete) => {
        if (IdDelete) {
            // Muestra una alerta de confirmación antes de eliminar
            Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción no se puede deshacer.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    // Si el usuario confirma, realiza la eliminación
                    fetch(`http://127.0.0.1:8000/api/user/${IdDelete}`, {
                        method: 'DELETE', // O cambia a 'DELETE' si es necesario
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    })
                        .then((response) => {
                            if (response.ok) {
                                Swal.fire({
                                    title: 'Eliminado',
                                    text: 'El usuario ha sido eliminado correctamente.',
                                    icon: 'success',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Aceptar',
                                })
                                // Recarga la lista de usuarios después de una eliminación exitosa
                                return fetchUsers();
                            } else {
                                // Muestra un mensaje de alerta de que el usuario no tiene permisos
                                Swal.fire({
                                    title: 'Acceso denegado',
                                    text: 'Solo el administrador puede realizar esta acción.',
                                    icon: 'error',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Aceptar',
                                });
                                throw new Error('La solicitud no fue exitosa');
                            }
                        })
                        .catch((error) => {
                            console.error('Error en la solicitud:', error);
                        });
                }
            });
        }
    }

    // Listar usuarios
    const fetchUsers = () => {
        if (authToken) {
            fetch('http://127.0.0.1:8000/api/users', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('La solicitud no fue exitosa');
                    }
                })
                .then((data) => {
                    setUsers(data.users);
                })
                .catch((error) => {
                    console.error('Error en la solicitud:', error);
                });
        }
    };

    useEffect(() => {
        fetchUsers()
    }, []);

    return (
        <div>

            <Navbar />

            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-12 p-5">
                        <h1><i className="fa fa-table" aria-hidden="true"></i> Tabla de Usuarios</h1>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Correo Electrónico</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {Array.isArray(users) && users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <button className="btn btn-primary me-2">
                                                    Ver Perfil
                                                </button>
                                                <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No se encontraron usuarios.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard