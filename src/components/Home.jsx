import React, { useState, useEffect } from "react";

const Home = () => {
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [todayDay, setTodayDay] = useState(null);
  const [exercises, setExercises] = useState([]);

  // Fetch exercises from ExerciseDB API
  // useEffect(() => {
  //   fetch("https://exercisedb.p.rapidapi.com/exercises", {
  //     headers: {
  //       "X-RapidAPI-Key": "f161361abemsh820c9294dcdb5a6p13905fjsn5961672678b1",
  //       "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setExercises(data))
  //     .catch((err) => console.error(err));
  // }, []);

  useEffect(() => {
    const storedPlan = localStorage.getItem("workoutPlan");
    const parsedPlan = storedPlan ? JSON.parse(storedPlan) : null;
    setWorkoutPlan(parsedPlan);

    const currentDate = new Date();
    const dayOfWeek = currentDate.toLocaleString("en-us", { weekday: "long" });
    setTodayDay(dayOfWeek);
  }, []);

  if (!workoutPlan || !todayDay) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background contain text-text font-body">
      <section className="py-2">
        <h2 className="mb-3 text-2xl font-bold text-center">Today's Workout</h2>
        {workoutPlan?.[todayDay]?.isRest === false ? (
          <div className="space-y-2">
            {workoutPlan[todayDay]?.selectedMuscles.map((muscle) => (
              <div key={muscle.value} className="mt-6">
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
                        <th className="w-24 p-2 border border-gray-300">
                          Sets
                        </th>{" "}
                        
                        <th className="w-24 p-2 border border-gray-300">
                          Reps Range
                        </th>{" "}
                        
                      </tr>
                    </thead>
                    <tbody>
                      {workoutPlan[todayDay]?.exercises
                        ?.filter(
                          (exercise) => exercise.targetedMuscle === muscle.value
                        )
                        .map((exercise, index) => (
                          <tr key={index} className="odd:bg-gray-200">
                            <td className="p-2 border border-gray-300">
                              {exercise.name}
                            </td>
                            <td className="w-24 p-2 text-center border border-gray-300">
                              {exercise.sets}
                            </td>
                            <td className="w-24 p-2 text-center border border-gray-300">
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
        ) : (
          <div className="mt-40 text-2xl text-center text-primary">Today is a Rest Day!</div>
        )}
      </section>
    </div>
  );
};

export default Home;
