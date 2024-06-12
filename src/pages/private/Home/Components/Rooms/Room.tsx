import CarouselImage from "../../../../../components/CarouselImages/CarouselImage";
import CardStyles from "./css/Room.module.css";

export interface PropsRoom {
  image: string;
  title: string;
  description: string;
}

const Room: React.FC<PropsRoom> = ({ title, description, image }) => {
  const images = [
    { id: 1, url: `${image}` },
    {
      id: 2,
      url: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala1H.jpg",
    },
    {
      id: 3,
      url: "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07903-1536x1152.jpg",
    },
    {
      id: 4,
      url: "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07936-1024x768.jpg",
    },
    {
      id: 5,
      url: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-4-88.jpg",
    },
    {
      id: 6,
      url: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-5-5.jpg",
    },
  ];

  return (
    <>
      <div className={CardStyles.container_card}>
        <div className={CardStyles.container_info}>
          <span className={CardStyles.container_info_title}>{title}</span>
          <span className={CardStyles.container_info_description}>
            {description}
          </span>
          <button className={CardStyles.container_info__button}>VER MAS</button>
        </div>
        <div className={CardStyles.container_image}>
          <CarouselImage images={images} />
        </div>
      </div>
    </>
  );
};

export default Room;
