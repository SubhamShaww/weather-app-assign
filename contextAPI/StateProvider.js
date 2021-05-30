import React, { createContext, useContext, useReducer } from "react";

// create the data layer
export const StateContext = createContext();

// setup the data layer
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// make the datalayer available to use
export const useStateValue = () => useContext(StateContext);
