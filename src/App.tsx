import { BrowserRouter, Navigate, Route } from "react-router-dom";

import { Suspense } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import RoutesWithNotFound from "./utilities/RoutesWithNotFound.utility";
import Home from "./pages/public/Home/Home";



function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando</div>}>
        <Provider store={store}>
          <RoutesWithNotFound>
          <Route path="" element={<Home />} />
          {/*<Route path={PublicRoutes.LOGIN} element={<Login />} />*/}
          </RoutesWithNotFound>
        </Provider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
