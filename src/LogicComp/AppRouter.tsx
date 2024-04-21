import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {publicRoutes, routerType} from "./routes";
const AppRouter = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        navigate('Main')
    },[])
    return (
        <Routes>
            {publicRoutes.map(({path,title,element}:routerType)=>
                <Route key={title} path={path}  element={element}/>
            )};
        </Routes>
    );
};

export default AppRouter;
