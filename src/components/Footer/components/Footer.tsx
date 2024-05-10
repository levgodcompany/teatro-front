import { Container } from "@mui/material";
import {MdFacebook} from 'react-icons/md';
import {AiFillTwitterCircle, AiFillInstagram, AiFillYoutube} from 'react-icons/ai';
import FooterStyle from '../css/Footer.module.css';
import { Link } from "react-router-dom";


const Footer = () => {
    return <footer className={FooterStyle.container}>


        <Container>
            <div className={FooterStyle.footer_container}>
                    
                    <div className={FooterStyle.footer_element}>
                    <h3 className={FooterStyle.footer_element}> Que ofrecemos</h3>
                    <Link  to='#'>Alquiler de Salas</Link>
                    <Link to='#'>Bar</Link>
                    <Link to='#'>Shows</Link>
                    <Link to='#'>Clases Personalizadas</Link>
                    </div>

                    <div className={FooterStyle.footer_element}>
                    <h3 className={FooterStyle.footer_element}>Atencion</h3>
                    <Link to='#'>Servicio al Cliente</Link>
                    <Link to='#'>Reclamos</Link>
                    <Link to='#'>Contacto</Link>
                    <Link to='#'>Politicas</Link>
                    </div>
             
                    <div className={FooterStyle.footer_element}>
                    <h3 className={FooterStyle.footer_element}>Sobre Nosotros</h3>
                    <p className={FooterStyle.footer_descripcion}>Somos El Multiespacio El juvenil
                        ofrecemos salas, clases y shows.
                    </p>
                    </div>
                
                    <div className={FooterStyle.footer_element}>
                    <h3 className={FooterStyle.footer_element}>Seguinos</h3>
                    <div className={FooterStyle.footer_redes}>
                    <Link to='#'><MdFacebook size = {24}/></Link>
                    <Link to='#'><AiFillTwitterCircle size = {24}/></Link>
                    <Link to='#'><AiFillInstagram size = {24}/></Link>
                    <Link to='#'><AiFillYoutube size = {24}/></Link>
                    </div>
                    </div>
                
               
            </div>


        </Container>
    </footer>
};


export default Footer
