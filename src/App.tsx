import { BrowserRouter, Navigate, Route } from "react-router-dom";

import { Suspense } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import RoutesWithNotFound from "./utilities/RoutesWithNotFound.utility";
import SingUp from "./pages/public/SingUp/SingUp";
import Login from "./pages/public/Login/Login";
import AuthGuard from "./guards/auth.guard";
import { PrivateRoutes } from "./routes/routes";
import Private from "./pages/private/private";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando</div>}>
        <Provider store={store}>
          <RoutesWithNotFound>
            <Route
              path="/"
              element={
                <Navigate
                  to={`${PrivateRoutes.PRIVATE}/${PrivateRoutes.HOME}`}
                  replace
                />
              }
            />
            <Route path="singup" element={<SingUp />} />
            <Route path="singin" element={<Login />} />
            <Route element={<AuthGuard privateValidation={true} />}>
              <Route
                path={`${PrivateRoutes.PRIVATE}/*`}
                element={<Private />}
              />
            </Route>
          </RoutesWithNotFound>
        </Provider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
