import FooterStyle from "./Footer.module.css";
import logoElJuvenil from "../../assets/el_juvenil.svg"

const Footer = ()=> {
    return <footer className={FooterStyle.container} >
        <div className={FooterStyle.container_img}>
            <img src={logoElJuvenil} alt="" />
        </div>

        <div className={FooterStyle.container}>

        </div>
    </footer>
}

export default Footer