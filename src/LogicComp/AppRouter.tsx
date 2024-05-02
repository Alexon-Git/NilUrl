import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {publicRoutes, routerType} from "./routes";
import {MAINPAGE_ROUTE} from "./utils/Const";
import MainPage from "../pages/MainPage";
const AppRouter = () => {
    const navigate = useNavigate()
    // useEffect(()=>{
    //     navigate('Main')
    // },[])
    return (
        <Routes>
            <Route index key={"mainPage"} path={MAINPAGE_ROUTE}  element={<MainPage/>}/>
            {publicRoutes.map(({path,title,element}:routerType)=>
                <Route key={title} path={path}  element={element}/>
            )};
        </Routes>
    );
};

export default AppRouter;
