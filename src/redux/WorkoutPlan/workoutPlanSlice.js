import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage, if it exists
const savedWorkoutPlan = localStorage.getItem("workouts");
const initialState = {
  workoutPlan: savedWorkoutPlan ? JSON.parse(savedWorkoutPlan) : {}, // Load from localStorage if available
};

const workoutPlanSlice = createSlice({
  name: "workoutPlan",
  initialState,
  reducers: {
    loadWorkoutPlan: (state, action) => {
      state.workoutPlan = action.payload; // Replace workoutPlan with the one passed
    },
    saveWorkoutPlan: (state) => {
      localStorage.setItem("workouts", JSON.stringify(state.workoutPlan)); // Save workoutPlan to localStorage
    },
  },
});

export const { loadWorkoutPlan, saveWorkoutPlan } = workoutPlanSlice.actions;

export default workoutPlanSlice.reducer;
