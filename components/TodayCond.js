import SunChart from "./SunChart";
import TempChart from "./TempChart";

function TodayCond({ todayData, cityData, threeHoursData }) {
    return (
        <div className="flex-grow w-full card-big flex flex-col space-y-8">
            {/* today condtion */}
            <div className="flex items-start text-heading">
                {Math.round(todayData.main.temp - 273.15)}°C{" "}
                <img
                    src={`http://openweathermap.org/img/w/${todayData.weather[0].icon}.png`}
                    className="image-heading"
                />
            </div>

            {/* today temp all day chart */}
            <TempChart threeHoursData={threeHoursData} />

            {/* pressure and humidity */}
            <div className="flex space-x-6 text-sm sm:text-base lg:text-lg">
                <div className="box">
                    <p className="font-medium">Pressure</p>
                    <p>{todayData.main.pressure} hpa</p>
                </div>
                <div className="box">
                    <p className="font-semibold">Humidity</p>
                    <p>{todayData.main.humidity} %</p>
                </div>
            </div>

            <SunChart cityData={cityData} />
        </div>
    );
}

export default TodayCond;
