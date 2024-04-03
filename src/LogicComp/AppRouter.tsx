import React from 'react';
import {Route, Routes} from "react-router-dom";
import {publicRoutes, routerType} from "./routes";
const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(({path,title,element}:routerType)=>
                <Route key={title} path={path}  element={element}/>
            )};
        </Routes>
    );
};

export default AppRouter;
