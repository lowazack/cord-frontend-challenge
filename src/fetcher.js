import axios from 'axios';
const apiKey = 'eef1cdd8808fd6bc881946d3058ebeea';
const baseUrl = 'https://api.themoviedb.org/3';

// TODO: All of your API requests should be in this file
// See the README file for more information about the APIs you would need to use

async function getPopularMovies(){
    let res = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`)
    return res.data;
}


export {getPopularMovies}