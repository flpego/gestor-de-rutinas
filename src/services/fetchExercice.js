export class FetchExercise {
    constructor() {
        this.fetchData();
    }

    async fetchData() {
        const URL = './src/data/data.json';
        const res = await fetch(URL);
        return res.json();
    }
}

export class FetchExerciseById {
    constructor(id) {
        this.fetchData(id);
    }

    async fetchData() {
        const URL = `./src/data/data.json${this.id}`;
        const res = await fetch(URL);
        return res.json();
    }
}