const API_BASE_URL = "FILL_IN_LATER";
//fill with actual url

async function showExercises(muscle) {
    document.getElementById("muscle-title").textContent = muscle;
    
    const exercisesList = document.getElementById("exercises-list");

    exercisesList.innerHTML = "";

    //replace /exercises with real backend endpoibt later
    const response = await fetch(`${API_BASE_URL}/exercises?muscle=${muscle}`);
    //yuno returns data as json
    const exercises = await response.json();

    //fill in later
    exercises.forEach(exercise => {
        const exerciseItem = document.createElement("p");

        //repalce exercise.name with actual property name
        exerciseItem.textContent = exercise.name;
        exercisesList.appendChild(exerciseItem);
    });
}