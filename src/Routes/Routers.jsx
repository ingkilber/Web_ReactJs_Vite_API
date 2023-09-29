import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import App from "../App"
import Login from "../Login"
import Register from "../Resgister"

const Routers = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        {/* Agrega más rutas según tus necesidades */}
      </Routes>
    </Router>
  );
};

export default Routers