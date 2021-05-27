import { LocationMarkerIcon, SearchIcon } from "@heroicons/react/solid";

function SearchBar() {
    return (
        <form className="card-small flex space-x-3 w-full items-center max-w-lg mb-2 focus-within:border-2 focus-within:border-blue-300">
            <LocationMarkerIcon className="h-6" />
            {/* below insted of input the location data will be used */}
            <div className="flex-grow">
                <input type="text" className="focus:outline-none w-full" />
            </div>
            <SearchIcon className="h-6" />
        </form>
    );
}

export default SearchBar;
