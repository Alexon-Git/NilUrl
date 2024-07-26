import React, { useRef, useState, useEffect } from "react";
import "../../styles/GraphPage/DeviceGP.css";
import MapGP from "./MapGP";
import { DateFromServInterface } from "../../LogicComp/GPFakeData";
import SortButtonAdd from "../buttons/SortButtonAdd";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Регистрация необходимых компонентов Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

interface AddresGpInt {
  Dates: DateFromServInterface[];
}

interface DualData {
  country: string;
  clicks: number;
  country_code: string;
}

const AddresGp = ({ Dates }: AddresGpInt) => {
  const [flag, setFlag] = useState(false); // Флаг для переключения вида
  const [data, setData] = useState<DualData[]>([]);
  const [Countries, setCountries] = useState<DualData[]>([]);
  const [City, setCity] = useState<DualData[]>([]);
  const [countryCode, setCountryCode] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortOption, setSortOption] = useState(0);

  const categories = [
    { name: "Страны", data: Countries },
    { name: "Города", data: City }
  ];

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
        countries.push({ country: value.country, clicks: 1, country_code: value.country_code });
      }

      let cityFlag = false;
      city.forEach((cityData) => {
        if (cityData.country === value.city) {
          cityData.clicks++;
          cityFlag = true;
        }
      });
      if (!cityFlag) {
        city.push({ country: value.city, clicks: 1, country_code: value.country_code });
      }
    });

    setCountries(countries);
    setCity(city);
    setData(countries);
  }, [Dates]);

  useEffect(() => {
    setData(categories[currentIndex].data);
  }, [currentIndex, categories]);

  useEffect(() => {
    let sortedData = [...categories[currentIndex].data];
    switch (sortOption) {
      case 0:
        sortedData = [...categories[currentIndex].data];
        break;
      case 1:
        sortedData.sort((a, b) => a.country.localeCompare(b.country));
        break;
      case 2:
        sortedData.sort((a, b) => b.country.localeCompare(a.country));
        break;
      case 3:
        sortedData.sort((a, b) => b.clicks - a.clicks);
        break;
      case 4:
        sortedData.sort((a, b) => a.clicks - b.clicks);
        break;
      default:
        break;
    }
    setData(sortedData);
  }, [sortOption, data]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? categories.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === categories.length - 1 ? 0 : prevIndex + 1));
  };

  const columns = [
    { label: "Алфавит ↓", value: 1 },
    { label: "Алфавит ↑", value: 2 },
    { label: "По кликам ↓", value: 3 },
    { label: "По кликам ↑", value: 4 },
  ];

  // Данные для круговой диаграммы
  const pieData = {
    labels: data.map(d => d.country),
    datasets: [{
      data: data.map(d => d.clicks),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }],
  };

  return (
    <div className="AddressCountryDev">
      <div className="AddHeader">
        <div className="FontSizeTextGPDev">
          <span>Адреса</span>
          <SortButtonAdd columns={columns} setSortOption={setSortOption} />
        </div>
        <div className="DeviceSwapDev">
          <button className="NavigationButtonDev" onClick={handlePrev}>
            ⬅
          </button>
          <div className="CategoryDev">{categories[currentIndex].name}</div>
          <button className="NavigationButtonDev" onClick={handleNext}>
            ➡
          </button>
          <button
            className={`ToggleViewButton ${flag ? 'active' : ''}`}
            onClick={() => setFlag(!flag)}
          >
            {flag ? 'Показать список' : 'Показать диаграмму'}
          </button>
        </div>
      </div>
      <div style={{ height: "300px", overflowY: "auto", marginTop: "25px" }}>
        {flag ? (
          <Pie data={pieData} />
        ) : (
          data.map((value, index) => (
            <div key={index}>
              <MapGP
                name={value.country}
                clickCount={value.clicks}
                SVG={"qwe"}
                category={categories[currentIndex].name}
                country_code={value.country_code}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddresGp;
