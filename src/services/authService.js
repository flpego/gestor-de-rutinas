import { addUser, getUser } from "./dbService";

export class RegisterUser {
  static async saveUser(username, password) {
    try {
      const user = { username, password, favoriteExercises: [] };
      await addUser(user);
      console.log('User registered:', user);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }
}

export class LoginService {

  static async loginUser(username, password) {
    try {
      const user = await getUser(username);
      if (user && user.password === password) {
        localStorage.setItem('loggedInUser', username);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error logging in user:', error);
      return false;
    }
  }
}