import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Login from "../Login"
import Register from "../Resgister"
import Dashboard from "../Pages/Dashboard"
import Perfil from "../Pages/Perfil"

const Routers = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/Registro" element={<Register />} />

        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Perfil" element={<Perfil />} />

        {/* Agrega más rutas según tus necesidades */}
      </Routes>
    </Router>
  );
};

export default Routers