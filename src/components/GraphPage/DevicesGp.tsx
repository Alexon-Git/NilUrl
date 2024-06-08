import React, { useEffect, useState } from "react";
import MapGP from "./MapGP";
import "../../styles/GraphPage/DeviceGP.css";
import { DateFromServInterface } from "../../LogicComp/GPFakeData";
import SortButtonDev from "../buttons/SortButtonDev";

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

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? categories.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === categories.length - 1 ? 0 : prevIndex + 1));
  };

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

  const columns = [
    { label: "По умолчанию", value: 0 },
    { label: "Алфавит ↓", value: 1 },
    { label: "Алфавит ↑", value: 2 },
    { label: "По кликам ↓", value: 3 },
    { label: "По кликам ↑", value: 4 },
  ];

  return (
    <div className="AddressCountryDev">
      <div className="AddHeader" style={{marginBottom:"20px"}}>
        <div className="FontSizeTextGPDev">
          <span>Устройства</span>
          <SortButtonDev columns={columns} setSortOption={setSortOption} />
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
      {data.map((value, index) => (
        <div key={index}>
          <MapGP
            name={value.country}
            clickCount={value.clicks}
            SVG={"qwe"}
          />
        </div>
      ))}
    </div>
  );
};

export default DevicesGp;
