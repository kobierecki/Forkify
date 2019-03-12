import axios from 'axios';

  async function getResults(query) {
    const key = '8cfdc815b922fe7f01f91462c3b0f99c';
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`);
    console.log(res);
  }

  getResults('pizza');