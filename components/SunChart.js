import { useState } from "react";
import { Line } from "react-chartjs-2";

function SunChart({ cityData }) {
    const [sunChartData, setSunChartData] = useState({
        labels: [],
        datasets: [],
    });

    const getTimeFromUnixTimestamp = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000);
        const time = date.toLocaleTimeString();
        // 06:29:11
        // 23:24:33
        const hours = parseInt(time.slice(0, 2));
        return hours > 12
            ? `${hours - 12}` + time.slice(2, 5) + "pm"
            : time.slice(0, 5) + "am";
    };

    const setGradientColor = (canvas, color) => {};

    const getSunChartData = (canvas) => {
        const data = sunChartData;

        data.labels = ["6am", "1pm", "8pm"];
        data.datasets = [
            {
                label: "sun timings",
                data: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            },
        ];

        if (data.datasets) {
            let colors = ["", "", "#323232"];
            data.datasets.forEach((set, i) => {
                set.backgroundColor = setGradientColor(canvas, colors[i]);
                set.borderColor = colors[i + 2];
                set.borderWidth = 1;
                set.fill = true;
                set.pointBackgroundColor = "#fff";
            });

            return data;
        }
    };

    const options = {
        scales: {
            x: {
                ticks: {
                    font: {
                        weight: "400",
                        size: 12,
                    },
                    color: "rgba(107, 114, 128, 1)",
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

    return (
        <div className="flex flex-col flex-grow">
            {/* sunrise and sunset time */}
            <div className="flex text-sm sm:text-base lg:text-lg">
                <div className="flex-grow">
                    <p className="font-semibold">Sunrise</p>
                    <p className="text-gray-500">
                        {getTimeFromUnixTimestamp(cityData.sunrise)}
                    </p>
                </div>

                <div>
                    <p className="font-semibold">Sunset</p>
                    <p className="text-gray-500">
                        {getTimeFromUnixTimestamp(cityData.sunset)}
                    </p>
                </div>
            </div>

            {/* sunrise and sunset graph */}
            <div className="w-full">
                <Line data={getSunChartData} options={options} />
            </div>
        </div>
    );
}

export default SunChart;
