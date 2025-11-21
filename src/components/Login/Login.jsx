import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [userForm, setUserForm] = useState({ name: "", password: "" });
  const { user, login } = useAuthContext();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/admin/alta-productos" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const success = login(userForm.name, userForm.password);
  if (success) {
    toast.success("Inicio de sesión exitoso");
    navigate("/admin/alta-productos");
  } else {
    toast.error("Credenciales incorrectas. Usuario: admin, Contraseña: 1234");
    setUserForm({ name: "", password: "" });
  }
};

return (
  <div className="login-container">
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <div>
        <label htmlFor="name">Usuario:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={userForm.name}
          onChange={handleChange}
          placeholder="Ingrese su usuario"
          aria-label="Usuario"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={userForm.password}
          onChange={handleChange}
          placeholder="Ingrese su contraseña"
          aria-label="Contraseña"
          required
        />
      </div>
      <button type="submit">Ingresar</button>
    </form>
  </div>
);
};