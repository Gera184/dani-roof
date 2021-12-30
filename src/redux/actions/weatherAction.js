import { ActionTypes } from "../contants/action-types";

export const setCityLocationKey = (key) => {
  return {
    type: ActionTypes.SET_LOCATION_KEY,
    payload: key,
  };
};

export const selectedCurrentCity = (selectedCity) => {
  return {
    type: ActionTypes.SELECTED_CITY,
    payload: selectedCity,
  };
};
