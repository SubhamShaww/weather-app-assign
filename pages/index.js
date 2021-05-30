import Head from "next/head";
import { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import SearchBar from "../components/SearchBar";
import Skeleton from "../components/skeletons/Skeleton";
import TodayCond from "../components/TodayCond";
import WeekCond from "../components/WeekCond";
import { actionTypes } from "../contextAPI/reducer";
import { useStateValue } from "../contextAPI/StateProvider";

export default function Home() {
    const [error, setError] = useState(null);
    const [isAppLoaded, setIsAppLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [{}, dispatch] = useStateValue();
    let count = 0;

    useEffect(() => {
        let isMounted = true;

        const abortController = new AbortController();
        const signal = abortController.signal;

        setTimeout(() => {
            fetch(
                `http://api.openweathermap.org/data/2.5/forecast?q=kolkata&appid=${process.env.NEXT_PUBLIC_APIKEY}`,
                {
                    signal: signal,
                }
            )
                .then((result) => result.json())
                .then(
                    (result) => {
                        console.log("fetching");

                        if (isMounted) {
                            dispatch({
                                type: actionTypes.SET_LOCATION,
                                locationData: result,
                            });
                            setIsLoaded(true);
                        }
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        if (isMounted) {
                            setIsLoaded(true);
                            setError(error);
                        }
                    }
                );
        }, 4000);

        return function cleanup() {
            isMounted = false;
            abortController.abort();
        };
    }, []);

    if (error) {
        return (
            <div className="p-5 bg-gray-50 h-screen">
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
            <div className="p-5 bg-gray-50 h-screen">
                <Head>
                    <title>Weather App</title>
                    <meta
                        name="Weather App"
                        content="check temperature, sunrise and sunset time, humidity and pressure and weekly temperature."
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                {!isAppLoaded ? <Skeleton /> : <Loader />}
            </div>
        );
    } else {
        ++count;
        !isAppLoaded && count === 1 && setIsAppLoaded(true);

        return (
            <div className="flex flex-col space-y-14 h-screen p-5 bg-gray-50 overflow-x-hidden">
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

                <div className="flex flex-col space-y-2 w-full items-start flex-grow">
                    {/* WeekCond */}
                    <WeekCond />

                    {/* TodayCond */}
                    <TodayCond />
                </div>
            </div>
        );
    }
}
