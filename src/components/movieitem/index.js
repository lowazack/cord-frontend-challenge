import React from "react";
import {styled, theme} from '../../stitches.config';

export default function MovieItem({movie, genres}) {
    return (
        // TODO: Complete the  MovieItem component
        <MovieItemWrapper>
            <Poster src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}/>
            <Info>
                <Title>{movie.title}</Title>
                <Genres>
                    {movie.genre_ids.map(genreId =>
                        <Genre key={`genre-${genreId}`}>
                            {genres.filter(genreObj => {
                                return genreObj.id === genreId
                            })[0].name}
                        </Genre>
                    )}
                </Genres>

                <Overview>
                    {movie.overview}
                </Overview>

                <Date dateTime={movie.release_date}>
                    {movie.release_date}
                </Date>
            </Info>
            <Rating>
                {movie.vote_average}
            </Rating>
        </MovieItemWrapper>
    )
}

const MovieItemWrapper = styled('div', {
    position: 'relative',
    backgroundColor: theme.colors.bodyLighten,
    borderRadius: 5,
    padding: theme.space.md,
    margin: `${theme.space.sm.value} 0`,
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: theme.space.md,
})


const Poster = styled('img', {
    width: 100,
    '@desktop': {
        width: 120,
    }
})

const Info = styled('div', {
    display: 'flex',
    flexDirection: 'column',
})

const Title = styled('h2', {
    fontSize: '1.4rem',
    margin: 0,
    paddingRight: 40,
});

const Genres = styled('h5', {
    margin: 0,
    color: theme.colors.primaryColor,
    mb: theme.space.sm
})

const Genre = styled('span', {
    '&:after': {
        content: " | "
    },
    '&:last-of-type': {
        '&:after': {
            content: ""
        }
    }
})

const Overview = styled('p', {
    margin: 0,
    mb: theme.space.sm,
    display: '-webkit-box',
    '-webkit-line-clamp': 4,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden'
})

const Date = styled('time', {
    color: theme.colors.primaryColor,
    mt: 'auto',
})

const Rating = styled('span', {
    position: 'absolute',
    top: theme.space.md,
    right: theme.space.md,
    color: theme.colors.bodyLighten,
    backgroundColor: theme.colors.primaryColor,
    px: 5,
    py: 2,
    borderRadius: 5,
})