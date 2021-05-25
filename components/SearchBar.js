import { LocationMarkerIcon, SearchIcon } from "@heroicons/react/solid";

function SearchBar() {
    return (
        <div className="shadow-all px-4 py-3 flex space-x-3 w-full max-w-md rounded-lg items-center sm:max-w-xl lg:max-w-2xl">
            <LocationMarkerIcon className="h-5" />
            {/* below insted of input the location data will be used */}
            <div className="flex-grow">input</div>
            <SearchIcon className="h-5" />
        </div>
    );
}

export default SearchBar;
