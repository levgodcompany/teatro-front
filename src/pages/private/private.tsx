import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import RoutesWithNotFound from "../../utilities/RoutesWithNotFound.utility";
import { PrivateRoutes } from "../../routes/routes";


const Home = lazy(() => import("./Home/Home"));
const Local = lazy(() => import("./Local/Local"));
const Clients = lazy(() => import("./Clients/Clients"));
const Rooms = lazy(() => import("./Rooms/Rooms"));
const Room = lazy(() => import("./Room/Room"));
const Shifts = lazy(() => import("./Shifts/Shifts"));

function Private() {
  return (
    <RoutesWithNotFound>
      <Route index element={<Navigate to={`${PrivateRoutes.HOME}`} />} />
      <Route path={`${PrivateRoutes.HOME}`} element={<Home />} />
      <Route path={`${PrivateRoutes.LOCAL}`} element={<Local />} />
      <Route path={`${PrivateRoutes.CLIENTS}`} element={<Clients />} />
      <Route path={`${PrivateRoutes.ROOMS}`} element={<Rooms />} />
      <Route path={`${PrivateRoutes.ROOM}/*`} element={<Room />} />
      <Route path={`${PrivateRoutes.SHIFTS}`} element={<Shifts />} />
    </RoutesWithNotFound>
  );
}
export default Private;
