export const initialState = {};

export const actionTypes = {
    SET_LOCATION: "SET_LOCATION",
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_LOCATION:
            return action.locationData;

        default:
            return state;
    }
};

export default reducer;
