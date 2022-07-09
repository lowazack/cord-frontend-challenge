import React from "react";
import {styled} from '../../stitches.config';

import MovieItem from '../movieitem';


export default function MovieList ({ movies, genres }) {
  return (
    <MoviesWrapper>
      { movies.map(movie => <MovieItem key={movie.id} movie={movie} genres={genres} />)}
    </MoviesWrapper>
  )
}

const MoviesWrapper = styled('div', {
  position: 'relative'
})