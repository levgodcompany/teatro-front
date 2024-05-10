import ID_CardStyles from "./css/card.module.css";

export interface PropsCard {
  name: string;
  mail: string;
}

const ID_Card: React.FC<PropsCard> = ({ name, mail }) => {
  return (
    <>
      <div className={ID_CardStyles.container_card}>
       
        <div className={ID_CardStyles.container_info}>
          <span className={ID_CardStyles.container_info_title}>{name}</span>
          <span className={ID_CardStyles.container_info_description}>{mail}</span>
        </div>
       
      </div>
    </>
  );
};

export default ID_Card;
