import formStyle from "./css/login.module.css";
import logo from "../../../assets/el_juvenil.svg";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/Auth.service";
import { createClient } from "../../../redux/slices/Client.slice";
import {
  createToken,
  getToken,
  initialStateToken,
  IToken,
  UserKey,
} from "../../../redux/slices/token.slice";
import { PrivateRoutes } from "../../../routes/routes";
import { createClientID } from "../../../redux/slices/ClientID.slice";
import { getHttpLocalID } from "../../../services/LocalID.service";
import { createLocalID } from "../../../redux/slices/LocalID.slice";
import { getLocalStorage } from "../../../utilities/localStorage.utility";

interface StudentForm {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [formData, setFormData] = useState<StudentForm>({
    email: "leandroveron1110@gmail.com",
    password: "LJVinformatica14_",
  });

  const token: IToken = useAppSelector((state) => state.token);

  const getIdLocal = async () => {
    const res = await getHttpLocalID();
    if (res) {
      dispatch(createLocalID(res));
      navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.HOME}`, {
        replace: true,
      });
    }
  };

  useEffect(() => {
    dispatch(getToken());
    if (token.token.length > 0) {
      getIdLocal();
      console.log("token", token.token);
    }

  }, [token.token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const login = await AuthService.login(formData.email, formData.password);
      if (login) {
        dispatch(createClient(login));
        dispatch(createToken({ token: login.token }));
        dispatch(createClientID({ id: login._id }));
      }
    } catch (error) {
      console.log(`Error al buscar el student: ${error}`);
    }
  };

  const handleSingUp = () => {
    navigate(`/singup`, { replace: true });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <main className={formStyle.main_form}>
        <div className={formStyle.container}>
          <div className={formStyle.container_inputs}>
            <div className={formStyle.container_image}>
              <img src={logo} alt="El Juvenil" width="80" height="80" />
            </div>
            <div className={formStyle.container_inputs_input}>
              <input
                className={formStyle.inputText}
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo Electronico"
              />
              <input
                className={formStyle.inputText}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
          </div>
          <div className={formStyle.container_button}>
            <button className={formStyle.buttonApply} onClick={handleSubmit}>
              Iniciar sesión
            </button>
            <div className={formStyle.reset_pass}>
              <a href="">¿ Olvidaste tu contraseña ?</a>
            </div>

            <div className={formStyle.space}></div>

            <button className={formStyle.button_singup} onClick={handleSingUp}>
              Crear cuenta nueva
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
