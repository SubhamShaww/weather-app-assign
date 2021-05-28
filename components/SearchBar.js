import { LocationMarkerIcon, SearchIcon } from "@heroicons/react/solid";
import { useState } from "react";

function SearchBar({ cityData }) {
    const [searchText, setSearchText] = useState(cityData.name);

    console.log(cityData);

    return (
        <div className="w-full flex flex-col mb-2">
            {/* Search Box */}
            <div className="card-small flex space-x-3 items-center max-w-lg focus-within:border-2 focus-within:border-blue-300">
                <LocationMarkerIcon className="h-6" />
                {/* below insted of input the location data will be used */}
                <div className="flex-grow">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                        className="focus:outline-none w-full"
                    />
                </div>
                <SearchIcon className="h-6" />
            </div>

            {/* Suggestion Box */}
            {searchText !== cityData.name && (
                <div className="card-small max-w-lg z-10 flex flex-col"></div>
            )}
        </div>
    );
}

export default SearchBar;
