import React from "react";
import {styled, theme} from '../../stitches.config';

import * as fetcher from "../../fetcher";

import SearchFilters from "../../components/searchfilter";
import MovieList from "../../components/movielist";
import {getPopularMovies} from "../../fetcher";

export default class Discover extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      keyword: '',
      year: 0,
      results: [],
      totalCount: 0,
      page: 1,
      genreOptions: [],
      ratingOptions: [
        { id: 7.5, name: 7.5 },
        { id: 8, name: 8 },
        { id: 8.5, name: 8.5 },
        { id: 9, name: 9 },
        { id: 9.5, name: 9.5 },
        { id: 10, name: 10 }
      ],
      languageOptions: [
        { id: 'GR', name: 'Greek' },
        { id: 'EN', name: 'English' },
        { id: 'RU', name: 'Russian' },
        { id: 'PO', name: 'Polish' }
      ]
    };
  }

  // TODO: Preload and set the popular movies and movie genres when page loads
  async componentDidMount() {
    let moviesRes = await getPopularMovies();
    this.setState({
      totalCount: moviesRes.total_results,
      page: moviesRes.page,
      results: moviesRes.results
    })

    console.log(moviesRes)
  }

  // TODO: Update search results based on the keyword and year inputs

  render () {
    const { genreOptions, languageOptions, ratingOptions, totalCount, results } = this.state;

    return (
      <DiscoverWrapper>
        <MobilePageTitle>Discover</MobilePageTitle> {/* MobilePageTitle should become visible on mobile devices via CSS media queries*/}
        <TotalCount>{totalCount} results</TotalCount>
        <MovieFilters>
          <SearchFilters 
            genres={genreOptions} 
            ratings={ratingOptions}  
            languages={languageOptions}
            searchMovies={(keyword, year) => this.searchMovies(keyword, year)}
          />
        </MovieFilters>
        <MovieResults>
          <MovieList 
            movies={results || []}
            genres={genreOptions || []}
          />
        </MovieResults>
      </DiscoverWrapper>
    )
  }
}

const DiscoverWrapper = styled('main', {
  padding: theme.space.sm,
  pl: theme.space.xl
})

const MovieResults = styled('div', {
  display: 'inline-block',
  width: 'calc(100% - 295px)'
})

const MovieFilters = styled('div', {
  width: 280,
  float: 'right',
  marginTop: 15,
})

const MobilePageTitle = styled('h1', {
  display: 'none'
})

const TotalCount = styled('strong',  {
  display: 'block'
})