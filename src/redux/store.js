import { configureStore } from "@reduxjs/toolkit";
import workoutPlanReducer from "./WorkoutPlan/workoutPlanSlice";

const store = configureStore({
  reducer: {
    workoutPlan: workoutPlanReducer, // use workoutPlanReducer here
  },
});

export default store;
