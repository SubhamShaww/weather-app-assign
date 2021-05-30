import { LocationMarkerIcon, SearchIcon } from "@heroicons/react/solid";
import { useState } from "react";
import indiaData from "../india";

function SearchBar({ cityData }) {
    const [userInput, setUserInput] = useState(cityData.name);
    const locations = indiaData;
    const [matchedLocations, setMatchedLocations] = useState([]);
    const [isLocationChanged, setIsLocationChanged] = useState(false);

    const searchLocation = (searchedText) => {
        let matches = locations.filter((location) => {
            const regex = new RegExp(`${searchedText}`, "gi");
            return (
                location.city.match(regex) || location.admin_name.match(regex)
            );
        });
        setMatchedLocations(matches);
    };

    const changeLocation = (cityName, stateName) => {
        setIsLocationChanged(true);
        setUserInput(`${cityName}, ${stateName}`);
    };

    return (
        <div className="w-full max-w-lg space-y-[3.25rem] flex flex-col relative">
            {/* Search Box */}
            <div className="w-full absolute card-small flex space-x-3 items-center focus-within:border-2 focus-within:border-blue-300">
                <LocationMarkerIcon className="h-6" />
                {/* below insted of input the location data will be used */}
                <div className="flex-grow">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => {
                            setUserInput(e.target.value);
                            searchLocation(userInput);
                        }}
                        className="focus:outline-none w-full"
                    />
                </div>
                <SearchIcon className="h-6" />
            </div>

            {/* Suggestion Box */}
            {!isLocationChanged &&
                userInput &&
                userInput !== cityData.name &&
                matchedLocations.length !== 0 && (
                    <div className="card-suggest w-full flex flex-col absolute">
                        {matchedLocations?.map((location, index) => (
                            <div
                                key={index}
                                className="w-full px-4 py-3 border-b border-gray-300 cursor-pointer first:rounded-t-lg last:rounded-b-lg last:border-none hover:bg-gray-100"
                                onClick={(e) => {
                                    changeLocation(
                                        location.city,
                                        location.admin_name
                                    );
                                }}
                            >
                                <span>
                                    {location.city},{" "}
                                    <span className="text-gray-500">
                                        {location.admin_name}
                                    </span>
                                </span>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
}

export default SearchBar;
