import React from "react";
import {styled, theme} from '../../stitches.config';

import * as fetcher from "../../fetcher";

import SearchFilters from "../../components/searchfilter";
import MovieList from "../../components/movielist";
import {getPopularMovies} from "../../fetcher";
import MenuButton from "../../components/MenuButton";

export default class Discover extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
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
            ]
        };
    }

    // TODO: Preload and set the popular movies and movie genres when page loads
    async componentDidMount() {
        let [moviesRes, ] = await Promise.all([
            getPopularMovies()
        ])
        this.setState({
            totalCount: moviesRes.total_results,
            page: moviesRes.page,
            results: moviesRes.results
        })
    }

    // TODO: Update search results based on the keyword and year inputs



    render() {
        const {genreOptions, languageOptions, ratingOptions, totalCount, results} = this.state;

        const toggleMenu = () => {
            console.log(this.props.menuOpen)
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
                        />
                    </MovieFilters>
                    <Content>

                        <TotalCount>{totalCount} results</TotalCount>
                        <MovieResults>
                            <MovieList
                                movies={results || []}
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