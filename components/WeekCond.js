function WeekCond() {
    return (
        <div className="w-full">
            <div className="px-4 py-3 flex space-x-1 text-sm sm:text-base lg:text-lg overflow-x-auto hide-scroll">
                <div className="flex flex-col items-center min-w-max px-4 py-3 space-y-1 hover:border-2 hover:border-blue-400 hover:bg-yellow-50">
                    <div className="text-center font-medium">
                        <p className="">Fri</p>
                        <p>
                            <span>28°</span>{" "}
                            <span className="text-gray-500">19°</span>
                        </p>
                    </div>
                    <p className="h-6">☀️</p>
                    <p className="text-gray-500 text-xs sm:text-sm lg:text-base">
                        Sunny
                    </p>
                </div>
            </div>
        </div>
    );
}

export default WeekCond;
