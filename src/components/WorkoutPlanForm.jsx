import React, { useState, useEffect } from "react";
import Select from "react-select";
import { exercisesData, daysOfWeek } from "../helper";
import { useNavigate } from "react-router";

const WorkoutPlanForm = () => {
  const [activeDay, setActiveDay] = useState(""); // Tracks which day's section is expanded
  const [workouts, setWorkouts] = useState({});
  const [newExercise, setNewExercise] = useState({
    name: "",
    sets: "",
    reps: "",
    targetedMuscle: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Load workout plan from local storage if it exists
    const savedWorkouts = localStorage.getItem("workouts");
    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts));
    }
  }, []);

  const toggleDaySection = (day) => {
    setActiveDay((prevDay) => (prevDay === day ? "" : day));
  };

  const handleRestToggle = (day) => {
    setWorkouts((prevWorkouts) => ({
      ...prevWorkouts,
      [day]: {
        ...prevWorkouts[day],
        isRest: !prevWorkouts[day]?.isRest,
        exercises: !prevWorkouts[day]?.isRest
          ? []
          : prevWorkouts[day]?.exercises,
        selectedMuscles: [],
      },
    }));
  };

  const handleMuscleChange = (day, selectedOptions) => {
    setWorkouts((prevWorkouts) => ({
      ...prevWorkouts,
      [day]: {
        ...prevWorkouts[day],
        selectedMuscles: selectedOptions,
      },
    }));
  };

  const handleAddExercise = (day) => {
    if (
      !newExercise.name ||
      !newExercise.sets ||
      !newExercise.reps ||
      !newExercise.targetedMuscle
    ) {
      alert("Please complete all exercise details.");
      return;
    }

    // Prevent duplicate exercises
    const existingExercises = workouts[day]?.exercises || [];
    if (
      existingExercises.some((exercise) => exercise.name === newExercise.name)
    ) {
      alert("This exercise is already added for the selected day.");
      return;
    }

    setWorkouts((prevWorkouts) => ({
      ...prevWorkouts,
      [day]: {
        ...prevWorkouts[day],
        exercises: [...existingExercises, newExercise],
      },
    }));
    setNewExercise({ name: "", sets: "", reps: "", targetedMuscle: "" }); // Reset form
  };

  const handleDeleteExercise = (day, index) => {
    setWorkouts((prevWorkouts) => {
      const updatedExercises = prevWorkouts[day].exercises.filter(
        (_, i) => i !== index
      );
      return {
        ...prevWorkouts,
        [day]: {
          ...prevWorkouts[day],
          exercises: updatedExercises,
        },
      };
    });
  };

  const handleSaveWorkout = () => {
    const allFilled = daysOfWeek.every((day) => {
      const dayData = workouts[day];
      return (
        dayData?.isRest ||
        (dayData?.exercises?.length > 0 && dayData?.selectedMuscles?.length > 0)
      );
    });

    if (!allFilled) {
      alert("Please complete all days or mark them as rest.");
      return;
    }

    localStorage.setItem("workouts", JSON.stringify(workouts));
    alert("Workout Plan Saved!");

    navigate("/workoutplan");
  };

  return (
    <div className="w-full p-4 mx-auto bg-white rounded-lg shadow-lg contain">
      <h2 className="mb-4 text-2xl font-bold text-center">
        Weekly Workout Plan
      </h2>

      {daysOfWeek.map((day) => (
        <div key={day} className="mb-4">
          {/* Day Header */}
          <div
            className="flex items-center justify-between p-3 bg-gray-100 rounded-lg cursor-pointer"
            onClick={() => toggleDaySection(day)}
          >
            <h3 className="text-xl font-semibold">{day}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRestToggle(day);
              }}
              className={`py-1 px-3 rounded ${
                workouts[day]?.isRest
                  ? "bg-red-500 text-white opacity-80 hover:opacity-100"
                  : "bg-green-500 text-white opacity-80 hover:opacity-100"
              }`}
            >
              {workouts[day]?.isRest ? "Cancel Rest" : "Set as Rest"}
            </button>
          </div>

          {/* Day Content */}
          {activeDay === day && !workouts[day]?.isRest && (
            <div className="p-4 mt-4 border rounded-lg">
              <h4 className="text-lg font-semibold">Muscles to Train</h4>
              <Select
                isMulti
                options={[
                  ...Object.keys(exercisesData).map((muscle) => ({
                    value: muscle,
                    label: muscle,
                  })),
                ]}
                value={workouts[day]?.selectedMuscles}
                onChange={(selectedOptions) =>
                  handleMuscleChange(day, selectedOptions)
                }
              />

              <h4 className="mt-4 text-lg font-semibold">Add Exercises</h4>
              <div className="mb-4">
                <label className="block mb-2">Targeted Muscle</label>
                <select
                  value={newExercise.targetedMuscle}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      targetedMuscle: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="">Select a muscle</option>
                  {workouts[day]?.selectedMuscles?.map((muscle) => (
                    <option key={muscle.value} value={muscle.value}>
                      {muscle.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Exercise</label>
                <select
                  value={newExercise.name}
                  onChange={(e) =>
                    setNewExercise({ ...newExercise, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="">Select an exercise</option>
                  {newExercise.targetedMuscle &&
                    exercisesData[newExercise.targetedMuscle]?.map(
                      (exercise) => {
                        const isSelected = workouts[day]?.exercises?.some(
                          (addedExercise) => addedExercise.name === exercise
                        );
                        return (
                          <option
                            key={exercise}
                            value={exercise}
                            disabled={isSelected}
                            style={isSelected ? { color: "#d1d5db" } : {}}
                          >
                            {exercise}
                          </option>
                        );
                      }
                    )}
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Sets</label>
                <select
                  value={newExercise.sets}
                  onChange={(e) =>
                    setNewExercise({ ...newExercise, sets: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="">Select Sets</option>
                  {Array.from({ length: 8 }, (_, i) => i + 1).map((set) => (
                    <option key={set} value={set}>
                      {set}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Reps</label>
                <select
                  value={newExercise.reps}
                  onChange={(e) =>
                    setNewExercise({ ...newExercise, reps: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="">Select Rep Range</option>
                  <option value="1-4">1 - 4</option>
                  <option value="4-8">4 - 8</option>
                  <option value="8-12">8 - 12</option>
                  <option value="12-16">12 - 16</option>
                  <option value="16-20">16 - 20</option>
                  <option value="20-25">20 - 25</option>
                  <option value="25-30">25 - 30</option>
                </select>
              </div>

              <button
                onClick={() => handleAddExercise(day)}
                className="px-4 py-2 mb-4 text-white rounded-lg bg-primary hover:bg-secondary hover:text-text"
              >
                + Add Exercise
              </button>

              {workouts[day]?.exercises?.length > 0 && (
                <ul className="flex flex-col gap-2">
                  {workouts[day].exercises.map((exercise, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-2 rounded-md bg-secondary"
                    >
                      <span>
                        {exercise.name} - {exercise.sets} sets of{" "}
                        {exercise.reps} reps ( Targeted Muscle:{" "}
                        {exercise.targetedMuscle})
                      </span>
                      <button
                        onClick={() => handleDeleteExercise(day, index)}
                        className="p-1 text-red-500 border-2 border-red-500 rounded-md hover:bg-primary"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeDay === day && workouts[day]?.isRest && (
            <p className="mt-4 text-gray-500">This day is marked as rest.</p>
          )}
        </div>
      ))}

      <div className="text-center">
        <button
          onClick={handleSaveWorkout}
          className="px-4 py-2 mt-4 rounded-lg text-text bg-primary opacity-90 hover:opacity-100"
        >
          Save Weekly Plan
        </button>
      </div>
    </div>
  );
};

export default WorkoutPlanForm;
