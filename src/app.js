import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {styled} from './stitches.config';
import SideNavBar from "./components/sidenavbar";
import Discover from "./pages/discover";

import './css/app.scss';
import {useEffect, useState} from "react";

export default function App(props) {
    const [menuOpen, setMenuOpen] = useState(false)

    function openMenu(){
        setMenuOpen(true)
    }
    function closeMenu(){
        setMenuOpen(false)
    }

    useEffect(() => {
        document.addEventListener('open-menu', openMenu);
        document.addEventListener('close-menu', closeMenu);

        return () => {
            document.removeEventListener('open-menu', openMenu);
            document.removeEventListener('close-menu', closeMenu);
        }
    }, [])


    return (
        <Router>
            <PageContainer>
                <SideNavBar {...props} open={menuOpen}/>
                <ContentWrapper open={menuOpen}>
                    <Switch>
                        <Route
                            path="/discover"
                            render={props => <Discover menuOpen={menuOpen}/>}
                            {...props}/>
                    </Switch>
                </ContentWrapper>
            </PageContainer>
        </Router>
    );

}


const ContentWrapper = styled('main', {
    transition: 'all 300ms ease-in-out',
    '@desktop': {
        paddingLeft: 280,
        transform: 'translateX(0px)!important'
    },
    variants: {
        open: {
            true: {
                transform: 'translateX(280px)'
            }
        }
    }
})

const PageContainer = styled('main', {
    overflowX: 'hidden'
})
