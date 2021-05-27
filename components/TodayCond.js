import { useState } from "react";
import { Line } from "react-chartjs-2";

function TodayCond() {
    const [tempChartData, setTempChartData] = useState({
        labels: ["21°", "22°", "24°", "25°", "29°", "28°"],
        datasets: [
            {
                label: "temperature",
                data: [21, 22, 24, 25, 29, 28],
            },
        ],
    });

    const options = {
        scales: {
            x: {
                ticks: {
                    font: {
                        weight: "800",
                        size: 13,
                    },
                    color: "rgba(0, 0, 0)",
                    padding: 15,
                },
                grid: {
                    drawBorder: false,
                },
            },
            y: {
                display: false,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        maintainAspectRatio: false,
    };

    const setGradientColor = (canvas, color) => {
        const ctx = canvas.getContext("2d");

        const chartHeight = ctx.canvas.height;

        const gradient = ctx.createLinearGradient(0, 0, 0, chartHeight);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.5, "rgba(255,255, 255, 0.2)");

        return gradient;
    };

    const getTempChartData = (canvas) => {
        const data = tempChartData;
        if (data.datasets) {
            let colors = ["rgba(96, 165, 250, 0.2)", "rgba(96, 165, 250, 1)"];
            data.datasets.forEach((set, i) => {
                set.backgroundColor = setGradientColor(canvas, colors[i]);
                set.borderColor = colors[i + 1];
                set.borderWidth = 2;
                set.lineTension = 0.2;
                set.fill = true;
                set.pointBackgroundColor = "#fff";
            });

            return data;
        }
    };

    return (
        <div className="flex-grow w-full card-big flex flex-col space-y-8">
            {/* today condtion */}
            <h1>26°C ☀️</h1>

            {/* today temp all day chart */}
            <div className=" overflow-x-auto hide-scroll">
                <div className="w-screen">
                    <Line data={getTempChartData} options={options} />
                </div>
            </div>

            {/* pressure and humidity */}
            <div className="flex space-x-6 text-sm sm:text-base lg:text-lg">
                <div className="box">
                    <p className="font-medium">Pressure</p>
                    <p>1013 hpa</p>
                </div>
                <div className="box">
                    <p className="font-semibold">Humidity</p>
                    <p>93 %</p>
                </div>
            </div>

            <div className="flex flex-col flex-grow">
                {/* sunrise and sunset time */}
                <div className="flex text-sm sm:text-base lg:text-lg">
                    <div className="flex-grow">
                        <p className="font-semibold">Sunrise</p>
                        <p className="text-gray-500">7:22am</p>
                    </div>

                    <div>
                        <p className="font-semibold">Sunset</p>
                        <p className="text-gray-500">6:12pm</p>
                    </div>
                </div>

                {/* sunrise and sunset graph */}
            </div>
        </div>
    );
}

export default TodayCond;
