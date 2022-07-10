import React, {useEffect, useState} from "react";
import styled, {css} from 'styled-components';

import SearchBar from "../../components/searchbar";

import SearchIcon from "../../images/search-icon-yellow.png";
import YearIcon from "../../images/year-icon.png";
import AccordionFilter from "../accordionfilter";

export default function SearchFilters({genres, ratings, languages, onSearch}) {
    const [query, setQuery] = useState(null);
    const [year, setYear] = useState(null);
    const [lang, setLang] = useState('GR');

    useEffect(() => {
        // console.log(genres);
        // console.log(ratings);
        console.log(languages);
    }, [genres])

    useEffect(() => {
        if (
            query !== null
        ) {
            onSearch(query, year, lang)
        }

    }, [query, onSearch, year, lang])

    return (
        <FiltersWrapper>
            <SearchFiltersCont className="search_inputs_cont" marginBottom>
                <SearchBar
                    id="keyword_search_input"
                    type="text"
                    icon={{src: SearchIcon, alt: 'Magnifying glass'}}
                    placeholder="Search for movies"
                    onChange={setQuery}
                />
                <SearchBar
                    id="year_search_input"
                    type="number"
                    icon={{src: YearIcon, alt: 'Calendar icon'}}
                    placeholder="Year of release"
                    onChange={setYear}
                />
            </SearchFiltersCont>
            <SearchFiltersCont>
                <CategoryTitle>Movies</CategoryTitle>
                <AccordionFilter type="Genre(s)" values={genres}/>
                <AccordionFilter type="min. vote"/>
                <AccordionFilter type="Language"/>
            </SearchFiltersCont>
        </FiltersWrapper>
    );
}

const FiltersWrapper = styled.div`
  position: relative; 
`

const SearchFiltersCont = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  transition: all .3s ease-in-out;

  .search_bar_wrapper:first-child {
    margin-bottom: 15px;
  }
  
  ${props => props.marginBottom && css`
    margin-bottom: 15px;
  `}
`

const CategoryTitle = styled.h3`
  margin: 0 0 15px 0;
`