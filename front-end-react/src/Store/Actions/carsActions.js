import { ADD_CARS, ADD_CAR, SELECT_CAR } from "./actionTypes";

export const addCars = (payload) => {
  return { type: ADD_CARS, payload };
};

export const addCar = (payload) => {
  return { type: ADD_CAR, payload };
};

export const selectCar = (payload) => {
  return { type: SELECT_CAR, payload };
};
