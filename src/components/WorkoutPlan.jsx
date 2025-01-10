import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { daysOfWeek } from "../helper";

function WorkoutPlan() {
  const [activeDay, setActiveDay] = useState("");
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const navigate = useNavigate();

  const toggleDaySection = (day) => {
    setActiveDay((prevDay) => (prevDay === day ? "" : day));
  };

  useEffect(() => {
    const storedPlan = localStorage.getItem("workoutPlan");

    const parsedPlan = storedPlan ? JSON.parse(storedPlan) : null;

    setWorkoutPlan(parsedPlan);
  }, []);

  return (
    <section className="py-4">
      {workoutPlan ? (
        <>
          <div className="w-full p-4 py-8 rounded-lg shadow-lg bg-background contain">
            <h2 className="mb-4 text-2xl font-bold text-center text-text">
              Weekly Workout Plan
            </h2>

            {daysOfWeek.map((day) => (
              <div key={day} className="mb-4">
                {/* Day Header */}
                <div
                  className="flex items-center justify-between p-3 bg-gray-200 rounded-lg cursor-pointer"
                  onClick={() => toggleDaySection(day)}
                >
                  <h3 className="text-xl font-semibold text-text">{day}</h3>
                  <img
                    className="size-8"
                    src={activeDay === day ? "uparrow.png" : "downarrow.png"}
                    alt=""
                  />
                </div>

                {/* Day Content */}
                {activeDay === day && !workoutPlan[day]?.isRest && (
                  <div className="p-4 mt-4 border rounded-lg">
                    {/* <div className="text-center">
                      <h4 className="text-xl font-semibold text-primary">
                        Muscles to Train :
                        {workoutPlan[day]?.selectedMuscles.map(
                          (muscle, index) => (
                            <span key={muscle.value} className="ml-2">
                              {muscle.value}
                              {index <
                                workoutPlan[day].selectedMuscles.length - 1 &&
                                ","}
                            </span>
                          )
                        )}
                      </h4>
                    </div> */}

                    <div className="mt-2">
                      <h4 className="text-2xl font-bold text-center text-text">
                        Muscles to Train
                      </h4>
                      <div className="mt-2">
                        {workoutPlan[day]?.selectedMuscles.map((muscle) => (
                          <div key={muscle.value} className="mt-8">
                            {/* Muscle Name */}
                            <h5 className="text-xl font-bold text-primary">
                              {muscle.value}
                            </h5>

                            {/* Exercises Table */}
                            <div className="mt-2 overflow-x-auto">
                              <table className="w-full border-collapse table-auto">
                                <thead>
                                  <tr>
                                    <th className="p-2 border border-gray-300 rounded-lg">
                                      Exercise
                                    </th>
                                    <th className="p-2 border border-gray-300">
                                      Sets
                                    </th>
                                    <th className="p-2 border border-gray-300">
                                      Reps Range
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {workoutPlan[day]?.exercises
                                    ?.filter(
                                      (exercise) =>
                                        exercise.targetedMuscle === muscle.value
                                    )
                                    .map((exercise, index) => (
                                      <tr
                                        key={index}
                                        className="odd:bg-gray-200"
                                      >
                                        <td className="p-2 border border-gray-300">
                                          {exercise.name}
                                        </td>
                                        <td className="p-2 text-center border border-gray-300">
                                          {exercise.sets}
                                        </td>
                                        <td className="p-2 text-center border border-gray-300">
                                          {exercise.reps}
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeDay === day && workoutPlan[day]?.isRest && (
                  <p className="px-2 mt-4 text-xl text-primary">
                    The day is marked as rest.
                  </p>
                )}
              </div>
            ))}
            <div className="text-center">
              <button
                onClick={() => navigate("/workoutplan/change")}
                className="px-4 py-2 mt-4 font-semibold rounded-lg text-text bg-primary bg-opacity-80 hover:bg-opacity-100"
              >
                Edit Workout Plan
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen p-4 bg-background">
          <h2 className="mb-4 text-2xl font-bold text-center text-text md:text-3xl lg:text-4xl">
            There is not any workout plan yet!
          </h2>
          <button
            className="px-6 py-2 font-bold transition rounded bg-primary text-text hover:bg-secondary md:py-3 md:px-8 md:text-lg"
            onClick={() => navigate("/workoutplan/change")}
          >
            Add Plan
          </button>
        </div>
      )}
    </section>
  );
}

export default WorkoutPlan;
