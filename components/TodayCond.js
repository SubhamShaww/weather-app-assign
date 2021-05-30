import { useStateValue } from "../contextAPI/StateProvider";
import SunChart from "./SunChart";
import TempChart from "./TempChart";

function TodayCond() {
    const [locationData, dispatch] = useStateValue();

    return (
        <div className="flex-grow w-full card-big flex flex-col space-y-8">
            {/* today condtion */}
            <div className="flex space-x-3 text-heading">
                <p>{Math.round(locationData.list[0].main.temp - 273.15)}°C</p>
                <img
                    src={`http://openweathermap.org/img/w/${locationData.list[0].weather[0].icon}.png`}
                    className="image-heading"
                />
            </div>

            {/* today temp all day chart */}
            <TempChart />

            {/* pressure and humidity */}
            <div className="flex space-x-6 text-sm sm:text-base lg:text-lg">
                <div className="box">
                    <p className="font-medium">Pressure</p>
                    <p>{locationData.list[0].main.pressure} hpa</p>
                </div>
                <div className="box">
                    <p className="font-semibold">Humidity</p>
                    <p>{locationData.list[0].main.humidity} %</p>
                </div>
            </div>

            <SunChart />
        </div>
    );
}

export default TodayCond;
