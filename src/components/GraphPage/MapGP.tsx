import React from 'react';
import "../../styles/GraphPage/GraphPage.css"

interface MapGpInterface {
    SVG: string,
    clickCount: number,
    name: string,
}

const MapGp = ({ SVG, clickCount, name }: MapGpInterface) => {
    return (
        <div className="MPContainerGP">
            <div className="ContainerForCountries">
                <span className="CountryName">{name}</span>
                <span className="ClickCount">{clickCount}</span>
            </div>
        </div>
    );
};

export default MapGp;
