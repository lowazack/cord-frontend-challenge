import { createStitches } from '@stitches/react';

export const {
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme,
    config,
} = createStitches({
    theme: {
        colors: {
            primaryColor: '#c4ca18',
            lightBackground: '#f6f7f9',
            bodyLighten: '#ffffff',
            fontColor: '#31475f',
            sideNavBarHover: '#001b29',
            sideNavBar: '#001e2d',
        },
        space: {
            xs: '5px',
            sm: '15px',
            md: '20px',
            lg: '35px',
            xl: '45px',
        }
    },
    media: {
        desktop: '(min-width: 1200px)',
    },
    utils: {
        pl: (value) => ({paddingLeft: value}),
        px: (value) => ({paddingLeft: value, paddingRight: value}),
        py: (value) => ({paddingTop: value, paddingBottom: value}),
        mb: (value) => ({marginBottom: value}),
        mr: (value) => ({marginRight: value}),
        mt: (value) => ({marginTop: value}),
    },
});