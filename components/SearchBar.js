import { LocationMarkerIcon, SearchIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useStateValue } from "../contextAPI/StateProvider";
import indiaLocations from "../india";
import { useRouter } from "next/router";

function SearchBar() {
    const router = useRouter();
    const [matchedLocations, setMatchedLocations] = useState([]);
    const [locationData, dispatch] = useStateValue();
    const [userInput, setUserInput] = useState(locationData.city?.name || "");
    const [isOpen, setIsOpen] = useState(false);

    const searchLocation = (searchedText) => {
        let matches = indiaLocations.filter((location) => {
            const regex = new RegExp(`${searchedText}`, "gi");
            return (
                location.city.match(regex) || location.admin_name.match(regex)
            );
        });
        setMatchedLocations(matches);
    };

    const changeLocation = (cityName, stateName, latitude, longitude) => {
        setUserInput(`${cityName}, ${stateName}`);
        router.push(`/?lat=${latitude}&long=${longitude}`);
    };

    const handleMouseEvent = (event) => {
        if (
            event.path[0].id !== "search-input" &&
            event.path[0].id !== "search-suggestion" &&
            event.path[0].id !== "search-suggestion-text" &&
            event.path[0].id !== "search-suggestion-state"
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener("mousedown", handleMouseEvent);
        return () => {
            // cleanup
            window.removeEventListener("mousedown", handleMouseEvent);
        };
    }, [handleMouseEvent]);

    return (
        <div
            className="w-full max-w-lg space-y-[3.25rem] flex flex-col relative"
            onKeyDown={(e) => {
                if (e.key === "Escape") {
                    setIsOpen(false);
                }
            }}
        >
            {/* Search Box */}
            <div className="w-full absolute card-small flex space-x-3 items-center focus-within:border-2 focus-within:border-blue-300">
                <LocationMarkerIcon className="h-6" />
                <div className="flex-grow">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => {
                            setIsOpen(true);
                            setUserInput(e.target.value);
                            searchLocation(userInput);
                        }}
                        className="focus:outline-none w-full"
                        id="search-input"
                        autoComplete="off"
                    />
                </div>
                <SearchIcon className="h-6" />
            </div>

            {/* Suggestion Box */}
            {isOpen &&
                userInput &&
                userInput !== locationData.city.name &&
                matchedLocations.length !== 0 && (
                    <div className="card-suggest w-full flex flex-col absolute">
                        {matchedLocations?.map((location, index) => (
                            <div
                                key={index}
                                className="w-full px-4 py-3 border-b border-gray-300 cursor-pointer outline-none first:rounded-t-lg last:rounded-b-lg last:border-none hover:bg-gray-100 focus:bg-gray-100"
                                onClick={(e) => {
                                    changeLocation(
                                        location.city,
                                        location.admin_name,
                                        location.lat,
                                        location.lng
                                    );
                                }}
                                id="search-suggestion"
                                tabIndex="0"
                            >
                                <span id="search-suggestion-text">
                                    {location.city},{" "}
                                    <span
                                        className="text-gray-500"
                                        id="search-suggestion-state"
                                    >
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
