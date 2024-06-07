import React, { useEffect, useRef, useState } from 'react';
import MapGP from "./MapGP";
import "../../styles/GraphPage/AddresGp.css";
import { DateFromServInterface } from "../../LogicComp/GPFakeData";
import SortButtonGP from "../buttons/SortButtonGP"

interface AddresGpInt {
    Dates: DateFromServInterface[];
}

interface DualData {
    country: string;
    clicks: number;
}

const DevicesGp = ({ Dates }: AddresGpInt) => {
    const [data, setData] = useState<DualData[]>([]);
    const [Device, setDevice] = useState<DualData[]>([]);
    const [OC, setOC] = useState<DualData[]>([]);
    const [Browser, setBrowser] = useState<DualData[]>([]);
    const [state, setState] = useState([true, false, false]);
    const refToBack = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const device: DualData[] = [];
        const oc: DualData[] = [];
        const browser: DualData[] = [];

        Dates.forEach((value) => {
            let deviceFlag = false;
            device.forEach((d) => {
                if (d.country === value.device) {
                    d.clicks++;
                    deviceFlag = true;
                }
            });
            if (!deviceFlag) {
                device.push({ country: value.device, clicks: 1 });
            }

            let ocFlag = false;
            oc.forEach((o) => {
                if (o.country === value.os) {
                    o.clicks++;
                    ocFlag = true;
                }
            });
            if (!ocFlag) {
                oc.push({ country: value.os, clicks: 1 });
            }

            let browserFlag = false;
            browser.forEach((b) => {
                if (b.country === value.browser) {
                    b.clicks++;
                    browserFlag = true;
                }
            });
            if (!browserFlag) {
                browser.push({ country: value.browser, clicks: 1 });
            }
        });

        setDevice(device);
        setOC(oc);
        setBrowser(browser);
        setData(device); 
    }, [Dates]);

    const clickDevice = () => {
        if (refToBack.current !== null && !state[0]) {
            refToBack.current.style.transition = "0.2s ease-in";
            refToBack.current.style.left = "-1px";
            setState([true, false, false]);
            setData(Device);
        }
    };

    const clickGoogle = () => {
        if (refToBack.current !== null && !state[1]) {
            refToBack.current.style.transition = "0.2s ease-in";
            refToBack.current.style.left = "102px";
            setState([false, true, false]);
            setData(Browser);
        }
    };

    const clickOC = () => {
        if (refToBack.current !== null && !state[2]) {
            refToBack.current.style.transition = "0.2s ease-in";
            refToBack.current.style.left = "206px";
            setState([false, false, true]);
            setData(OC);
        }
    };

    const sortData = (type: string) => {
        let sortedData = [...data];
        switch (type) {
            case "alphabeticalAsc":
                sortedData.sort((a, b) => a.country.localeCompare(b.country));
                break;
            case "alphabeticalDesc":
                sortedData.sort((a, b) => b.country.localeCompare(a.country));
                break;
            case "clicksAsc":
                sortedData.sort((a, b) => a.clicks - b.clicks);
                break;
            case "clicksDesc":
                sortedData.sort((a, b) => b.clicks - a.clicks);
                break;
            default:
                break;
        }
        setData(sortedData);
    };

    const columns = [
        { label: "Дата ↓", value: 0 },
        { label: "Дата ↑", value: 1 },
        { label: "По алфаdfdfdfвиту ↓", value: 2 },
        { label: "По алфdfdfdfавиту ↑", value: 3 },
        { label: "По рейdfdfdтингу ↓", value: 4 },
        { label: "По рейтdfdfdfингу ↑", value: 5 }
    ];

    return (
        <div>
            <div className="AddressCountry">
                <div className="FontSizeTextGP">
                    Устройства
                </div>
                
                <div className="CotainerForBackAddress">
                    <div onClick={clickDevice} className="CountryGPinAd">
                        Устройство
                    </div>
                    <div onClick={clickGoogle} className="CountryGPinAd">
                        Браузер
                    </div>
                    <div onClick={clickOC} className="CityGPinAd">
                        ОС
                    </div>
                    <div ref={refToBack} className="BackForAddress"></div>
                </div>
                
            </div>
            <div className="SortDropdown" >
            <SortButtonGP columns={columns} />
                <select onChange={(e) => sortData(e.target.value)}>
                    <option value="">Sort</option>
                    <option value="alphabeticalAsc">(А-Я)</option>
                    <option value="alphabeticalDesc">(Я-А)</option>
                    <option value="clicksAsc">(↑)</option>
                    <option value="clicksDesc">(↓)</option>
                </select>
            </div>
            {data.map((value, index) => (
                <MapGP name={value.country} clickCount={value.clicks} key={index} SVG={"qwe"} />
            ))}
        </div>
    );
};

export default DevicesGp;
