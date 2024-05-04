import MainPage from "../pages/MainPage";
import {
    ERRORPAGE_ROUTE,
    GRAPHPAGE_ROUTE,
    LINKSPAGE_ROUTE, LOGINPAGE_ROUTE,
    MAINPAGE_ROUTE,
    PRICEPAGE_ROUTE, REGPAGE_ROUTE,
    SETTINGPAGE_ROUTE
} from "./utils/Const";
import LinksPage from "../pages/LinksPage";
import GraphPage from "../pages/GraphPage";
import PricesPage from "../pages/PricesPage";
import SettingsPage from "../pages/SettingsPage";
import React, {JSX} from "react";
import ErrorPage from "../pages/ErrorPage";
import Reg from "../pages/Regest";
import Log from "../pages/Login";

export interface routerType {
    title: string;
    path: string;
    element: JSX.Element;
}


export const publicRoutes:routerType[] = [
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
    },
    {
      path:LOGINPAGE_ROUTE,
      element:<Log/>,
      title:"loginPage",
    },
    {
        path:REGPAGE_ROUTE,
        element:<Reg/>,
        title:"registration"
    }
]
