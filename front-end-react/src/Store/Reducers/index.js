import { combineReducers } from "redux";
import carsReducer from "./cars";

import expensesReducer from "./expenses";
import tripsReducer from "./trips";
import selectedCarReducer from "./selectedCarReducer";

const rootReducers = combineReducers({
  cars: carsReducer,
  expenses: expensesReducer,
  trips: tripsReducer,
  selectedCar: selectedCarReducer
});

export default rootReducers;
