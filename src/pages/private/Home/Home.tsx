import { useEffect, useState } from "react";
import CarouselComp from "../../../components/CourserComps/CarouselComp";
import { Header } from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Room from "./Components/Rooms/Room";

import HomeStyle from "./css/Home.module.css";
import { getHttpLocalID } from "../../../services/LocalID.service";
import { useAppDispatch } from "../../../redux/hooks";
import { createLocalID } from "../../../redux/slices/LocalID.slice";
import { axiosInstance } from "../../../services/axios.service";

interface Imag {
  url: string;
  type: string;
}
const Home = () => {
  const dispatch = useAppDispatch();

  const [urls, setUrls] = useState<Imag[]>([]);

  const getIdLocal = async () => {
    const res = await getHttpLocalID();
    console.log(res);
    if (res) {
      dispatch(createLocalID(res));
    }
  };

  useEffect(() => {
    getIdLocal();

    const fech = async () => {
      const response = await axiosInstance.get<{ url: string; type: string }[]>(
        "/fire/files"
      );
      if (response) {
        console.log(urls);
        setUrls(response.data);
      }
    };

    fech();
  }, []);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axiosInstance.post<{ url: string }>(
        "/fire/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImageUrl(response.data.url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <Header />
      <main>
        <Sidebar />

        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>

          {imageUrl && (
            <video controls width="400" height="300">
              <source src={imageUrl} type="video/mp4" />
              {/* Añade más etiquetas <source> aquí para formatos de video adicionales */}
            </video>
          )}
        </div>

        <div>
          <h1>Imagenes</h1>
          {
            urls.map((im) => (
              <video controls width="400" height="300">
              <source src={im.url} type="video/mp4" />
              {/* Añade más etiquetas <source> aquí para formatos de video adicionales */}
            </video>
            ))

            /*
src="https://firebasestorage.googleapis.com/v0/b/in-english-baeee.appspot.com/o/avatars%2Fa4ac47d7-4880-4db0-9238-d6ef659929ec__webTromp1.jpeg?alt=media&token=8d3f7765-5b3e-442b-bde7-d3f945193cd8"
https://firebasestorage.googleapis.com/v0/b/in-english-baeee.appspot.com/o/avatars%2Faa46d52c-d951-4f5a-b75f-3ef5acdeba77__Captura%20de%20pantalla%202024-03-30%20235303.png?alt=media&token=e11c5425-32cc-48d3-bc87-edd516da44de
            */
          }
        </div>
      </main>
    </>
  );
};

export default Home;
