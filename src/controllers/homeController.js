import {HomeView} from '../views/homeView'

export class HomeController {
    constructor() {
      this.view = new HomeView();
    }
  
    init() {
      this.view.render();
    }
  }