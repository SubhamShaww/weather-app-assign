export const initialState = {};

export const actionTypes = {
    SET_LOCATION: "SET_LOCATION",
    SET_CITYNAME: "SET_CITYNAME",
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_LOCATION:
            return action.locationData;

        case actionTypes.SET_CITYNAME:
            return {
                ...state,
                city: {
                    name: action.cityName,
                },
            };

        default:
            return state;
    }
};

export default reducer;
