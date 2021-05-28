import Head from "next/head";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import TodayCond from "../components/TodayCond";
import WeekCond from "../components/WeekCond";
import mockWeatherData from "../mockWeatherData";

export default function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [weatherData, setWeatherData] = useState({});
    const useMockData = true;

    useEffect(() => {
        if (useMockData) {
            setIsLoaded(true);
            setWeatherData(mockWeatherData);
        } else {
            fetch(
                `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${process.env.NEXT_PUBLIC_APIKEY}`
            )
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setWeatherData(result);
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                );
        }
    }, []);

    console.log(weatherData);
    if (error) {
        return (
            <div className="p-5 bg-gray-50">
                <Head>
                    <title>Weather App</title>
                    <meta
                        name="Weather App"
                        content="check temperature, sunrise and sunset time, humidity and pressure and weekly temperature."
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div>Error: {error.message}</div>
            </div>
        );
    } else if (!isLoaded) {
        return (
            <div className="p-5 bg-gray-50">
                <Head>
                    <title>Weather App</title>
                    <meta
                        name="Weather App"
                        content="check temperature, sunrise and sunset time, humidity and pressure and weekly temperature."
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div>Loading...</div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col h-screen space-y-2 p-5 items-start bg-gray-50 overflow-x-hidden">
                <Head>
                    <title>Weather App</title>
                    <meta
                        name="Weather App"
                        content="check temperature, sunrise and sunset time, humidity and pressure and weekly temperature."
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                {/* SearchBar */}
                <SearchBar />

                {/* WeekCond */}
                <WeekCond threeHoursData={weatherData.list} />

                {/* TodayCond */}
                <TodayCond
                    todayData={weatherData.list[0]}
                    cityData={weatherData.city}
                    threeHoursData={weatherData.list}
                />
            </div>
        );
    }
}
