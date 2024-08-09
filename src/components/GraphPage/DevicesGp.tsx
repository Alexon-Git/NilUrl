import React, { useEffect, useState } from "react";
import MapGP from "./MapGP";
import "../../styles/GraphPage/DeviceGP.css";
import { DateFromServInterface } from "../../LogicComp/GPFakeData";
import SortButtonDev from "../buttons/SortButtonDev";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, ChartOptions } from 'chart.js';

// Регистрация необходимых компонентов Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortOption, setSortOption] = useState(0);
  const [flag, setFlag] = useState(false); // Flag for toggling view

  const categories = [
    { name: "Устройство", data: Device },
    { name: "Браузер", data: Browser },
    { name: "ОС", data: OC }
  ];

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

  // Processing data for pie chart
  const processPieData = (data: DualData[]) => {
    const totalClicks = data.reduce((sum, item) => sum + item.clicks, 0);
    const minDegree = 15; // Minimum degree to display a segment
    const minClicks = (minDegree / 360) * totalClicks;
    
    const sortedData = [...data].sort((a, b) => b.clicks - a.clicks);

    // Filtering data, keeping only those greater than the minimum clicks
    const topData = sortedData.filter(item => item.clicks >= minClicks);
    const otherData = sortedData.filter(item => item.clicks < minClicks);

    // Aggregating remaining items into "Other"
    if (otherData.length > 0) {
      const otherClicks = otherData.reduce((sum, item) => sum + item.clicks, 0);
      topData.push({ country: "Другое", clicks: otherClicks });
    }

    return topData;
  };

  // Data for pie chart
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
        '#00ACC1', // Google Cyan
        '#FF5733', // Example additional color 1
        '#FFC300', // Example additional color 2
        '#DAF7A6', // Example additional color 3
        '#FF8C00', // Example additional color 4
        '#E67E22', // Example additional color 5
        '#2ECC71'  // Example additional color 6
      ],
    }],
  };

  // Pie chart options
  const options: ChartOptions<"pie"> = {
    animation: {
      duration: 100, // Длительность общей анимации
      easing: 'easeOutQuart', // Функция easing для общей анимации
    },
    animations: {
      color: {
        duration: 100, // Длительность анимации изменения цвета
        easing: 'easeOutQuart', // Функция easing для анимации цвета
      },
      resize: {
        duration: 100, // Длительность анимации изменения размера
        easing: 'easeOutQuart', // Функция easing для анимации изменения размера
      },
      rotation: {
        duration: 100, // Длительность анимации вращения
        easing: 'easeOutQuart', // Функция easing для анимации вращения
      },
      tooltip: {
        duration: 100, // Длительность анимации всплывающих подсказок
        easing: 'easeOutQuart', // Функция easing для анимации всплывающих подсказок
      },
    },
  };

  return (
    <div className="AddressCountryDev">
      <div className="AddHeader">
        <div className="FontSizeTextGPDev">
          <SortButtonDev columns={columns} setSortOption={setSortOption} />
          <button
            className={`ToggleViewButton ${flag ? 'active' : ''}`}
            onClick={() => setFlag(!flag)}
          >
            <svg
              width="20"
              height="20"
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
          <div className="CategoryDev">
            {categories.map((category, index) => (
              <span
                key={index}
                className={`CategoryItem ${currentIndex === index ? 'selected' : ''}`}
                onClick={() => setCurrentIndex(index)}
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ height: "300px", overflowY: "auto", overflowX: "hidden", marginTop: "25px" }}>
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
                country_code={""}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DevicesGp;
