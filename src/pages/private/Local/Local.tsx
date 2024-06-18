import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getLocal, IImage, ILocal } from "./services/Local.service";
import { Header } from "../../../components/Header/Header";
import LocalStyle from "./css/Local.module.css";
import Card from "./Components/Card_B/InfoLocal";
import HighlightedImages from "./Components/HighlightedImages/HighlightedImages";
import OpeningHours from "./Components/OpeningHours/OpeningHours";
import ServicesList from "./Components/ServicesList/ServicesList";
import { createLocal } from "../../../redux/slices/Local.slice";

const Local = () => {
  const dispatch = useAppDispatch();

  //const [local, setLocal] = useState<ILocal | null>(null);

  const local = useAppSelector((state) => state.local);

  const getLocalLoad = async () => {
    const res = await getLocal();
    if (res) {
      const objest: {
        image: string;
        title: string;
        description: string;
      }[] = [
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
          image:
            "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-4-88.jpg",
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
          image:
            "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-8-81.jpg",
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

      const transformedImages: IImage[] = objest.map((obj) => ({
        url: obj.image,
        description: obj.description,
      }));

      res.additionalImages = transformedImages;
      dispatch(createLocal(res))
  //    setLocal(res);
    }
  };

  useEffect(() => {
    getLocalLoad();
  }, []);

  return (
    <>
      <Sidebar />
      <Header />

      {local ? (
        <>
          <main className={LocalStyle.main_container}>
            <section>
              <Card
                image={local.mainImage.url}
                title={local.name}
                email={local.email}
                phone={local.phone}
                address={local.address}
                description={local.description}
              />
            </section>
            <section>
              <OpeningHours openingDays={local.openingHours} />
            </section>
            <section>
              <ServicesList services={local.services} />
            </section>
            <section className={LocalStyle.section_images_additional}>
              <HighlightedImages
                onViewMore={(index) => console.log("A ver mas", index)}
                onEdit={(index) => console.log("A editar", index)}
                onDelete={(index) => console.log("A eliminar", index)}
                images={local.additionalImages}
              />
            </section>
          </main>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Local;
