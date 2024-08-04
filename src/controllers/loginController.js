import { LoginView } from '../views/loginView.js';

export class LoginController {
  constructor() {
    this.view = new LoginView();
  }

  init() {
    this.view.render();
  }
}
