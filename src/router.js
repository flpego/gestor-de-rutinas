import { HomeController } from './controllers/homeController.js';
import { LoginController } from './controllers/loginController.js';
import { RegisterController} from './controllers/registerController.js'
const routes = {
    '/': HomeController,
    '/home': HomeController,
    '/login': LoginController,
    '/register': RegisterController,
};


function router() {
    const path = location.hash.slice(1).toLocaleLowerCase() || '/';
    const Controller = routes[path] || HomeController;
    const controller = new Controller();
    controller.init();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);