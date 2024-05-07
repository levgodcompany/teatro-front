import { Box, Typography } from "@mui/material"
import Diseno from "../../../assets/el_juvenil.svg"
import styleComponent from './../css/name.module.css'

interface NameParam {
    toHome: ()=> void;
}

export const Name: React.FC<NameParam> = ({toHome}) => {
    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div onClick={toHome}  className={styleComponent.container} >
                <img src={Diseno} width="50rem" />
                <Typography variant="h6" component="div" fontSize={14} color={'#9E2D49'}>El Juvenil</Typography>

            </div>
        </Box>
    )
}