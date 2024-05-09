import Card, { PropsCard } from "../../../components/Card/Card";
import Card_H from "../../../components/Card_H/Card_H";
import Card_B from "../../../components/Card_B/Card_B";
import HomeStyle from "./css/Home.module.css";
import { Header } from "../../../components/Header/Header";
import CardEvent from "../../../components/Card_Events/CardEvent";
import Carousel from "../../../components/Carousel/Carousel";
import CarouselComp from "../../../components/CarouselComponents/CarouselComp";
import CardEventReverce from "../../../components/Card_Events/components/CardEventReverce/CardEventReverce";
import Footer from "../../../components/Footer/components/Footer"

const Home = () => {
  const objest: PropsCard[] = [
    {
      title: "Sala 1",
      description: "Espacio para Multi Eventos",
      image: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala1H.jpg",
    },
    {
      title: "Sala 2",
      description: "Espacio para Multi Eventos",
      image:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07903-1536x1152.jpg",
    },
    {
      title: "Sala 3",
      description: "Espacio para Multi Eventos",
      image:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07936-1024x768.jpg",
    },
    {
      title: "Sala 4",
      description: "Espacio para Multi Eventos",
      image: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-4-88.jpg",
    },
    {
      title: "Sala 5",
      description: "Espacio para Multi Eventos",
      image: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-5-5.jpg",
    },
    {
      title: "Sala 6",
      description: "Espacio para Multi Eventos",
      image:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07959-1536x1152.jpg",
    },
    {
      title: "Sala 7",
      description: "Espacio para Multi Eventos",
      image:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07985-1536x1152.jpg",
    },
    {
      title: "Sala 8",
      description: "Espacio para Multi Eventos",
      image: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-8-81.jpg",
    },
    {
      title: "Sala 9",
      description: "Espacio para Multi Eventos",
      image:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07922-1536x1152.jpg",
    },
    {
      title: "Sala 10",
      description: "Espacio para Multi Eventos",
      image:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07968-1536x1152.jpg",
    },
  ];

  const objestEvent: PropsCard[] = [
    {
      title: "Sala 1",
      description: "Espacio para Multi Eventos",
      image: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala1H.jpg",
    },
    {
      title: "Sala 2",
      description: "Espacio para Multi Eventos",
      image:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07903-1536x1152.jpg",
    },
    {
      title: "Sala 3",
      description: "Espacio para Multi Eventos",
      image:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07936-1024x768.jpg",
    },
    {
      title: "Sala 4",
      description: "Espacio para Multi Eventos",
      image: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-4-88.jpg",
    },
  ];

  const cards = [
    {
      id: 1,
      title: "Despertando Sueños",
      subtitle: "Evento se lleva a cabo en Sala 3 | sabado 08/05 a las 15hs",
      description: `Un Diálogo sobre Decisiones y Drogas. La vida es un escenario donde
          tú eres la estrella. Las drogas son actores secundarios que pueden
          arruinar tu actuación. ¡Elige vivir tu mejor versión!`,
      imageUrl: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala1H.jpg",
    },
    {
      id: 2,
      title: "Sala 2",
      subtitle: "Evento se lleva a cabo en Sala 3 | sabado 08/05 a las 15hs",
      description: "Espacio para Multi Eventos",
      imageUrl:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07903-1536x1152.jpg",
    },
    {
      id: 3,
      title: "Sala 3",
      subtitle: "Evento se lleva a cabo en Sala 3 | sabado 08/05 a las 15hs",
      description: "Espacio para Multi Eventos",
      imageUrl:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07936-1024x768.jpg",
    },
    {
      id: 4,
      title: "Sala 4",
      subtitle: "Evento se lleva a cabo en Sala 3 | sabado 08/05 a las 15hs",
      description: "Espacio para Multi Eventos",
      imageUrl: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-4-88.jpg",
    },
    {
      id: 5,
      title: "Sala 5",
      description: "Espacio para Multi Eventos",
      imageUrl: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-5-5.jpg",
    },
    {
      id: 6,
      title: "Sala 6",
      subtitle: "Evento se lleva a cabo en Sala 3 | sabado 08/05 a las 15hs",
      description: "Espacio para Multi Eventos",
      imageUrl:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07959-1536x1152.jpg",
    },
    {
      id: 7,
      title: "Sala 7",
      description: "Espacio para Multi Eventos",
      imageUrl:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07985-1536x1152.jpg",
    },
    {
      id: 8,
      title: "Sala 8",
      subtitle: "Evento se lleva a cabo en Sala 3 | sabado 08/05 a las 15hs",
      description: "Espacio para Multi Eventos",
      imageUrl: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-8-81.jpg",
    },
    {
      id: 9,
      title: "Sala 9",
      subtitle: "Evento se lleva a cabo en Sala 3 | sabado 08/05 a las 15hs",
      description: "Espacio para Multi Eventos",
      imageUrl:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07922-1536x1152.jpg",
    },
    {
      id: 10,
      title: "Sala 10",
      subtitle: "Evento se lleva a cabo en Sala 3 | sabado 08/05 a las 15hs",
      description: "Espacio para Multi Eventos",
      imageUrl:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07968-1536x1152.jpg",
    },
  ];

  return (
    <>
      <Header />

      <section className={HomeStyle.container__section_event}>
        <div className={HomeStyle.container_section_header}>
          <div className={HomeStyle.container_section_header_titles}>
            <div className={HomeStyle.title}>
              <h2 className={HomeStyle.title_link}>EVENTOS ESPECIALES</h2>
            </div>
            <div className={HomeStyle.sub_title}></div>
          </div>
        </div>
        <section className={HomeStyle.container__section_events}>
            
        <CarouselComp
            cards={cards}
            renderCard={(card) => {
              return (
                <CardEvent
                  description={card.description}
                  subtitle={card.subtitle}
                  image={card.imageUrl}
                  title={card.title}
                />
              );
            }}
          />
        </section>
      </section>

      <section className={HomeStyle.container__section_event}>
        <div className={HomeStyle.container_section_header}>
          <div className={HomeStyle.container_section_header_titles}>
            <div className={HomeStyle.title}>
              <h2 className={HomeStyle.title_link}>EVENTOS SEMANALES</h2>
            </div>
            <div className={HomeStyle.sub_title}></div>
          </div>
        </div>
        <section className={HomeStyle.container__section_events}>
          <CarouselComp
            cards={cards}
            renderCard={(card) => {
              return (
                <CardEventReverce
                  description={card.description}
                  subtitle={card.subtitle}
                  image={card.imageUrl}
                  title={card.title}
                />
              );
            }}
          />
        </section>
      </section>

      <section className={HomeStyle.container__section_room}>
        <div className={HomeStyle.container_section_header}>
          <div className={HomeStyle.container_section_header_titles}>
            <div className={HomeStyle.title}>
              <h2 className={HomeStyle.title_link}>
                Encuentra tu Espacio Creativo
              </h2>
            </div>
            <div className={HomeStyle.sub_title}>
              <span className={HomeStyle.sub_title_link}>Salas diponibles</span>
            </div>
          </div>
        </div>
        <section className={HomeStyle.container__section_rooms}>
          {objest.map((room) => (
            <Card_H
              description={room.description}
              image={room.image}
              title={room.title}
            />
          ))}
        </section>
      </section>

      <section className={HomeStyle.container__section_room}>
        <div className={HomeStyle.container_section_header}>
          <div className={HomeStyle.container_section_header_titles}>
            <div className={HomeStyle.title}>
              <h2 className={HomeStyle.title_link}>
                Encuentra tu Espacio Creativo
              </h2>
            </div>
            <div className={HomeStyle.sub_title}>
              <span className={HomeStyle.sub_title_link}>Salas diponibles</span>
            </div>
          </div>
        </div>
        <section className={HomeStyle.container__section_rooms}>
          {objest.map((room) => (
            <Card_B
              description={room.description}
              image={room.image}
              title={room.title}
            />
          ))}
        </section>
      </section>
      <Footer/>
    </>
    
);
};

export default Home;

