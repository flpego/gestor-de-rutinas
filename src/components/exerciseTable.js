import { openDB, addFavoriteExercise } from '../services/dbService';
export class ExerciseTable {
  constructor(exercises) {
    this.exercises = exercises;
    this.dbPromise = openDB();
  }

  render() {
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Muscle Group</th>
            <th>+</th>
          </tr>
        </thead>
        <tbody>
          ${this.exercises.map((exercise, index) => `
            <tr>
              <td>${exercise.exercise}</td>
              <td>${exercise.muscleGroup}</td>
              <td><button id="button-plus-${index}">+</button></td>
            </tr>
          `).join('')}
        </tbody>
      `;
    setTimeout(() => this.addExerciseToFav(), 0);
    return table;
  }


  addExerciseToFav() {
    this.dbPromise.then(() => {
      this.exercises.forEach((exercise, index) => {
        const buttonPlus = document.getElementById(`button-plus-${index}`);
        buttonPlus.addEventListener('click', () => {
          const username = localStorage.getItem('loggedInUser'); 
          if (username) {
            addFavoriteExercise(username, exercise).then(() => {
              alert('Exercise added to favorites');
            }).catch((error) => {
              console.error('Error adding exercise to favorites:', error);
            });
          } else {
            alert('No user is logged in.');
          }
        });
      });
    }).catch((error) => {
      console.error('Error opening database:', error);
    });
  }
}
