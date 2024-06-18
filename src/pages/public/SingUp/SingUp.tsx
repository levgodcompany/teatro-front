import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import formStyle from "./css/SingUp.module.css";
import logo from "../../../assets/el_juvenil.svg";
import AuthService from "../../../services/Auth.service";
import { createOwner } from "../../../redux/slices/Owner.slice";
import { createToken } from "../../../redux/slices/token.slice";

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

      const owner = await AuthService.register(formData.name, formData.phone, formData.email, formData.password);
      if(owner){
        dispatch(createOwner(owner))
        dispatch(createToken({token: owner.token}))
        navigate(`/home`, { replace: true });
      }
    } catch (error) {
      console.log(`Error al buscar el student: ${error}`);
    }
  };

  const handleSingIn = () => {
    navigate(`/singin`, { replace: true });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <>
      <main className={formStyle.main_form}>
        <div className={formStyle.container}>
          <div className={formStyle.container_inputs}>
            <div className={formStyle.container_image}>
              <img src={logo} alt="In English" width="80" height="80" />
            </div>
            <div className={formStyle.container_inputs_input}>
              <div className={formStyle.inputs_name_last}>
                <input
                  className={formStyle.inputText}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre Completo *"
                />
                <input
                  className={formStyle.inputText}
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Apellido Completo *"
                />
              </div>
              <input
                className={formStyle.inputText}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo Electronico *"
              />
              <input
                className={formStyle.inputText}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password *"
              />
            </div>
          </div>
          <div className={formStyle.container_button}>
            <button className={formStyle.buttonApply} onClick={handleSubmit}>
              Registrate
            </button>

            <div className={formStyle.space}></div>

            <button className={formStyle.button_singup} onClick={handleSingIn}>
              Iniciar sesión
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default SingUp;
