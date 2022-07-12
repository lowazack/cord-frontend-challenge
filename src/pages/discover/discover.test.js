import React from 'react';
import {getPopularMovies, searchMovies} from "../../fetcher";

it('pulls the popular movies', async () => {
    let popularMovies = await getPopularMovies();
    expect(popularMovies.results.length).toBeGreaterThanOrEqual(1)
});

it('it can search for movies', async () => {
    const [fullSearch, queryYear, justQuery] = await Promise.all([
        searchMovies('Minions', 2022, 'EN'),
        searchMovies('jurassic park', 1993),
        searchMovies('Fantastic four' ),
    ])

    const vals = [
        fullSearch.results.length === 2,
        queryYear.results.length === 2,
        justQuery.results.length === 8,
    ]
    expect(vals.includes(false)).toBe(false)
})

