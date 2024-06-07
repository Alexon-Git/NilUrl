import React, { useRef, useState, useEffect } from 'react';
import "../../styles/GraphPage/AddresGp.css";
import MapGP from "./MapGP";
import { DateFromServInterface } from "../../LogicComp/GPFakeData";
import SortButtonGP from "../buttons/SortButtonGP"

interface AddresGpInt {
    Dates: DateFromServInterface[];
}

interface DualData {
    country: string;
    clicks: number;
}

const AddresGp = ({ Dates }: AddresGpInt) => {
    const [flag, setFlag] = useState(false);
    const [data, setData] = useState<DualData[]>([]);
    const [Countries, setCountries] = useState<DualData[]>([]);
    const [City, setCity] = useState<DualData[]>([]);
    const refToBack = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const countries: DualData[] = [];
        const city: DualData[] = [];

        Dates.forEach((value) => {
            let countryFlag = false;
            countries.forEach((country) => {
                if (country.country === value.country) {
                    country.clicks++;
                    countryFlag = true;
                }
            });
            if (!countryFlag) {
                countries.push({ country: value.country, clicks: 1 });
            }

            let cityFlag = false;
            city.forEach((cityData) => {
                if (cityData.country === value.city) {
                    cityData.clicks++;
                    cityFlag = true;
                }
            });
            if (!cityFlag) {
                city.push({ country: value.city, clicks: 1 });
            }
        });

        setCountries(countries);
        setCity(city);
        setData(countries);
    }, [Dates]);

    const clickCountry = () => {
        if (refToBack.current !== null && flag) {
            refToBack.current.style.transition = "0.2s ease-in";
            refToBack.current.style.left = "-1px";
            setFlag(false);
            setData(Countries);
        }
    };

    const clickCity = (event: React.MouseEvent<HTMLDivElement>) => {
        if (refToBack.current !== null && !flag) {
            refToBack.current.style.transition = "0.2s ease-in";
            refToBack.current.style.left = "103px";
            setFlag(true);
            setData(City);
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
        { label: "По алфавиту ↓", value: 2 },
        { label: "По алфавиту ↑", value: 3 },
        { label: "По рейтингу ↓", value: 4 },
        { label: "По рейтингу ↑", value: 5 }
    ];

    return (
        <div>
            <div className="AddressCountry">
                <div className="FontSizeTextGP">
                    Адреса
                </div>
                <div className="CotainerForBackAddress">
                    <div onClick={clickCountry} className="CountryGPinAd">
                        Cтрана
                    </div>
                    <div onClick={clickCity} className="CityGPinAd">
                        Город
                    </div>
                    <div ref={refToBack} className="BackForAddress"></div>
                </div>
            </div>
            <div className="SortDropdown">
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

export default AddresGp;
