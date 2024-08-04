export class Footer {
    constructor() {
        this.footer = document.createElement('footer');
        this.footer.id = 'footer'
    }
    render() {
        this.footer.innerHTML = `
         <p>&copy; 2024 My Vanilla JS App</p>
        `;
        return this.footer;
    }
}