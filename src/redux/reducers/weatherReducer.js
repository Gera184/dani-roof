import { ActionTypes } from "../contants/action-types";


export const locationKeyReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_LOCATION_KEY:
      return { ...state, payload };
    default:
      return state;
  }
};

export const selectedCityeducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_CITY:
      return { ...state, ...payload };

    case ActionTypes.REMOVE_SELECTED_WEATHER:
      return {};
    default:
      return state;
  }
};
