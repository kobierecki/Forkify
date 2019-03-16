import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;

    }
    async getResults(query) {
        // https://cors-proxy.htmldriven.com/?url=
        // https://cors-anywhere.herokuapp.com/
        const key = '8cfdc815b922fe7f01f91462c3b0f99c';
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result);
        } catch(error)  {
            alert(error);
        }
    }
}

