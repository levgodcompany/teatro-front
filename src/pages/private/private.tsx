import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import RoutesWithNotFound from "../../utilities/RoutesWithNotFound.utility";
import { PrivateRoutes } from "../../routes/routes";


const Home = lazy(() => import("./Home/Home"));
const Perfil = lazy(() => import("./Clients/pages/Perfil/Perfil"));
const MyShifts = lazy(() => import("./Clients/pages/MyShifts/MyShifts"));
const Room = lazy(() => import("./Room/Room"));

function Private() {
  return (
    <RoutesWithNotFound>
      <Route index element={<Navigate to={`${PrivateRoutes.HOME}`} />} />
      <Route path={`${PrivateRoutes.HOME}`} element={<Home />} />
      <Route path={`${PrivateRoutes.CLIENTS}/my-shifts`} element={<MyShifts />} />
      <Route path={`${PrivateRoutes.CLIENTS}/perfil`} element={<Perfil />} />
      <Route path={`${PrivateRoutes.ROOM}/*`} element={<Room />} />
    </RoutesWithNotFound>
  );
}
export default Private;
