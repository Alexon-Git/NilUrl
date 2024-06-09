import React from 'react';
import "../../styles/GraphPage/GraphPage.css";
import { FaMobileAlt, FaDesktop, FaChrome, FaEdge, FaWindows, FaApple, FaLinux, FaAndroid, FaUbuntu, FaBlackberry,FaSafari,FaGlobe, FaFirefox,FaOpera} from 'react-icons/fa';
import { SiVivaldi } from "react-icons/si";
import { IconType } from 'react-icons';
import { TbDeviceDesktopQuestion } from "react-icons/tb";
import  CountryFlag  from 'react-country-flag';   
import { FaRegRectangleXmark } from "react-icons/fa6";

interface MapGpInterface {
    SVG: string,
    clickCount: number,
    name: string,
    category: string,
    country_code: string,
}

const getCategoryIcon = (category: string, name: string): IconType => {
    switch (category) {
        case "Устройство":
            return name === "Телефон" ? FaMobileAlt : FaDesktop;
        case "Браузер":
                switch (name) {
                    case "Chrome":
                        return FaChrome;
                    case "Edge":
                        return FaEdge;
                    case "Safari":
                        return FaSafari;
                    case "Default Browser":
                        return FaGlobe;
                    case "Android WebView":
                        return FaAndroid;
                    case "Firefox":
                        return FaFirefox;
                    case "Opera":
                        return FaOpera;
                    case "Vivaldi":
                        return SiVivaldi;
                    default:
                        return FaGlobe; 
                }
        case "ОС":
            switch (name) {
                case 'Windows 10':
                case 'Windows 8.1':
                case 'Windows 8':
                case 'Windows 7':
                case 'Windows Vista':
                case 'Windows Server 2003/XP x64':
                case 'Windows XP':
                case 'Windows 2000':
                case 'Windows ME':
                case 'Windows 98':
                case 'Windows 95':
                case 'Windows 3.11':
                    return FaWindows;
                case 'Mac OS X':
                case 'Mac OS 9':
                    return FaApple;
                case 'Linux':
                    return FaLinux;
                case 'Ubuntu':
                    return FaUbuntu;
                case 'iPhone':
                case 'iPod':
                case 'iPad':
                    return FaApple;
                case 'Android':
                    return FaAndroid;
                case 'BlackBerry':
                    return FaBlackberry;
                case 'Mobile':
                    return FaMobileAlt;
                default:
                    return TbDeviceDesktopQuestion; 
            }
        case "Страны":
            
        
        default:
            return FaDesktop; 
    }
}


  const MapGp = ({ SVG, clickCount, name, category, country_code }: MapGpInterface) => {
    const Icon = getCategoryIcon(category, name);
    return (
      <div className="MPContainerGP">
        <div className="ContainerForCountries">
          <span className="CountryName">
            {country_code === "Неизвестно" ? (
              <span style={{ marginRight: "10px" }}>
              <FaRegRectangleXmark />
            </span>
            ) : country_code ? (
              <CountryFlag countryCode={country_code} svg style={{ marginRight: "10px" }} />
            ) : (
              <Icon style={{ marginRight: "10px" }} />
            )}
            {name}
          </span>
          <span className="ClickCount">{clickCount}</span>
        </div>
      </div>
    );
  };
  
  export default MapGp;