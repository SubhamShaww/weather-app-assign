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
        let isMounted = true;
        console.log("mounting >>");

        const abortController = new AbortController();
        const signal = abortController.signal;

        if (useMockData) {
            setIsLoaded(true);
            setWeatherData(mockWeatherData);
        } else {
            fetch(
                `http://api.openweathermap.org/data/2.5/forecast?q=mumbai&appid=${process.env.NEXT_PUBLIC_APIKEY}`,
                {
                    signal: signal,
                }
            )
                .then((result) => result.json())
                .then(
                    (result) => {
                        console.log("isMounted in success part >>>", isMounted);
                        isMounted &&
                            setIsLoaded(true) &&
                            setWeatherData(result);
                        console.log("result >>> ", result);
                        console.log("weatherData >>> ", weatherData);
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        console.log("isMounted in error part >>>", isMounted);
                        isMounted && setIsLoaded(true) && setError(error);
                    }
                );
        }

        return function cleanup() {
            console.log("unmounting >>");
            isMounted = false;
            abortController.abort();
        };
    }, []);

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
                <SearchBar cityData={weatherData?.city} />

                {/* WeekCond */}
                <WeekCond threeHoursData={weatherData?.list} />

                {/* TodayCond */}
                <TodayCond
                    todayData={weatherData?.list[0]}
                    cityData={weatherData?.city}
                    threeHoursData={weatherData?.list}
                />
            </div>
        );
    }
}
