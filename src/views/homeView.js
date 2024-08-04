import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FetchExercise } from "../services/fetchExercice";
import { ExerciseTable } from "../components/exerciseTable";
export class HomeView {
  constructor() {
    this.app = document.getElementById('app');
    this.header = new Header();
    this.footer = new Footer();
    this.fetchExercice = new FetchExercise();
  }

  async render() {
    this.clearApp();
    await this.renderHeader();
    this.renderMain();
    await this.renderExerciceTable();
    this.renderFooter();
  }


  clearApp() {
    this.app.innerHTML = ''
  }

  async renderHeader() {
    const header = await this.header.render();
    this.app.appendChild(header);
  }

  renderMain() {
    const main = document.createElement('main');
    main.innerHTML = `
      <h1>Welcome to our site</h1>
      <p>This is the Home view rendered with Vanilla JS.</p>
      <a href="#/login">Login</a> | <a href="#/register">Register</a>
    `;
    this.app.appendChild(main);
  }

  async renderExerciceTable() {
    try {
      const exercises = await this.fetchExercice.fetchData();
      const exerciseTable = new ExerciseTable(exercises);
      this.app.appendChild(exerciseTable.render());
      
    } catch (error) {
      console.error('Failed to fetch exercises:', error);
    }
  }

  renderFooter() {
    this.app.appendChild(this.footer.render());

  }
}
