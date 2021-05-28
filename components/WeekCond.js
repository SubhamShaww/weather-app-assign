function WeekCond({ threeHoursData }) {
    const getDayFromUnixTimestamp = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000);
        const day = date.getDay();
        const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        return weekDays[day];
    };

    return (
        <div className="w-full">
            <div className="px-4 py-3 flex space-x-1 text-sm sm:text-base lg:text-lg overflow-x-auto hide-scroll">
                {threeHoursData?.map((eachDay, i) => {
                    return (
                        i % 8 == 0 && (
                            <div
                                key={eachDay.dt}
                                className="flex flex-col items-center min-w-max px-4 py-3 space-y-1 hover:border-2 hover:border-blue-400 hover:bg-yellow-50"
                            >
                                <div className="text-center font-medium">
                                    <p className="">
                                        {getDayFromUnixTimestamp(eachDay.dt)}
                                    </p>
                                    <p>
                                        <span>
                                            {Math.ceil(
                                                eachDay.main.temp_max - 273.15
                                            )}
                                            °
                                        </span>{" "}
                                        <span className="text-gray-500">
                                            {Math.floor(
                                                eachDay.main.temp_min - 273.15
                                            )}
                                            °
                                        </span>
                                    </p>
                                </div>
                                <img
                                    src={`http://openweathermap.org/img/w/${eachDay.weather[0].icon}.png`}
                                    className="h-8 sm:h-10 lg:h-12"
                                />
                                <p className="text-gray-500 text-xs sm:text-sm lg:text-base">
                                    {eachDay.weather[0].main}
                                </p>
                            </div>
                        )
                    );
                })}
            </div>
        </div>
    );
}

export default WeekCond;
