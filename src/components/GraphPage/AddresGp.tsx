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

  // Обработка данных для круговой диаграммы
  const processPieData = (data: DualData[]) => {
    // Сортируем данные по количеству кликов
    const sortedData = [...data].sort((a, b) => b.clicks - a.clicks);
    
    // Ограничиваем количество элементов до 6
    const topData = sortedData.slice(0, 5);
    const otherData = sortedData.slice(5);

    // Объединяем оставшиеся элементы в одну категорию "Другое"
    if (otherData.length > 0) {
      const otherClicks = otherData.reduce((sum, item) => sum + item.clicks, 0);
      topData.push({ country: "Другое", clicks: otherClicks, country_code: "" });
    }

    return topData;
  };

  // Данные для круговой диаграммы
  const pieData = {
    labels: processPieData(data).map(d => d.country),
    datasets: [{
      data: processPieData(data).map(d => d.clicks),
      backgroundColor: [
        '#4285F4', // Google Blue
        '#DB4437', // Google Red
        '#F4B400', // Google Yellow
        '#0F9D58', // Google Green
        '#AB47BC', // Google Purple
        '#00ACC1'  // Google Cyan
      ],
    }],
  };

  // Настройки для анимации диаграммы
  const options = {
    animation: {
      duration: 500, // Устанавливаем длительность анимации на 500 миллисекунд
    },
  };

  return (
    <div className="AddressCountryDev">
      <div className="AddHeader">
        <div className="FontSizeTextGPDev">
          <span>Адреса</span>
          <SortButtonAdd columns={columns} setSortOption={setSortOption} />
          <button
            className={`ToggleViewButton ${flag ? 'active' : ''}`}
            onClick={() => setFlag(!flag)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`ToggleViewIcon ${flag ? 'active' : ''}`}
            >
              <path d="M21 10C21 6.13401 17.866 3 14 3V10H21Z" stroke={flag ? "#FFFFFF" : "#000000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 21C15.4183 21 19 17.4183 19 13H11V5C6.58172 5 3 8.58172 3 13C3 17.4183 6.58172 21 11 21Z" stroke={flag ? "#FFFFFF" : "#000000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="DeviceSwapDev">
          <button className="NavigationButtonDev" onClick={handlePrev}>
            ⬅
          </button>
          <div className="CategoryDev">{categories[currentIndex].name}</div>
          <button className="NavigationButtonDev" onClick={handleNext}>
            ➡
          </button>
        </div>
      </div>
      <div style={{ height: "300px", overflowY: "auto", marginTop: "25px" }}>
        {flag ? (
          <Pie data={pieData} options={options} />
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
