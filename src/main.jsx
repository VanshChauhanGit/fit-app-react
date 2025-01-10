import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import Workout from "./components/Workout.jsx";
import WorkoutPlan from "./components/WorkoutPlan.jsx";
import AddWorkoutPlan from "./components/WorkoutPlanForm.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <div className="">
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="" element={<Home />} />
              <Route path="*" element={<Home />} />
              <Route path="workout" element={<Workout />} />
              <Route path="workoutplan" element={<WorkoutPlan />} />
              <Route path="workoutplan/change" element={<AddWorkoutPlan />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  </StrictMode>
);
