
import Carousel from "../../../Carousel/Carousel";
import CardStyles from "./css/cardEvent.module.css";

export interface PropsCard {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

const CardEventReverce: React.FC<PropsCard> = ({ title, subtitle, description, image }) => {

  const images = [
    { id: 1, url: `${image}`},
    { id: 2, url: 'http://eljuvenil.com/wp-content/uploads/2019/11/Sala1H.jpg' },
    { id: 3, url: 'http://eljuvenil.com/wp-content/uploads/2021/11/DSC07903-1536x1152.jpg' },
    { id: 4, url: 'http://eljuvenil.com/wp-content/uploads/2021/11/DSC07936-1024x768.jpg' },
    { id: 5, url: 'http://eljuvenil.com/wp-content/uploads/2019/11/Sala-4-88.jpg' },
    { id: 6, url: 'http://eljuvenil.com/wp-content/uploads/2019/11/Sala-5-5.jpg' }
  ];


  return (
    <>
      <div className={CardStyles.container_card_}>
        <div className={CardStyles.container_info}>
          <span className={CardStyles.container_info_title}>
           {title}
          </span>
          <span className={CardStyles.container_info_sub_title}>
            {subtitle}
          </span>
          <span className={CardStyles.container_info_description}>
            {description}
          </span>
          
        </div>
        <div className={CardStyles.container_image}>
        <Carousel images={images} />
        </div>
      </div>
    </>
  );
};

export default CardEventReverce;
