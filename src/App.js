import React from "react";
import SettingsPage from "./pages/SettingsPage";
import ErrorPage from "./pages/ErrorPage";
import PricesPage from "./pages/PricesPage"
import GraphPage from "./pages/GraphPage";
import MainPage from "./pages/MainPage";
import LinksPage from "./pages/LinksPage";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./LogicComp/AppRouter";

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  )
};

export default App;
