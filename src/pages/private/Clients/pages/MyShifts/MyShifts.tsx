import { Header } from "../../../../../components/Header/Header";
import Footer from "../../../../../components/Footer/Footer";
import MyShiftsStyle from "./MyShifts.module.css";
import Clients from "./components/Clients";

const MyShifts = () => {
  return (
    <>
      <Header />

      <div className={MyShiftsStyle.container}>
        <Clients />
      </div>
      <Footer />
    </>
  );
};

export default MyShifts;
