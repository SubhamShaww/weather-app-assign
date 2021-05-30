import SearchBar from "../SearchBar";

function Loader({ cityName }) {
    return (
        <div className="flex flex-col items-start space-y-14">
            <div className="w-full">
                <SearchBar cityData={cityName} />
            </div>

            <div className="flex flex-col space-y-2 w-full items-start flex-grow">
                <div className="px-8 py-6">
                    <div className="loader-small"></div>
                </div>

                <div className="flex-grow w-full card-big">
                    <div className="loader-big"></div>
                </div>
            </div>
        </div>
    );
}

export default Loader;
