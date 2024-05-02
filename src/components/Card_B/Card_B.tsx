import CardStyles from "./css/card_b.module.css";

export interface PropsCard {
  image: string;
  title: string;
  description: string;
}

const Card: React.FC<PropsCard> = ({ title, description, image }) => {
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
          <img
            className={CardStyles.container_image_img}
            src={image}
            alt="Foto de sala"
          />
        </div>
      </div>
    </>
  );
};

export default Card;
