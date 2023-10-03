import React, { useState } from "react";
import Navbar from "../Components/Navbar";

const Perfil = () => {
  // Estado para almacenar los datos del perfil
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    bio: "Este es mi perfil.",
  });

  // Estado para habilitar o deshabilitar la edición
  const [isEditing, setIsEditing] = useState(false);

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos actualizados al servidor o realizar otras acciones necesarias
    setIsEditing(false);
  };

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
                <label htmlFor="firstName" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={profileData.firstName}
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
