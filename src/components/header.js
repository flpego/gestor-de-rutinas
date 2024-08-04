import { getUser } from "../services/dbService";

export class Header {
    constructor() {
        this.header = document.createElement('header');
        this.header.id = 'header'
        this.username = null;
    }

    async fetchUser() {
        const username = localStorage.getItem('loggedInUser');
        if (username) {
            try {
                const user = await getUser(username);
                this.username = user ? user.username : 'Guest';
            } catch (error) {
                console.error('Error fetching user:', error);
                this.username = 'Guest';
            }
        } else {
            this.username = 'Guest';
        }
    }


    async render() {
        await this.fetchUser();
        this.header.innerHTML = `
        <nav>
            <ul>
                <li><a href="#/home">Home</a></li>
                <li><a href="#/login">Login</a></li>
                <li><a href="#/register">Register</a></li>
                <li>${this.username ? `${this.username} <button id="logout-button">Logout</button>` : ''}</li>
            </ul>
        </nav>
        `;
        this.addLogoutListener();
        return this.header;
    }

    addLogoutListener() {
        const logoutButton = this.header.querySelector('#logout-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('loggedInUser');
                window.location.hash = '#/login';
            });
        }
    }
}