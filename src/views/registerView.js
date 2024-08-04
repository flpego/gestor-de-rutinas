import { openDB, addUser } from '../services/dbService'


export class RegisterView {
  constructor() {
    this.app = document.getElementById("app");
    openDB();
  };

  render() {
    this.app.innerHTML = `
        <header id="header"></header>
        <main>
          <h1>Register</h1>
          <form id="register-form">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password">
            <button type="submit">Register</button>
          </form>
          <a href="#/home">Home</a> | <a href="#/register">Register</a>
        </main>
        `;

    this.addFormSubListener();
  };

  addFormSubListener() {
    const form = document.getElementById('register-form');
    form.addEventListener('submit', this.handleForm.bind(this))
  };

  async handleForm(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
      try {
        await addUser({ username, password });
        alert('User Registered successfully');
        window.location.hash = '#/home';
      } catch (error) {
        alert(error);
      }
    } else {
      alert('Please fill out both fields.');
    };

  };


}