import React, {useEffect, useState} from "react";

import "../styles/GraphPage/GraphPage.css"
import GPPeriod from "../components/GraphPage/GPPeriod";
import Chart from "../components/GraphPage/Chart";
import AddresGp from "../components/GraphPage/AddresGp";
import DevicesGp from "../components/GraphPage/DevicesGp";
import RefsGp from "../components/GraphPage/RefsGp";
import TopRefs from "../components/GraphPage/TopRefs";
import {useNavigate} from "react-router-dom";
import NoLoginHeader from "../components/no-login-header/NoLoginHeader";
import HeaderLinksPage from "../components/Global/HeaderLinksPage";
import transition from "../LogicComp/Transition";
import useAuth from "../pages/useAuth";
import {DataFromServ, SortData} from "../LogicComp/GPFakeData";

const GraphPage = () => {
    const [ssilki,setSsilki] = useState()
    const navigate = useNavigate();
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch('data_clicks_user_all.php', {
    //             method: 'GET',
    //             credentials: 'include'
    //         });
    //
    //         const result = await response.json();
    //         setSsilki(result);
    //     };
    //
    //     fetchData();
    // }, []);


    const { isLoggedIn, isLoading, isRedirected, setIsRedirected } = useAuth();
    useEffect(() => {
        if (!isLoading && !isLoggedIn && !isRedirected) {
            setIsRedirected(true);
            navigate('/login');
        }
    }, [isLoading, isLoggedIn, navigate, isRedirected, setIsRedirected]);







    const [period,setPeriod] = useState(1)
    const ChangePeriod = (prop:number) =>{
        setPeriod(prop)
    }
    const [clicks,setClicks] = useState([1,2,3,4])
    const [niz,setNiz] = useState(["qwe","qwe","asd","asd"])
    let summ = 0
    clicks.map((value, index, array)=>{
        summ+=value;
    })
    let now = new Date()
    useEffect(()=>{
        let today = new Date(Date.now()-1000*3600*4)
        if(period === 0){
            const dateFake = SortData(DataFromServ,0)

            let arrayC = [0,0,0]
            dateFake.map((valueq, index, array)=>{
                const value = new Date(valueq.time)
                const condition = today.getTime() - value.getTime()
                if(condition <= 20) arrayC[0]++;
                if(condition <= 40 && condition > 20) arrayC[1]++;
                if(condition <= 40 && condition > 60) arrayC[2]++;
            })

            setClicks(arrayC)
            setNiz(["0-20 минут назад","20-40 минут назад","40-60 минут назад"])

        }
        if(period === 1){
            const dateFake = SortData(DataFromServ,1)

            let arrayC = [0,0,0]
            dateFake.map((valueq, index, array)=>{
                const value = new Date(valueq.time)
                const condition = Math.abs(value.getHours()-today.getHours())
                if(condition <= 8) arrayC[0]++;
                if(condition <= 16 && condition > 8) arrayC[1]++;
                if(condition <= 24 && condition > 16) arrayC[2]++;
            })

            setClicks(arrayC)
            setNiz(["0-8 часов назад","8-16 часов назад","16-24 часов назад"])
        }
        if(period === 2){
            const dateFake = SortData(DataFromServ,2)
            let arrayC = [0,0,0,0,0,0,0]
            dateFake.map((valueq, index, array)=>{
                const value = new Date(valueq.time)
                const condition = Math.abs(value.getDay()-today.getDay())
                if(condition == 0) arrayC[0]++;
                if(condition == 1) arrayC[1]++;
                if(condition == 2) arrayC[2]++;
                if(condition == 3) arrayC[2]++;
                if(condition == 4) arrayC[2]++;
                if(condition == 5) arrayC[2]++;
                if(condition == 6) arrayC[2]++;
            })
            setClicks(arrayC)
            setNiz(["сегодня","1 день назад","2 день назад","3 день назад","4 день назад","5 день назад","6 день назад"])
        }
        if(period === 3){
            const dateFake = SortData(DataFromServ,3)
            let arrayC = [0,0,0]
            dateFake.map((valueq, index, array)=>{
                const value = new Date(valueq.time)
                const condition = Math.abs(value.getDay()-today.getDay())
                if(condition <= 10) arrayC[0]++;
                if(condition <= 20 && condition > 10) arrayC[1]++;
                if(condition <= 30 && condition > 20) arrayC[2]++;
            })
            setClicks(arrayC)
            setNiz(["0-10 дней назад","11-20 дней назад","21-30 дней назад"])
        }
        if(period === 4){
            const dateFake = SortData(DataFromServ,3)
            let arrayC = [0,0,0]
            dateFake.map((valueq, index, array)=>{
                const value = new Date(valueq.time)
                const condition = Math.abs(value.getMonth()-today.getMonth())
                if(condition <= 0) arrayC[0]++;
                if(condition <= 1 && condition > 0) arrayC[1]++;
                if(condition <= 2 && condition > 1) arrayC[2]++;
            })
            setClicks(arrayC)
            setNiz(["этот месяц","1 месяц назад","2 месяц назад"])
        }
        if(period === 5){

        }
    },[period])

    // if (isLoading) {
    //     return <div>Загрузка...</div>;
    // }
    return (
        <div>
            <HeaderLinksPage/>
            <div
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL + '/BackgroundDots.svg'})
                        `,zIndex:"-5",
                    borderTop:"1px solid gray"

                }}
            >
                <div>
                    <div className="GPMainContainer">
                        <div className="GPCenterContainer">
                            <div className="LinkAndPeriod">
                                <div className="GPLink" onClick={()=>navigate('/main')}>
                                    <div className="NILURLTRYOPT">
                                        NirUrl.com/try
                                    </div>
                                    <div style={{position:"relative"}}>
                                        <svg style={{marginTop:"5px"}} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_432_32)">
                                                <path d="M6.41612 21.9998C6.29548 22.0005 6.17589 21.9774 6.06421 21.9318C5.95252 21.8862 5.85094 21.819 5.76529 21.734C5.67937 21.6488 5.61118 21.5474 5.56464 21.4357C5.5181 21.324 5.49414 21.2042 5.49414 21.0832C5.49414 20.9622 5.5181 20.8424 5.56464 20.7306C5.61118 20.6189 5.67937 20.5176 5.76529 20.4323L13.2545 12.9432C13.7694 12.4276 14.0587 11.7286 14.0587 10.9998C14.0587 10.2711 13.7694 9.57214 13.2545 9.05651L5.76529 1.56734C5.59268 1.39473 5.49571 1.16062 5.49571 0.916511C5.49571 0.672401 5.59268 0.438289 5.76529 0.265678C5.9379 0.093066 6.17201 -0.00390625 6.41612 -0.00390625C6.66023 -0.00390625 6.89434 0.093066 7.06696 0.265678L14.5561 7.75484C14.983 8.1806 15.3216 8.68637 15.5527 9.2432C15.7837 9.80003 15.9026 10.397 15.9026 10.9998C15.9026 11.6027 15.7837 12.1997 15.5527 12.7565C15.3216 13.3133 14.983 13.8191 14.5561 14.2448L7.06696 21.734C6.9813 21.819 6.87972 21.8862 6.76804 21.9318C6.65635 21.9774 6.53676 22.0005 6.41612 21.9998Z" fill="#2F2F2F"/>
                                                <g clipPath="url(#clip1_432_32)">
                                                    <path d="M6.41612 21.9998C6.29548 22.0005 6.17589 21.9774 6.06421 21.9318C5.95252 21.8862 5.85094 21.819 5.76529 21.734C5.67937 21.6488 5.61118 21.5474 5.56464 21.4357C5.5181 21.324 5.49414 21.2042 5.49414 21.0832C5.49414 20.9622 5.5181 20.8424 5.56464 20.7306C5.61118 20.6189 5.67937 20.5176 5.76529 20.4323L13.2545 12.9432C13.7694 12.4276 14.0587 11.7286 14.0587 10.9998C14.0587 10.2711 13.7694 9.57214 13.2545 9.05651L5.76529 1.56734C5.59268 1.39473 5.49571 1.16062 5.49571 0.916511C5.49571 0.672401 5.59268 0.438289 5.76529 0.265678C5.9379 0.093066 6.17201 -0.00390625 6.41612 -0.00390625C6.66023 -0.00390625 6.89434 0.093066 7.06696 0.265678L14.5561 7.75484C14.983 8.1806 15.3216 8.68637 15.5527 9.2432C15.7837 9.80003 15.9026 10.397 15.9026 10.9998C15.9026 11.6027 15.7837 12.1997 15.5527 12.7565C15.3216 13.3133 14.983 13.8191 14.5561 14.2448L7.06696 21.734C6.9813 21.819 6.87972 21.8862 6.76804 21.9318C6.65635 21.9774 6.53676 22.0005 6.41612 21.9998Z" fill="#2F2F2F"/>
                                                </g>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_432_32">
                                                    <rect width="22" height="22" fill="white"/>
                                                </clipPath>
                                                <clipPath id="clip1_432_32">
                                                    <rect width="22" height="22" fill="white"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <svg className="STRABSPOSGP" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_432_32)">
                                                <path d="M6.41612 21.9998C6.29548 22.0005 6.17589 21.9774 6.06421 21.9318C5.95252 21.8862 5.85094 21.819 5.76529 21.734C5.67937 21.6488 5.61118 21.5474 5.56464 21.4357C5.5181 21.324 5.49414 21.2042 5.49414 21.0832C5.49414 20.9622 5.5181 20.8424 5.56464 20.7306C5.61118 20.6189 5.67937 20.5176 5.76529 20.4323L13.2545 12.9432C13.7694 12.4276 14.0587 11.7286 14.0587 10.9998C14.0587 10.2711 13.7694 9.57214 13.2545 9.05651L5.76529 1.56734C5.59268 1.39473 5.49571 1.16062 5.49571 0.916511C5.49571 0.672401 5.59268 0.438289 5.76529 0.265678C5.9379 0.093066 6.17201 -0.00390625 6.41612 -0.00390625C6.66023 -0.00390625 6.89434 0.093066 7.06696 0.265678L14.5561 7.75484C14.983 8.1806 15.3216 8.68637 15.5527 9.2432C15.7837 9.80003 15.9026 10.397 15.9026 10.9998C15.9026 11.6027 15.7837 12.1997 15.5527 12.7565C15.3216 13.3133 14.983 13.8191 14.5561 14.2448L7.06696 21.734C6.9813 21.819 6.87972 21.8862 6.76804 21.9318C6.65635 21.9774 6.53676 22.0005 6.41612 21.9998Z" fill="#2F2F2F"/>
                                                <g clipPath="url(#clip1_432_32)">
                                                    <path d="M6.41612 21.9998C6.29548 22.0005 6.17589 21.9774 6.06421 21.9318C5.95252 21.8862 5.85094 21.819 5.76529 21.734C5.67937 21.6488 5.61118 21.5474 5.56464 21.4357C5.5181 21.324 5.49414 21.2042 5.49414 21.0832C5.49414 20.9622 5.5181 20.8424 5.56464 20.7306C5.61118 20.6189 5.67937 20.5176 5.76529 20.4323L13.2545 12.9432C13.7694 12.4276 14.0587 11.7286 14.0587 10.9998C14.0587 10.2711 13.7694 9.57214 13.2545 9.05651L5.76529 1.56734C5.59268 1.39473 5.49571 1.16062 5.49571 0.916511C5.49571 0.672401 5.59268 0.438289 5.76529 0.265678C5.9379 0.093066 6.17201 -0.00390625 6.41612 -0.00390625C6.66023 -0.00390625 6.89434 0.093066 7.06696 0.265678L14.5561 7.75484C14.983 8.1806 15.3216 8.68637 15.5527 9.2432C15.7837 9.80003 15.9026 10.397 15.9026 10.9998C15.9026 11.6027 15.7837 12.1997 15.5527 12.7565C15.3216 13.3133 14.983 13.8191 14.5561 14.2448L7.06696 21.734C6.9813 21.819 6.87972 21.8862 6.76804 21.9318C6.65635 21.9774 6.53676 22.0005 6.41612 21.9998Z" fill="#2F2F2F"/>
                                                </g>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_432_32">
                                                    <rect width="22" height="22" fill="white"/>
                                                </clipPath>
                                                <clipPath id="clip1_432_32">
                                                    <rect width="22" height="22" fill="white"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                                <div className="GPPeriod">
                                    <GPPeriod ChangePeriodFunc={ChangePeriod}/>
                                </div>
                            </div>
                            <div className="Charts">
                                <div className="countOfViewsPeriod">{summ}</div>
                                <div className="GlobalCountOfViewText">Общее количество кликов</div>
                                <Chart labels={niz} Clicks={clicks}/>
                            </div>
                            <div className="OptionsInGP">
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <div className="AddressesInGP">
                                        <AddresGp/>
                                    </div>
                                    <div className="DevicesInGP">
                                        <DevicesGp/>
                                    </div>
                                </div>
                                <div style={{display:"flex",justifyContent:"space-between",marginTop:"40px"}}>
                                    <div className="REFSGP">
                                        <RefsGp/>
                                    </div>
                                    <div className="TOPREFGP">
                                        <TopRefs/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default transition(GraphPage);
