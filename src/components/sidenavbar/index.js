import React, {useState} from "react";
import {styled, theme} from '../../stitches.config';
import {NavLink as Link} from "react-router-dom";

import * as colors from "../../colors";
import Arrow from "../../images/arrow-icon.png";
import SearchWhite from "../../images/search-icon-white.png";

export default function SideNavBar({open}) {



    return (
        <SideNavBarCont open={open}>
            {/* TODO: Implement a hamburger icon that controls the open state of the sidebar. This control should only be visible on mobile devices via CSS media queries */}
            {/* The sidebar should slide in from left */}
            <SideNavHeader>
                Wesley
                <img src={Arrow} alt="Arrow pointing down"/>
            </SideNavHeader>
            <SideNavMainLink to="/discover" exact>
                Discover
                <img src={SearchWhite} alt="Magnifying glass"/>
            </SideNavMainLink>
            <SideNavSectionTitle><HeaderText>Watched</HeaderText></SideNavSectionTitle>
            <NavLink to="/watched/movies">Movies</NavLink>
            <NavLink to="/watched/tv-shows">Tv Shows</NavLink>
            <SideNavSectionTitle><HeaderText>Saved</HeaderText></SideNavSectionTitle>
            <NavLink to="/saved/movies">Movies</NavLink>
            <NavLink to="/saved/tv-shows">Tv Shows</NavLink>
        </SideNavBarCont>
    );
}

const SideNavBarCont = styled('div', {
    position: 'fixed',
    zIndex: 9,
    width: 280,
    height: '100%',
    backgroundColor: theme.colors.sideNavBar,
    color: '#ffffff',
    left: -280,
    transition: 'all 200ms ease-in-out',

    '@desktop': {
        left: 0,
    },

    variants: {
        open: {
            true: {
                left: 0,
            }
        }
    }
})

const SectionsStyles = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '25px 35px',
    fontSize: "1.6rem",
    fontWeight: 700,
    color: '#ffffff',
}

const SideNavMainLink = styled('a', {
    ...SectionsStyles,
    '&:hover, &:focus-visible': {
        background: theme.colors.sideNavBarHover,
    },
    '&.active': {
        background: theme.colors.primaryColor
    }
})


const SideNavHeader = styled('div', {
    ...SectionsStyles,
});

const SideNavSectionTitle = styled('div', {
    fontSize: '1.6rem',
    fontWeight: 700,
    padding: '25px 0 15px 35px',
})

const HeaderText = styled('div', {
    padding: '0 35px 10px 0',
    borderBottom: `1px solid ${theme.colors.lightBackground}`
})

const NavLink = styled('a', {
    display: 'block',
    color: '#ffffff',
    opacity: .8,
    fontSize: '1.2rem',
    padding: '10px 35px',
    '&:hover, &:focus-visible': {
        opacity: 1,
        background: theme.colors.sideNavBarHover,
    },
    '&.active': {
        background: theme.colors.primaryColor,
        opacity: 1,
    }
})