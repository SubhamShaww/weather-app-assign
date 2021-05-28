import { useState } from "react";
import { Line } from "react-chartjs-2";

function TempChart({ threeHoursData }) {
    const [tempChartData, setTempChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "temperature",
                data: [],
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
        gradient.addColorStop(0.7, "rgba(255,255, 255, 0.1)");

        return gradient;
    };

    const getTempChartData = (canvas) => {
        const data = tempChartData;

        threeHoursData.map((eachThreeHour, index) => {
            index > 0 &&
                index < 9 &&
                data.labels.push(
                    Math.round(eachThreeHour.main.temp - 273.15)
                ) &&
                data.datasets[0].data.push(
                    Math.round(eachThreeHour.main.temp - 273.15)
                );
        });

        if (data.datasets) {
            let colors = ["rgba(96, 165, 250, 0.2)", "rgba(96, 165, 250, 1)"];
            data.datasets.forEach((set, i) => {
                set.backgroundColor = setGradientColor(canvas, colors[i]);
                set.borderColor = colors[i + 1];
                set.borderWidth = 2;
                set.lineTension = 0.3;
                set.fill = true;
                set.pointBackgroundColor = "#fff";
            });

            return data;
        }
    };

    return (
        <div className=" overflow-x-auto hide-scroll">
            <div className="w-screen">
                <Line data={getTempChartData} options={options} />
            </div>
        </div>
    );
}

export default TempChart;
