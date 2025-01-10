import React, { useState, useEffect } from "react";

const Home = () => {
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [dailyLog, setDailyLog] = useState([]);
  const [exercises, setExercises] = useState([]);

  // Fetch exercises from ExerciseDB API
  useEffect(() => {
    fetch("https://exercisedb.p.rapidapi.com/exercises", {
      headers: {
        "X-RapidAPI-Key": "f161361abemsh820c9294dcdb5a6p13905fjsn5961672678b1",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    })
      .then((res) => res.json())
      .then((data) => setExercises(data))
      .catch((err) => console.error(err));
  }, []);

  // Add new workout plan (sample logic)
  const addWorkoutPlan = (day, muscleGroup, exerciseList) => {
    const newPlan = { day, muscleGroup, exercises: exerciseList };
    setWorkoutPlan([...workoutPlan, newPlan]);
    localStorage.setItem(
      "workoutPlan",
      JSON.stringify([...workoutPlan, newPlan])
    );
  };

  // Add daily log (sample logic)
  const addDailyLog = (exercise, sets, reps, weight) => {
    const newLog = { exercise, sets, reps, weight };
    setDailyLog([...dailyLog, newLog]);
    localStorage.setItem("dailyLog", JSON.stringify([...dailyLog, newLog]));
  };

  return (
    <div className="bg-background contain text-text font-body min-h-screen">

      {/* Workout Summary Section */}
      <section className="p-4">
        <h2 className="text-2xl font-bold mb-4">Today's Workout</h2>
        <div className="space-y-4">
          {dailyLog.length > 0 ? (
            dailyLog.map((log, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-bold text-xl">{log.exercise}</p>
                  <p className="text-base">
                    {log.sets} sets, {log.reps} reps, {log.weight} kg
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-base">No workout logged for today yet.</p>
          )}
        </div>
        {/* Add Daily Log Button */}
        <button
          onClick={() => addDailyLog("Push-ups", 3, 15, 0)} // Example
          className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition text-base"
        >
          Add Daily Log
        </button>
      </section>

      {/* Weekly Workout Plan Section */}
      <section className="p-4">
        <h2 className="text-2xl font-bold mb-4">Weekly Workout Plan</h2>
        <div className="space-y-4">
          {workoutPlan.length > 0 ? (
            workoutPlan.map((plan, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-bold text-xl">Day: {plan.day}</p>
                  <p className="text-base">
                    Muscles: {plan.muscleGroup.join(", ")}
                  </p>
                  <p className="text-base">
                    Exercises: {plan.exercises.join(", ")}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-base">No workout plan created yet.</p>
          )}
        </div>
        {/* Add Workout Plan Button */}
        <button
          onClick={() =>
            addWorkoutPlan("Monday", ["Chest"], ["Push-ups", "Bench Press"])
          } // Example
          className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition text-base"
        >
          Add Workout Plan
        </button>
      </section>
    </div>
  );
};

export default Home;
