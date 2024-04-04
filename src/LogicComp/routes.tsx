import MainPage from "../pages/MainPage";
import {
    ERRORPAGE_ROUTE,
    GRAPHPAGE_ROUTE,
    LINKSPAGE_ROUTE,
    MAINPAGE_ROUTE,
    PRICEPAGE_ROUTE,
    SETTINGPAGE_ROUTE
} from "./utils/Const";
import LinksPage from "../pages/LinksPage";
import GraphPage from "../pages/GraphPage";
import PricesPage from "../pages/PricesPage";
import SettingsPage from "../pages/SettingsPage";
import React, {JSX} from "react";
import ErrorPage from "../pages/ErrorPage";

export interface routerType {
    title: string;
    path: string;
    element: JSX.Element;
}


export const publicRoutes:routerType[] = [
    {
        path: MAINPAGE_ROUTE,
        element:<MainPage />,
        title:"MainPage"
    },
    {
        path: LINKSPAGE_ROUTE,
        element:<LinksPage/>,
        title:"LinksPage"
    },
    {
      path: GRAPHPAGE_ROUTE,
        element:<GraphPage/>,
        title:"GraphPage"
    },
    {
        path: PRICEPAGE_ROUTE,
        element: <PricesPage/>,
        title:"PricePage"
    },
    {
        path: SETTINGPAGE_ROUTE,
        element:<SettingsPage/>,
        title:"SettingPage"
    },
    {
        path: ERRORPAGE_ROUTE,
        element:<ErrorPage/>,
        title:"errorPAGE"
    }

]
