import { LoginService } from '../services/authService'
export class LoginView {
  constructor() {
    this.app = document.getElementById('app');
  }

  render() {
    this.app.innerHTML = `
        <header id="header"></header>
        <main>
          <h1>Login</h1>
          <form id="login-form">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password">
            <button type="submit">Login</button>
          </form>
          <a href="#/home">Home</a> | <a href="#/register">Register</a>
        </main>
      `;
    this.addFormSubmitListener();
  }

  addFormSubmitListener() {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', this.handleForm.bind(this))
  }

  async handleForm(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
      const loginSuccessful = await LoginService.loginUser(username, password);
      if (loginSuccessful) {
        alert('Login successful!');
        window.location.hash = '#/home';
      } else {
        alert('Incorrect username or password.');
      }
    } else {
      alert('Please fill out both fields.');
    }

  }
}
