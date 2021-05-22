import React, { useEffect } from "react";
import styled from "styled-components";
import {sidebarWidth,headerHeight} from 'styles/styleConst'
import { transSideBar} from "store/store";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import SearchBox from "components/header/SearchBox";
import LoginMenu from "components/header/LoginMenu";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import IconButton from '@material-ui/core/IconButton';


const Div = styled.div`
    position: fixed;
    left: ${sidebarWidth};
    right: 0;
    height: ${headerHeight};
    transition: all ${({theme}) => theme.transition.duration.standard};
    z-index: ${({theme}) => theme.zIndex.appBar};
`;
    
const StAppBar = styled(AppBar)`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: auto;
`;

const StToolbar = styled(Toolbar)`
    background-color: ${({theme}) => theme.palette.sky0};
    .menu__btn{
        margin-right: 1.5rem;
    }
    .subject{
        flex-grow: 1;
        display: flex;
        align-items: center;
    }
`;


const HideHeader = () => {
    let prevScrollpos = window.pageYOffset;
    
    window.onscroll = function() {
        const currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("rootHeader").style.top = "0";
        } else {
            let height = document.getElementById("rootHeader").offsetHeight;
            document.getElementById("rootHeader").style.top = -height+"px";
        }
        prevScrollpos = currentScrollPos;
    }
}


function Header(props){
    const {mobileFlag,sideBarState} = useSelector(
        state => ({
            mobileFlag: state.sideBarHidden.mobileFlag,
            sideBarState: state.sideBarHidden.sideBarState,
            menuClickState: state.menuClick.click, // menuClickState -> makeSubject를 위해 subcribe 기능은 하되, 직접적으로 사용하지는 않는다.
        }), shallowEqual);

    const makeSubject = () => {
        let subject;
        const nbsp = String.fromCharCode(160);
        const arrowIcon = <ArrowRightIcon key="arrowIcon"/>;
        props.routesCollection.map(prop => {
            console.log(window.location.href);
            if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
                prop.subName ? subject = [prop.icon, nbsp+nbsp, prop.name, arrowIcon, nbsp, prop.subName] : subject = [prop.icon, nbsp+nbsp, prop.name];
            }
            return null;
        });
        return subject ;
    }
    
    const dispatch = useDispatch();
    
    const handleSideBarOpen = () => {
        dispatch(transSideBar());
    }
    
    
    
    
    // This expression is working similar to ComponentDidMount.
    useEffect( () => {
        HideHeader();
        document.getElementById("rootHeader").style.top = "0";
    },[]);
    
    return (
        <Div id="rootHeader" style={{ left: mobileFlag ?  "0" :  (sideBarState  ? "0": sidebarWidth) }} >
        <StAppBar aria-label="menu">    
            <StToolbar >
                <IconButton
                    edge="start"
                    className="menu__btn"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleSideBarOpen}
                >
                { mobileFlag ? <MenuIcon /> : sideBarState ? <MenuIcon /> : <ChevronLeft />}
                </IconButton>
                    <span className="subject">
                        {makeSubject()}
                    </span>
                { mobileFlag ? null :
                    <>
                    <SearchBox />
                    <LoginMenu />
                    </>
                }
            </StToolbar>
        </StAppBar>
        </Div>
    )
};

export default Header;