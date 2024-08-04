import { User } from '../models/UserModel';

const DB_NAME = 'FitnessApp';
const DB_VERSION = 1;
let db;

export async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'username' });
      }
      if (!db.objectStoreNames.contains('exercises')) {
        db.createObjectStore('exercises', { autoIncrement: true });
      }
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function addUser(user) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['users'], 'readwrite');
    const store = transaction.objectStore('users');
    const request = store.add(user);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function getUser(username) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['users'], 'readonly');
    const store = transaction.objectStore('users');
    const request = store.get(username);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function addFavoriteExercise(username, exercise) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['users'], 'readwrite');
    const store = transaction.objectStore('users');
    const request = store.get(username);

    request.onsuccess = (event) => {
      const user = event.target.result;
      if (user) {
        if (!user.favoriteExercises) {
          user.favoriteExercises = [];
        }
        user.favoriteExercises.push(exercise);
        const updateRequest = store.put(user);
        
        updateRequest.onsuccess = () => {
          resolve(updateRequest.result);
        };

        updateRequest.onerror = () => {
          reject(updateRequest.error);
        };
      } else {
        reject(new Error('User not found'));
      }
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}
