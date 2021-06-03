import Head from "next/head";
import { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import SearchBar from "../components/SearchBar";
import Skeleton from "../components/skeletons/Skeleton";
import TodayCond from "../components/TodayCond";
import WeekCond from "../components/WeekCond";
import { actionTypes } from "../contextAPI/reducer";
import { useStateValue } from "../contextAPI/StateProvider";
import { useRouter } from "next/router";
import mockWeatherData from "../mockWeatherData";

export default function Home() {
    const router = useRouter();
    const [isAppLoaded, setIsAppLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [locationData, dispatch] = useStateValue();
    const [isLocationPermitted, setIsLocationPermitted] = useState(false);
    const useMockWeatherData = true;

    useEffect(() => {
        console.log("mounted");
        let isMounted = true;

        const abortController = new AbortController();
        const signal = abortController.signal;

        // for geolocation
        let options = {
            enableHighAccuracy: true,
            maximumAge: 0,
        };
        function success(pos) {
            let crd = pos.coords;
            console.log(
                "in success prop, latitude and longitude >>>",
                crd.latitude,
                crd.longitude
            );
            !isLocationPermitted &&
                router.push(`/?lat=${crd.latitude}&long=${crd.longitude}`);
            isMounted && !isLocationPermitted && setIsLocationPermitted(true);
        }
        function errors(err) {
            alert(
                "Please enable the location to continue. To enable click on the ℹ️ (left of the url)"
            );
        }

        const fetchLocation = async () => {
            // for getting location of user by asking permission
            if (navigator.geolocation) {
                let initialResult = await navigator.permissions;
                let result = await initialResult.query({
                    name: "geolocation",
                });

                if (result.state === "granted") {
                    console.log(result.state);
                    //If granted then you can directly call your function here
                    navigator.geolocation.getCurrentPosition(success);
                } else if (result.state === "prompt") {
                    navigator.geolocation.getCurrentPosition(
                        success,
                        errors,
                        options
                    );
                } else if (result.state === "denied") {
                    //If denied then you have to show instructions to enable location
                    alert(
                        "Please enable the location to continue. To enable click on the ℹ️ (left of the url)"
                    );
                }
            } else {
                alert(
                    "Sorry Location Service is Not available in this browser!"
                );
            }
        };

        const fetchWeatherData = async () => {
            try {
                fetchLocation();

                let result =
                    !useMockWeatherData &&
                    isLocationPermitted &&
                    (await fetch(
                        `http://api.openweathermap.org/data/2.5/forecast?lat=${router.query.lat}&lon=${router.query.long}&appid=${process.env.NEXT_PUBLIC_APIKEY}`,
                        {
                            signal: signal,
                        }
                    ));
                console.log("result >>>", result);

                let weatherData = useMockWeatherData
                    ? mockWeatherData
                    : result && (await result.json());
                console.log("weatherData >>>", weatherData);

                if (weatherData && isMounted) {
                    dispatch({
                        type: actionTypes.SET_LOCATION,
                        locationData: weatherData,
                    });
                    setIsLoaded(true);
                }
            } catch (error) {
                console.log("catch block >>>", error);
            }
        };

        fetchWeatherData();

        return function cleanup() {
            console.log("cleanup");
            isMounted = false;
            abortController.abort();
        };
    }, [router.query.lat]);

    if (!isLoaded) {
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
        // !isAppLoaded && count === 1 && setIsAppLoaded(true);

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
