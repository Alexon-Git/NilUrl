import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/GraphPage/GraphPage.css";
import GPPeriod from "../components/GraphPage/GPPeriod";
import Chart from "../components/GraphPage/Chart";
import AddresGp from "../components/GraphPage/AddresGp";
import DevicesGp from "../components/GraphPage/DevicesGp";
import RefsGp from "../components/GraphPage/RefsGp";
import TopRefs from "../components/GraphPage/TopRefs";
import { useNavigate } from "react-router-dom";
import HeaderLinksPage from "../components/Global/HeaderLinksPage";
import HeaderLinksPageFree from "../components/Global/HeaderLinksPageFree";
import transition from "../LogicComp/Transition";
import useAuth from "../pages/useAuth";
import { SortData } from "../LogicComp/GPFakeData";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Helmet } from 'react-helmet';

const GraphPage = () => {
  const location = useLocation();
  const {pathS} = location.state || {};
  const [loading, setLoading] = useState(true);
  const [userStatus, setUserStatus] = useState(null);
  const [DataFromServ, setDataFromServ] = useState([]);
  const [period, setPeriod] = useState(1);
  const [clicks, setClicks] = useState([1, 2, 3, 4]);
  const [niz, setNiz] = useState(["qwe", "qwe", "asd", "asd"]);
  const navigate = useNavigate();
  const accessToken = Cookies.get("access_token");
  const [dateFake, setDateFake] = useState([]);
  const {isLoggedIn, isLoading, isRedirected, setIsRedirected} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Формирование URL с параметром pathS, если он не null
        let url = 'https://nilurl.ru:8000/data_clicks_user_all.php';
        if (pathS) {
          url += `?pathS=${encodeURIComponent(pathS)}`;
        }

        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include'
        });

        const result = await response.json();

        if (result.success === false) {
          window.location.reload();
        } else {
          setDataFromServ(result);
          setLoading(false);
        }
      } catch (error) {
        console.error('Ошибка:', error);

      }
    };

    fetchData();
  }, [pathS]);

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const user_status = decodedToken.user_status;
      setUserStatus(user_status);
    }
    if (!isLoading && !isLoggedIn && !isRedirected) {
      setIsRedirected(true);
      navigate('/login');
    }
  }, [isLoading, isLoggedIn, navigate, isRedirected, setIsRedirected, accessToken]);

  const ChangePeriod = (prop) => {
    setPeriod(prop);
  };
  let summ = 0;
  clicks.map((value, index, array) => {
    summ += value;
  });
  useEffect(() => {
    let today = new Date(Date.now() - 1000 * 3600 * 4);
    let arrayC = [];
    let labels = [];
    let filteredData = [];

    switch (period) {
      case 0:
        filteredData = SortData(DataFromServ, 0);
        arrayC = [0, 0, 0];
        labels = ["0-20 минут назад", "20-40 минут назад", "40-60 минут назад"];
        filteredData.forEach((valueq) => {
          const value = new Date(valueq.time);
          const condition = today.getTime() - value.getTime();
          if (condition <= 1000 * 60 * 20) arrayC[0]++;
          else if (condition <= 1000 * 60 * 40) arrayC[1]++;
          else if (condition <= 1000 * 60 * 60) arrayC[2]++;
        });
        break;
      case 1:
        filteredData = SortData(DataFromServ, 1);
        arrayC = [0, 0, 0, 0, 0, 0];
        labels = ["0-4 часов назад", "4-8 часов назад", "8-12 часов назад", "12-16 часов назад", "16-20 часов назад", "20-24 часов назад"];
        filteredData.forEach((valueq) => {
          const value = new Date(valueq.time);
          const condition = today.getTime() - value.getTime();
          if (condition <= 4 * 3600 * 1000) arrayC[0]++;
          else if (condition <= 8 * 3600 * 1000) arrayC[1]++;
          else if (condition <= 12 * 3600 * 1000) arrayC[2]++;
          else if (condition <= 16 * 3600 * 1000) arrayC[3]++;
          else if (condition <= 20 * 3600 * 1000) arrayC[4]++;
          else if (condition <= 24 * 3600 * 1000) arrayC[5]++;
        });
        break;
      case 2:
        filteredData = SortData(DataFromServ, 2);
        arrayC = [0, 0, 0, 0, 0, 0, 0];
        labels = ["сегодня", "1 день назад", "2 дня назад", "3 дня назад", "4 дня назад", "5 дней назад", "6 дней назад"];
        filteredData.forEach((valueq) => {
          const value = new Date(valueq.time);
          const condition = today.getTime() - value.getTime();
          if (condition <= 24 * 3600 * 1000) arrayC[0]++;
          else if (condition <= 2 * 24 * 3600 * 1000) arrayC[1]++;
          else if (condition <= 3 * 24 * 3600 * 1000) arrayC[2]++;
          else if (condition <= 4 * 24 * 3600 * 1000) arrayC[3]++;
          else if (condition <= 5 * 24 * 3600 * 1000) arrayC[4]++;
          else if (condition <= 6 * 24 * 3600 * 1000) arrayC[5]++;
          else if (condition <= 7 * 24 * 3600 * 1000) arrayC[6]++;
        });
        break;
      case 3:
        filteredData = SortData(DataFromServ, 3);
        arrayC = new Array(30).fill(0);
        labels = Array.from({length: 30}, (_, i) => i + 1);
        filteredData.forEach((valueq) => {
          const value = new Date(valueq.time);
          const condition = today.getTime() - value.getTime();
          for (let i = 0; i < 30; i++) {
            if (condition <= 24 * 3600 * 1000 * (i + 1) && condition > 24 * 3600 * 1000 * i) {
              arrayC[i]++;
            }
          }
        });
        break;
      case 4:
        filteredData = SortData(DataFromServ, 3);
        arrayC = [0, 0, 0, 0, 0, 0];
        labels = [
          "Текущий месяц 1/2",
          "Текущий месяц 2/2",
          "Месяц назад  1/2",
          "Месяц назад 2/2",
          "2 месяца назад 1/2",
          "2 месяца назад 2/2"
        ];
        filteredData.forEach((valueq) => {
          const value = new Date(valueq.time);
          const diffMonths = today.getMonth() - value.getMonth();
          const diffYears = today.getFullYear() - value.getFullYear();
          const totalMonths = diffYears * 12 + diffMonths;
          const monthHalf = value.getDate() > 15 ? 1 : 0;
          if (totalMonths === 0 && monthHalf === 0) arrayC[0]++;
          else if (totalMonths === 0 && monthHalf === 1) arrayC[1]++;
          else if (totalMonths === 1 && monthHalf === 0) arrayC[2]++;
          else if (totalMonths === 1 && monthHalf === 1) arrayC[3]++;
          else if (totalMonths === 2 && monthHalf === 0) arrayC[4]++;
          else if (totalMonths === 2 && monthHalf === 1) arrayC[5]++;
        });
        break;
      case 5:
        filteredData = SortData(DataFromServ, 3);
        arrayC = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        labels = [
          "этот месяц", "месяц назад", "2 месяца назад", "3 месяца назад", "4 месяца назад", "5 месяцев назад", "6 месяцев назад", "7 месяцев назад", "8 месяцев назад", "9 месяцев назад", "10 месяцев назад", "11 месяцев назад"
        ];
        filteredData.forEach((valueq) => {
          const value = new Date(valueq.time);
          const diffMonths = today.getMonth() - value.getMonth();
          const diffYears = today.getFullYear() - value.getFullYear();
          const totalMonths = diffYears * 12 + diffMonths;
          if (totalMonths >= 0 && totalMonths <= 11) arrayC[totalMonths]++;
        });
        break;
      default:
        filteredData = [];
    }

    setClicks(arrayC);
    setNiz(labels);
    setDateFake(filteredData);
  }, [period, DataFromServ]);

  if (isLoading && loading) {
    return <div>Загрузка...</div>;
  } else {
    return (
        <div>
          <Helmet>
            <title>Аналитика</title>
          </Helmet>
          {userStatus === "free" ? <HeaderLinksPageFree/> : <HeaderLinksPage/>}
          <div>
            <div className="gp-background">
              <div className="GPMainContainer">
                <div className="GPCenterContainer">
                  <div className="LinkAndPeriod">
                    <div className="GPLink">
                      <div className="NILURLTRYOPT">Аналитика</div>
                    </div>
                    <div className="GPPeriod">
                      <GPPeriod ChangePeriodFunc={ChangePeriod}/>
                    </div>
                  </div>
                  <div className="Charts">
                    <div className="countOfViewsPeriod">{summ}</div>
                    <div className="GlobalCountOfViewText">
                      Общее количество кликов{" "}
                      {pathS ? `по ссылке "${pathS}"` : ""}
                    </div>
                    <Chart labels={niz} Clicks={clicks}/>
                  </div>
                  {DataFromServ.length > 0 && (
                      <div className="OptionsInGP">
                        <div className="Options-container">
                          <div className="AddressesInGP">
                            <AddresGp Dates={dateFake}/>
                          </div>
                          <div className="DevicesInGP">
                            <DevicesGp Dates={dateFake}/>
                          </div>
                        </div>
                        { !pathS && (
                          <div className="Options-container" style={{marginTop: "50px"}}>
                            {/*    <div className="REFSGP">
                            <RefsGp /></div> */}
                            <div className="TOPREFGP">
                              <TopRefs/>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
export default GraphPage;
