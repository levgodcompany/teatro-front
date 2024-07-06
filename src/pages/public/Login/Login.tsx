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
  IToken,
} from "../../../redux/slices/token.slice";
import { PrivateRoutes } from "../../../routes/routes";
import { createClientID } from "../../../redux/slices/ClientID.slice";
import { getHttpLocalID } from "../../../services/LocalID.service";
import { createLocalID } from "../../../redux/slices/LocalID.slice";
import PasswordReset from "./components/PasswordReset/PasswordReset";

interface StudentForm {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<StudentForm>({
    email: "",
    password: "",
  });
  const [isPass, setIsPass] = useState<boolean>(false);
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

  const handlePass = () => {
    setIsPass(!isPass);
  };

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

  const handleSignUp = () => {
    navigate(`/singup`, { replace: true });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className={formStyle.main_form}>
      {isPass ? (
        <PasswordReset vol={handlePass} />
      ) : (
        <div className={formStyle.login_container}>
          <div className={formStyle.login_inputs_container}>
            <div className={formStyle.login_image_container}>
              <img src={logo} alt="El Juvenil" width="80" height="80" />
            </div>
            <div className={formStyle.login_inputs}>
              <input
                className={formStyle.login_input}
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo Electrónico"
              />
              <input
                className={formStyle.login_input}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
              />
            </div>
          </div>
          <div className={formStyle.login_buttons}>
            <button
              className={formStyle.login_button_apply}
              onClick={handleSubmit}
            >
              Iniciar sesión
            </button>
            <div className={formStyle.login_reset_password}>
              <a onClick={handlePass}>¿Olvidaste tu contraseña?</a>
            </div>
            <div className={formStyle.login_space}></div>
            <button
              className={formStyle.login_button_singup}
              onClick={handleSignUp}
            >
              Crear cuenta nueva
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Login;
