import formStyle from "./css/login.module.css";
import logo from "../../../assets/el_juvenil.svg";
import { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";

import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/Auth.service";
import { createOwner } from "../../../redux/slices/Owner.slice";
import { createToken } from "../../../redux/slices/token.slice";
import { PrivateRoutes } from "../../../routes/routes";

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




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const login = await AuthService.login(formData.email, formData.password);
      if(login){
        dispatch(createOwner(login))
        dispatch(createToken({token: login.token}))
        navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.HOME}`, { replace: true });

      }

    } catch (error) {
      console.log(`Error al buscar el student: ${error}`);
    }
  };

  const handleSingUp = ()=> {
    navigate(`/singup`, { replace: true });
  }

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
              <img src={logo} alt="LevGod" width="80" height="80" />
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
            <div  className={formStyle.reset_pass}>
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
