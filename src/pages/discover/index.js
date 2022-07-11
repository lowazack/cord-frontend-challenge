import React from "react";
import {styled, theme} from '../../stitches.config';


import SearchFilters from "../../components/searchfilter";
import MovieList from "../../components/movielist";
import {getGenres, getPopularMovies, searchMovies} from "../../fetcher";
import MenuButton from "../../components/MenuButton";

export default class Discover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            year: 0,
            results: [],
            totalCount: 0,
            page: 1,
            genreOptions: [],
            ratingOptions: [
                {id: 7.5, name: 7.5},
                {id: 8, name: 8},
                {id: 8.5, name: 8.5},
                {id: 9, name: 9},
                {id: 9.5, name: 9.5},
                {id: 10, name: 10}
            ],
            languageOptions: [
                {id: 'GR', name: 'Greek'},
                {id: 'EN', name: 'English'},
                {id: 'RU', name: 'Russian'},
                {id: 'PO', name: 'Polish'}
            ],
            minVote: null,
            activeGenres: []
        };
    }

    voteCallback = (id) => {
        this.state.minVote === id? this.setState({minVote: null}): this.setState({minVote: id})
    }

    genreCallback = (id) => {
        if (this.state.activeGenres.includes(id)){
            this.setState({
                activeGenres: this.state.activeGenres.filter(genre => {
                    return genre !== id
                })
            })
        } else {
            this.setState({
                activeGenres:[...this.state.activeGenres, id]
            })

        }
    }

    async componentDidMount() {
        let [moviesRes, genreRes] = await Promise.all([
            getPopularMovies(),
            getGenres()
        ])


        this.setState({
            totalCount: moviesRes.total_results,
            page: moviesRes.page,
            results: moviesRes.results,
            genreOptions: genreRes.genres,
        })
    }

    searchMoviesCallback = async (query, year, lang) => {
        let movies = await searchMovies(query, year, lang);

        this.setState({
            results: movies.results,
            totalCount: movies.total_results,
        })
    }

    filteredResults = () => {
        let results = this.state.results;
        if (this.state.activeGenres.length){
            results = results.filter(result => {
                return result.genre_ids.filter(genreId => {
                    return this.state.activeGenres.includes(genreId)
                }).length
            })
        }

        if(this.state.minVote){
            results = results.filter(result => {
                return result.vote_average >= this.state.minVote;
            })
        }
        return results;
    }

    render() {
        const {genreOptions, languageOptions, ratingOptions, totalCount, results} = this.state;
        const toggleMenu = () => {
            if (this.props.menuOpen){
                document.dispatchEvent(new Event('close-menu'));
            } else {
                document.dispatchEvent(new Event('open-menu'));
            }

        }

        return (
            <Container>
                <MobilePageTitle>
                    <MenuButton onClick={toggleMenu}/>
                    Discover
                </MobilePageTitle> {/* MobilePageTitle should become visible on mobile devices via CSS media queries*/}
                <DiscoverWrapper>
                    <MovieFilters>
                        <SearchFilters
                            genres={genreOptions}
                            ratings={ratingOptions}
                            languages={languageOptions}
                            searchMovies={(keyword, year) => this.searchMovies(keyword, year)}
                            onSearch={this.searchMoviesCallback}
                            voteCallback={this.voteCallback}
                            minVote={this.state.minVote}
                            activeGenres={this.state.activeGenres}
                            genreCallback={this.genreCallback}

                        />
                    </MovieFilters>
                    <Content>
                        <TotalCount>{totalCount} results</TotalCount>
                        <MovieResults>
                            <MovieList
                                movies={this.filteredResults() || []}
                                genres={genreOptions || []}
                            />
                        </MovieResults>
                    </Content>
                </DiscoverWrapper>
            </Container>
        )
    }
}

const DiscoverWrapper = styled('main', {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.space.md,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    '@desktop': {
        display: 'grid',
        gridTemplateColumns: '1fr 280px'
    }

})

const MovieResults = styled('div', {})

const Content =  styled('div', {
    '@desktop': {
        gridColumnStart: '1',
        gridRowStart: '1',
    }
})

const Container = styled('div', {
    padding: theme.space.sm,
    '@desktop': {
        pl: theme.space.xl,
    }
})

const MovieFilters = styled('div', {
    width: '100%',
    '@desktop': {
        marginTop: 38,
        width: 'auto',
        gridColumnStart: "2",
        gridRowStart: '0',
    }
})

const MobilePageTitle = styled('h1', {
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    '@desktop': {
        display: 'none'
    }
})

const TotalCount = styled('strong', {
    display: 'block'
})