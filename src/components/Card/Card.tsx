import CardStyles from './css/card.module.css'

const Card = () => {
    return (
        <div className= {CardStyles.contenedor_actividad}>
            <img 
            className= {CardStyles.imagen_actividad}
            src= ''
            alt="Foto de sala" />
            <div className={CardStyles.contenedor_texto_actividad}>
                <p className={CardStyles.nombre_actividad}> nombre </p>
                <p className={CardStyles.detalle_actividad}> detalle </p>
                <p className={CardStyles.texto_actividad}> texto </p>
            </div>
        </div>
        
    )
}

export default Card;