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

const GraphPage = () => {
  const location = useLocation();
  const { pathS } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [userStatus, setUserStatus] = useState(null);
  const [DataFromServ, setDataFromServ] = useState([]);
  const [period, setPeriod] = useState(1);
  const [clicks, setClicks] = useState([1, 2, 3, 4]);
  const [niz, setNiz] = useState(["qwe", "qwe", "asd", "asd"]);
  const navigate = useNavigate();
  const accessToken = Cookies.get("access_token");
  const [dateFake, setDateFake] = useState([]);
  const { isLoggedIn, isLoading, isRedirected, setIsRedirected } = useAuth();

     useEffect(() => {
        const fetchData = async () => {
            try {
                // Формирование URL с параметром pathS, если он не null
                let url = 'data_clicks_user_all.php';
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
                window.location.reload();
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
        labels = Array.from({ length: 30 }, (_, i) => i + 1);
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
        {userStatus === "free" ? <HeaderLinksPageFree /> : <HeaderLinksPage />}
        <div>
          <div className="title__container">
            <h4 className="settings__title wrapper-title">Аналитика</h4>
          </div>
          <div className="image-background">
            <div className="GPMainContainer">
              <di className="GPCenterContainer">
                <div className="LinkAndPeriod">
                  <div className="GPLink" onClick={() => navigate("/links")}>
                    <div className="NILURLTRYOPT">Вернуться к ссылкам</div>
                    <div style={{ position: "relative" }}>
                      <svg
                        style={{ marginTop: "5px" }}
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_432_32)">
                          <path
                            d="M6.41612 21.9998C6.29548 22.0005 6.17589 21.9774 6.06421 21.9318C5.95252 21.8862 5.85094 21.819 5.76529 21.734C5.67937 21.6488 5.61118 21.5474 5.56464 21.4357C5.5181 21.324 5.49414 21.2042 5.49414 21.0832C5.49414 20.9622 5.5181 20.8424 5.56464 20.7306C5.61118 20.6189 5.67937 20.5176 5.76529 20.4323L13.2545 12.9432C13.7694 12.4276 14.0587 11.7286 14.0587 10.9998C14.0587 10.2711 13.7694 9.57214 13.2545 9.05651L5.76529 1.56734C5.59268 1.39473 5.49571 1.16062 5.49571 0.916511C5.49571 0.672401 5.59268 0.438289 5.76529 0.265678C5.9379 0.093066 6.17201 -0.00390625 6.41612 -0.00390625C6.66023 -0.00390625 6.89434 0.093066 7.06696 0.265678L14.5561 7.75484C14.983 8.1806 15.3216 8.68637 15.5527 9.2432C15.7837 9.80003 15.9026 10.397 15.9026 10.9998C15.9026 11.6027 15.7837 12.1997 15.5527 12.7565C15.3216 13.3133 14.983 13.8191 14.5561 14.2448L7.06696 21.734C6.9813 21.819 6.87972 21.8862 6.76804 21.9318C6.65635 21.9774 6.53676 22.0005 6.41612 21.9998Z"
                            fill="#2F2F2F"
                          />
                          <g clipPath="url(#clip1_432_32)">
                            <path
                              d="M6.41612 21.9998C6.29548 22.0005 6.17589 21.9774 6.06421 21.9318C5.95252 21.8862 5.85094 21.819 5.76529 21.734C5.67937 21.6488 5.61118 21.5474 5.56464 21.4357C5.5181 21.324 5.49414 21.2042 5.49414 21.0832C5.49414 20.9622 5.5181 20.8424 5.56464 20.7306C5.61118 20.6189 5.67937 20.5176 5.76529 20.4323L13.2545 12.9432C13.7694 12.4276 14.0587 11.7286 14.0587 10.9998C14.0587 10.2711 13.7694 9.57214 13.2545 9.05651L5.76529 1.56734C5.59268 1.39473 5.49571 1.16062 5.49571 0.916511C5.49571 0.672401 5.59268 0.438289 5.76529 0.265678C5.9379 0.093066 6.17201 -0.00390625 6.41612 -0.00390625C6.66023 -0.00390625 6.89434 0.093066 7.06696 0.265678L14.5561 7.75484C14.983 8.1806 15.3216 8.68637 15.5527 9.2432C15.7837 9.80003 15.9026 10.397 15.9026 10.9998C15.9026 11.6027 15.7837 12.1997 15.5527 12.7565C15.3216 13.3133 14.983 13.8191 14.5561 14.2448L7.06696 21.734C6.9813 21.819 6.87972 21.8862 6.76804 21.9318C6.65635 21.9774 6.53676 22.0005 6.41612 21.9998Z"
                              fill="#2F2F2F"
                            />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_432_32">
                            <rect width="22" height="22" fill="white" />
                          </clipPath>
                          <clipPath id="clip1_432_32">
                            <rect width="22" height="22" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <svg
                        className="STRABSPOSGP"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_432_32)">
                          <path
                            d="M6.41612 21.9998C6.29548 22.0005 6.17589 21.9774 6.06421 21.9318C5.95252 21.8862 5.85094 21.819 5.76529 21.734C5.67937 21.6488 5.61118 21.5474 5.56464 21.4357C5.5181 21.324 5.49414 21.2042 5.49414 21.0832C5.49414 20.9622 5.5181 20.8424 5.56464 20.7306C5.61118 20.6189 5.67937 20.5176 5.76529 20.4323L13.2545 12.9432C13.7694 12.4276 14.0587 11.7286 14.0587 10.9998C14.0587 10.2711 13.7694 9.57214 13.2545 9.05651L5.76529 1.56734C5.59268 1.39473 5.49571 1.16062 5.49571 0.916511C5.49571 0.672401 5.59268 0.438289 5.76529 0.265678C5.9379 0.093066 6.17201 -0.00390625 6.41612 -0.00390625C6.66023 -0.00390625 6.89434 0.093066 7.06696 0.265678L14.5561 7.75484C14.983 8.1806 15.3216 8.68637 15.5527 9.2432C15.7837 9.80003 15.9026 10.397 15.9026 10.9998C15.9026 11.6027 15.7837 12.1997 15.5527 12.7565C15.3216 13.3133 14.983 13.8191 14.5561 14.2448L7.06696 21.734C6.9813 21.819 6.87972 21.8862 6.76804 21.9318C6.65635 21.9774 6.53676 22.0005 6.41612 21.9998Z"
                            fill="#2F2F2F"
                          />
                          <g clipPath="url(#clip1_432_32)">
                            <path
                              d="M6.41612 21.9998C6.29548 22.0005 6.17589 21.9774 6.06421 21.9318C5.95252 21.8862 5.85094 21.819 5.76529 21.734C5.67937 21.6488 5.61118 21.5474 5.56464 21.4357C5.5181 21.324 5.49414 21.2042 5.49414 21.0832C5.49414 20.9622 5.5181 20.8424 5.56464 20.7306C5.61118 20.6189 5.67937 20.5176 5.76529 20.4323L13.2545 12.9432C13.7694 12.4276 14.0587 11.7286 14.0587 10.9998C14.0587 10.2711 13.7694 9.57214 13.2545 9.05651L5.76529 1.56734C5.59268 1.39473 5.49571 1.16062 5.49571 0.916511C5.49571 0.672401 5.59268 0.438289 5.76529 0.265678C5.9379 0.093066 6.17201 -0.00390625 6.41612 -0.00390625C6.66023 -0.00390625 6.89434 0.093066 7.06696 0.265678L14.5561 7.75484C14.983 8.1806 15.3216 8.68637 15.5527 9.2432C15.7837 9.80003 15.9026 10.397 15.9026 10.9998C15.9026 11.6027 15.7837 12.1997 15.5527 12.7565C15.3216 13.3133 14.983 13.8191 14.5561 14.2448L7.06696 21.734C6.9813 21.819 6.87972 21.8862 6.76804 21.9318C6.65635 21.9774 6.53676 22.0005 6.41612 21.9998Z"
                              fill="#2F2F2F"
                            />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_432_32">
                            <rect width="22" height="22" fill="white" />
                          </clipPath>
                          <clipPath id="clip1_432_32">
                            <rect width="22" height="22" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div className="GPPeriod">
                    <GPPeriod ChangePeriodFunc={ChangePeriod} />
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
                {DataFromServ.length > 0 &&  (<div className="OptionsInGP">
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div className="AddressesInGP">
                      <AddresGp Dates={dateFake} />
                    </div>
                    <div className="DevicesInGP">
                      <DevicesGp Dates={dateFake} />
                    </div>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:"40px"}}>
                    <div className="REFSGP">
                      <RefsGp />
                    </div>
                    <div className="TOPREFGP">
                      <TopRefs />
                    </div>
                  </div>
                </div>
                )}
              </di>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default transition(GraphPage);
