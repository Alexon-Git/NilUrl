import React from 'react';
import "../../styles/GraphPage/"

interface MapGpInterface{
    SVG:string,
    clickCount:number,
    name:string,
}

const MapGp = ({SVG,clickCount,name}:MapGpInterface) => {
    return (
        <div className="MPContainerGP">
                <div className="ContainerForCountries" style={{display:"inline-flex"}}>
                    <div style={{display:"inline-flex"}}>
                        <div style={{marginLeft:"10px"}}>
                            {name}
                        </div>
                    </div>
                    <div style={{color:"grey",paddingLeft:"20px"}}>{clickCount}</div>
            </div>
        </div>
    );
};

export default MapGp;
