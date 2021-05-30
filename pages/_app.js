import reducer, { initialState } from "../contextAPI/reducer";
import { StateProvider } from "../contextAPI/StateProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <Component {...pageProps} />
        </StateProvider>
    );
}

export default MyApp;
