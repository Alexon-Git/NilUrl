import React from 'react';
import "../../styles/MainPage/Clients.css"

const Clients = () => {
    return (
        <div style={{marginBottom:"50px"}}>
            <div className="Clients">
            Клиенты
            </div>
            <div className="RowsPicsMP">
                <img src={process.env.PUBLIC_URL + '/ClientsRow.png'} className="PicsMPClients"/>
            </div>
            <div className="RowsPicsMP">
                <img src={process.env.PUBLIC_URL +"/ClientsRow2.png"} className="PicsMPClients"/>
            </div>
        </div>
    );
};

export default Clients;
