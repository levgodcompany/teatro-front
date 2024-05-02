import Card, { PropsCard } from "../../../components/Card/Card";
import Card_H from "../../../components/Card_H/Card_H";
import HomeStyle from './css/Home.module.css'

const Home = ()=> {

    const objest: PropsCard[] = [
        {
            title: "Sala 1",
            description: "Espacio para Multi Eventos",
            image: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala1H.jpg"
        },
        {
            title: "Sala 2",
            description: "Espacio para Multi Eventos",
            image: "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07903-1536x1152.jpg"
        },
        {
            title: "Sala 3",
            description: "Espacio para Multi Eventos",
            image: "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07936-1024x768.jpg"
        },
        {
            title: "Sala 4",
            description: "Espacio para Multi Eventos",
            image: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-4-88.jpg"
        },
        {
            title: "Sala 5",
            description: "Espacio para Multi Eventos",
            image: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-5-5.jpg"
        },
        {
            title: "Sala 6",
            description: "Espacio para Multi Eventos",
            image: "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07959-1536x1152.jpg"
        },
        {
            title: "Sala 7",
            description: "Espacio para Multi Eventos",
            image: "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07985-1536x1152.jpg"
        },
        {
            title: "Sala 8",
            description: "Espacio para Multi Eventos",
            image: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-8-81.jpg"
        },
        {
            title: "Sala 9",
            description: "Espacio para Multi Eventos",
            image: "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07922-1536x1152.jpg"
        },
        {
            title: "Sala 10",
            description: "Espacio para Multi Eventos",
            image: "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07968-1536x1152.jpg"
        },
    ]


    return <>
    <section className={HomeStyle.container__section_room} >
        <div className={HomeStyle.container_section_header}>
            <div className={HomeStyle.container_section_header_titles}>
                <div className={HomeStyle.title}>
                    <h2 className={HomeStyle.title_link}>Encuentra tu Espacio Creativo</h2>
                </div>
                <div className={HomeStyle.sub_title}>
                    <span className={HomeStyle.sub_title_link}>Salas diponibles</span>
                </div>
            </div>

        </div>
        <section className={HomeStyle.container__section_rooms}>
            {
                objest.map(room => <Card description={room.description} image={room.image} title={room.title} /> )
            }
        </section>
    </section>


    <section className={HomeStyle.container__section_room} >
        <div className={HomeStyle.container_section_header}>
            <div className={HomeStyle.container_section_header_titles}>
                <div className={HomeStyle.title}>
                    <h2 className={HomeStyle.title_link}>Encuentra tu Espacio Creativo</h2>
                </div>
                <div className={HomeStyle.sub_title}>
                    <span className={HomeStyle.sub_title_link}>Salas diponibles</span>
                </div>
            </div>

        </div>
        <section className={HomeStyle.container__section_rooms}>
            {
                objest.map(room => <Card_H description={room.description} image={room.image} title={room.title} /> )
            }
        </section>
    </section>

    </>
}

export default Home;