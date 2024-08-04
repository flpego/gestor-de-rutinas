import { RegisterView } from '../views/registerView'

export class RegisterController {
    constructor() {
        this.view = new RegisterView();
    }

    init(){
        this.view.render();
    }
}