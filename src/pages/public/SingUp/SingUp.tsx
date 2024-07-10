import { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import formStyle from "./css/SingUp.module.css";
import logo from "../../../assets/el_juvenil.svg";
import AuthService from "../../../services/Auth.service";
import { createClient } from "../../../redux/slices/Client.slice";
import { createToken } from "../../../redux/slices/token.slice";
import { createClientID } from "../../../redux/slices/ClientID.slice";

interface StudentForm {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

const SingUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<StudentForm>({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const owner = await AuthService.register(
        `${formData.name};${formData.lastName}`,
        formData.phone,
        formData.email,
        formData.password
      );
      if (owner) {
        dispatch(createClient(owner));
        dispatch(createClientID({ id: owner._id }));
        dispatch(createToken({ token: owner.token }));
        navigate(`/theater/home`, { replace: true });
      }
    } catch (error) {
      console.log(`Error al registrar el usuario: ${error}`);
    }
  };

  const handleSignIn = () => {
    navigate(`/singin`, { replace: true });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className={formStyle.main_form}>
      <div className={formStyle.signup_container}>
        <div className={formStyle.signup_inputs_container}>
          <div className={formStyle.signup_image_container}>
            <img src={logo} alt="El Juvenil" width="80" height="80" />
          </div>
          <div className={formStyle.signup_inputs}>
            <div className={formStyle.signup_name_last_inputs}>
              <input
                className={formStyle.signup_input}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre Completo *"
              />
              <input
                className={formStyle.signup_input}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Apellido Completo *"
              />
            </div>
            <input
              className={formStyle.signup_input}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo Electrónico *"
            />
            <input
              className={formStyle.signup_input}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña *"
            />
          </div>
        </div>
        <div className={formStyle.signup_buttons}>
          <button
            className={formStyle.signup_button_apply}
            onClick={handleSubmit}
          >
            Registrarse
          </button>
          <div className={formStyle.signup_space}></div>
          <button
            className={formStyle.signup_button_singup}
            onClick={handleSignIn}
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </main>
  );
};

export default SingUp;
