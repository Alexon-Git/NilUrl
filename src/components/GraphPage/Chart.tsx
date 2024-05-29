import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

interface ChartInterface {
    labels:string[];
    Clicks:number[];
}

const Chart = ({labels,Clicks}:ChartInterface) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        maintainAspectRatio:false,
        plugins: {
            legend: {
                position: 'chartArea' as const,
                display: false,
            },

            title: {
                display: false,
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Clicks',
                data: labels.map((value, index, array) => Clicks[index]),
                backgroundColor: 'rgba(142,255,69,0.5)',
            },
        ],
    };
    return (
        <div style={{marginTop:"20px"}}>
            <Bar width={600} height={600} options={options} data={data}/>
        </div>
    );
};

export default Chart;
