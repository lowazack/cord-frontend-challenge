import React, {useEffect, useState} from "react";
import {styled, theme} from '../../stitches.config';

import SearchBar from "../../components/searchbar";

import SearchIcon from "../../images/search-icon-yellow.png";
import YearIcon from "../../images/year-icon.png";
import FilterIcon from "../../images/filter-icon.png";

import AccordionFilter from "../accordionfilter";


export default function SearchFilters(
    {
        genres,
        ratings,
        languages,
        onSearch,
        activeGenres,
        minVote,
        genreCallback,
        voteCallback
    }) {

    const [query, setQuery] = useState(null);
    const [year, setYear] = useState(null);
    const [lang, setLang] = useState(null);
    const [filtersOpen, setFiltersOpen] = useState(false)


    function langCallback(id) {
        lang === id ? setLang(null) : setLang(id)
    }


    useEffect(() => {
        if (
            query !== null
        ) {
            onSearch(query, year, lang)
        }

    }, [query, onSearch, year, lang])

    return (
        <FiltersWrapper>
            <SearchFiltersCont className="search_inputs_cont" marginBottom={true}>
                <InputAndToggle>
                    <SearchBar
                        id="keyword_search_input"
                        type="text"
                        icon={{src: SearchIcon, alt: 'Magnifying glass'}}
                        placeholder="Search for movies"
                        onChange={setQuery}
                    />
                    <ToggleButton onClick={()=> setFiltersOpen(!filtersOpen)}>
                        <img src={FilterIcon} alt="Toggle Filters Icon"/>
                    </ToggleButton>
                </InputAndToggle>
                <SearchBar
                    id="year_search_input"
                    type="number"
                    icon={{src: YearIcon, alt: 'Calendar icon'}}
                    placeholder="Year of release"
                    onChange={setYear}
                    toggleMobile={true}
                    openMobile={filtersOpen}
                />
            </SearchFiltersCont>
            <SearchFiltersCont filters={true} filtersOpen={filtersOpen}>
                <CategoryTitle>Movies</CategoryTitle>
                <AccordionFilter type="Genre(s)" values={genres} activeValues={activeGenres} callback={genreCallback}/>
                <AccordionFilter type="min. vote" values={ratings} activeValues={[minVote]} callback={voteCallback}/>
                <AccordionFilter type="Language" values={languages} activeValues={[lang]} callback={langCallback}/>
            </SearchFiltersCont>
        </FiltersWrapper>
    );
}

const FiltersWrapper = styled('div', {
    position: 'relative'
})

const SearchFiltersCont = styled('div', {
    py: theme.space.md,
    borderRadius: 5,
    transition: 'all .3s ease- in -out',
    '@desktop': {
        backgroundColor: theme.colors.bodyLighten,
        padding: theme.space.md,
    },
    variants: {
        marginBottom: {
            true: {
                '@desktop': {
                    mb: theme.space.sm,
                }
            }
        },
        filters: {
            true: {
                display: 'none',
                '@desktop': {
                    display: 'block',
                }
            }
        },
        filtersOpen: {
            true: {
                display: 'block',
            }
        }
    },
})

const CategoryTitle = styled('h3', {
    margin: '0 0 15px 0'
})

const InputAndToggle = styled('div', {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: theme.space.sm,
    mb: theme.space.sm,
    '@desktop': {
        gridTemplateColumns: '1fr',
    }
})
const ToggleButton = styled('button', {
    backgroundColor: 'transparent',
    border: 0,
    borderColor: theme.colors.primaryColor,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    '@desktop': {
        display: 'none',
    }
})