import { Container } from "@mui/material";
import FooterList from "./FooterList";
import {MdFacebook} from 'react-icons/md';
import {AiFillTwitterCircle, AiFillInstagram, AiFillYoutube} from 'react-icons/ai';
import FooterStyle from "./css/Footer.module.css";


const Footer = () => {
    return <footer className="bg-slate-700 
    text-slate-200
    text-sm mt16
    ">
        <Container>
            <div className="flex flex-col md:flex-row
            justify-between
            pt-16
            pb-8">
                <FooterList>
                    <h3 className="text-base font-bold mb-2">Que ofrecemos</h3>
                    <link href='#'>Alquiler de Salas</link>
                    <link href='#'>Bar</link>
                    <link href='#'>Shows</link>
                    <link href='#'>Clases Personalizadas</link>
                </FooterList>
                <FooterList>
                    <h3 className="text-base font-bold mb-2">Que ofrecemos</h3>
                    <link href='#'>Servicio al Cliente</link>
                    <link href='#'>Reclamos</link>
                    <link href='#'>Contacto</link>
                    <link href='#'>Politicas</link>
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
                    <link href='#'><MdFacebook size = {24}/></link>
                    <link href='#'><AiFillTwitterCircle size = {24}/></link>
                    <link href='#'><AiFillInstagram size = {24}/></link>
                    <link href='#'><AiFillYoutube size = {24}/></link>
                    </div>
                
                </FooterList>
            </div>


        </Container>
    </footer>
};


export default Footer
