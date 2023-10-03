import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Perfil = () => {

  const authToken = localStorage.getItem("authToken")
  const id = localStorage.getItem('id') // Obtiene el ID del usuario

  const navigate = useNavigate()

  // Estado para almacenar los datos del perfil
  const [profileData, setProfileData] = useState({
    name: "",
    lastName: "administrador",
    email: "",
    bio: "Este es mi perfil.",
  })

  // const [editedProfileData, setEditedProfileData] = useState({ ...profileData })

  // Habilitar o deshabilitar la edición
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("La solicitud no fue exitosa");
        }
      })
      .then((data) => {
        console.log("🚀 ~ file: Perfil.jsx:38 ~ .then ~ data:", data)
        // Encontrar el usuario específico por ID
        const user = data.users.find((user) => user.id === parseInt(id, 10))
        if (user) {
          // Actualizar el estado con los datos del perfil
          setProfileData({
            name: user.name,
            email: user.email,
          })
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      })
  }, [authToken, id])

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos actualizados al servidor o realizar otras acciones necesarias
    fetch(`http://127.0.0.1:8000/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(profileData),
    })
      .then((response) => {
        if (response.ok) {

          Swal.fire({
            icon: "success",
            title: "Usuario actualizado exitosamente",
            text: "¡Actualizado!",
          });

          setIsEditing(false)
          // Redirige al usuario a la página de Dashboard
        navigate('/Dashboard')

        } else {
          throw new Error("La solicitud no fue exitosa");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      })
  }

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        {/* <div className="col-md-12 mb-4">
        <a href="/dashboard" className="btn btn-secondary">
          Ir Atrás (Dashboard)
        </a>
      </div> */}

        <h2>Mi Perfil</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Avatar</label>
              <img
                src="https://yt3.googleusercontent.com/vRF8BHREiJ3Y16AbMxEi_oEuoQlnNNqGpgULuZ6zrWSAi24HcxX3Vko42RN8ToctH-G0qlWd=s900-c-k-c0x00ffffff-no-rj"
                alt="Avatar"
                className="img-fluid rounded-circle"
              />
              {isEditing && (
                <div className="mt-3">
                  <label className="form-label">Cambiar Avatar</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="col-md-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Apellido
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bio" className="form-label">
                  Biografía
                </label>
                <textarea
                  className="form-control"
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                ></textarea>
              </div>
              {isEditing ? (
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary me-2">
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Editar
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Perfil;
