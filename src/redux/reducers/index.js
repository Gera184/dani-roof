import { combineReducers } from "redux";
import { locationKeyReducer, selectedCityeducer } from "./weatherReducer";

const reducers = combineReducers({
  key: locationKeyReducer,
  city: selectedCityeducer,
});

export default reducers;
