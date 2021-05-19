import React, { useEffect } from "react";
import styled from "styled-components";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowRight from '@material-ui/icons/ArrowRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {sidebarWidth,headerHeight} from 'styles/styleConst'

import { connect } from "react-redux";
import store,{hidden,open} from "store/store";


const Div = styled.div`
    position: fixed;
    left: ${sidebarWidth};
    right: 0;
    height: ${headerHeight};
    z-index: ${({theme}) => theme.zIndex.drawer + 1};
    transition: all ${({theme}) => theme.transition.duration.standard};
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
    .title{
        flex-grow: 1;
    }
`;

const SearchBox = styled.div`
    position: relative;
    border-radius: 8px;
    background-color: ${({theme}) => theme.palette.sky1};
    &:hover{
        background-color: ${({theme}) => theme.palette.sky2};
    };
    .searchIcon {
        padding-left: 0.4rem ;
        height: 100%;
        position: absolute;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
      }
`;

const Input = styled.input`
    color: white;
    background-color: inherit;
    padding: 0.5rem 0 0.5rem 2.5rem;
    width: 16ch;
    border: none;
    border-radius: 8px;
    transition: all 500ms ease;
    &:focus {
        width: 32ch;
        outline: none;
        transition: all 500ms ease;
    }
    &::placeholder {
        color: ${({theme}) => theme.palette.placeHolder};
        font-weight: bold;
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

function Header({hiddenBar,openBar}){
    
    // sideBar hidden sate
    const [sideBarFlag, setSideBarFlag] = React.useState(false);
    const handleSideBarOpen = () => {
        const sideBarState = store.getState().sideBarHidden.sideBarState;
        if(!sideBarState){
            hiddenBar();
        } else{
            openBar();
        }
    }

    // header subject state
    const [subject, setSubject] = React.useState({layout:"Home",path:""});
    
    store.subscribe(()=> { 
        // SiderBar
        const sideBarState = store.getState().sideBarHidden.sideBarState;
        setSideBarFlag(sideBarState);
        
        // Subject
        const layout = store.getState().subject.layout;
        const path = store.getState().subject.path;
        setSubject({layout:layout,path:path});
        
        // Header show
        document.getElementById("rootHeader").style.top = "0";
    });

    // Login Pop Event
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    // This expression is working similar to ComponentDidMount.
    useEffect( () => {
        HideHeader();
    }, []);
    

    return (
        <Div id="rootHeader" style={{ left: sideBarFlag ? "0": sidebarWidth }} >
        <StAppBar aria-label="menu">    
            <StToolbar >
                <IconButton
                    edge="start"
                    className="menu__btn"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleSideBarOpen}
                >
                {sideBarFlag ? <MenuIcon /> : <ChevronLeft />}
                </IconButton>
                    <span className="title">
                        {subject.layout}
                        {subject.path === "" ? "" : <ArrowRight/>}
                        {subject.path === "" ? "" : subject.path }
                    </span>
                <SearchBox>
                    <div className="searchIcon">
                        <SearchIcon/>
                    </div>
                    <Input type="text" placeholder="Search..."/>
                </SearchBox>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Admin</MenuItem>
                    <MenuItem onClick={handleClose}>Kakao Login</MenuItem>
                </Menu>
            </StToolbar>
        </StAppBar>
        </Div>
    )
};

const mapDispatchToProps = (dispatch) => {
   return {
        hiddenBar: () => dispatch(hidden()),
        openBar: () => dispatch(open()),
    };
}

export default connect(null,mapDispatchToProps)(Header);