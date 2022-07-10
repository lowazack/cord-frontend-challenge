import axios from 'axios';
const apiKey = 'eef1cdd8808fd6bc881946d3058ebeea';
const baseUrl = 'https://api.themoviedb.org/3';

async function getPopularMovies(){
    let res = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`)
    return res.data;
}

async  function getGenres(){
    let res = await axios.get(`${baseUrl}//genre/movie/list?api_key=${apiKey}`)
}


export {getPopularMovies, getGenres}