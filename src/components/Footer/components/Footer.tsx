import { Container } from "@mui/material";
import {MdFacebook} from 'react-icons/md';
import {AiFillTwitterCircle, AiFillInstagram, AiFillYoutube} from 'react-icons/ai';
import FooterStyle from '../css/Footer.module.css';
import { Link } from "react-router-dom";


const Footer = () => {
    return <footer className={FooterStyle.container}>


        <Container>
            <div className="flex flex-col md:flex-row
            justify-between
            pt-16
            pb-8">
                <FooterList>
                    <h3 className="text-base font-bold mb-2">Que ofrecemos</h3>
                    <a href='#'>Alquiler de Salas</a>
                    <a href='#'>Bar</a>
                    <a href='#'>Shows</a>
                    <a href='#'>Clases Personalizadas</a>
                </FooterList>
                <FooterList>
                    <h3 className="text-base font-bold mb-2">Que ofrecemos</h3>
                    <a href='#'>Servicio al Cliente</a>
                    <a href='#'>Reclamos</a>
                    <a href='#'>Contacto</a>
                    <a href='#'>Politicas</a>
                </FooterList>
                <FooterList>
                    <h3 className="text-base font-bold mb-2">Sobre Nosotros</h3>
                    <p className="mb-2">Somos El Multiespacio El juvenil
                        ofrecemos salas, clases y shows.
                    </p>
                </FooterList>
                <FooterList>
                
                    <h3 className="text-base font-bold mb-2">Seguinos</h3>
                    <div className="flex gap-2">
                    <a href='#'><MdFacebook size = {24}/></a>
                    <a href='#'><AiFillTwitterCircle size = {24}/></a>
                    <a href='#'><AiFillInstagram size = {24}/></a>
                    <a href='#'><AiFillYoutube size = {24}/></a>
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
