import React,{ useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "components/sideBar/Logo";
import Menu from "components/sideBar/Menu";
import LinkFoot from "components/sideBar/LinkFoot";
import { sidebarWidth } from 'styles/styleConst'

import {hidden} from "store/store";
import { useDispatch, useSelector } from 'react-redux'

const Outside = styled.div`
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: ${sidebarWidth};
  height: 100%;
  background-color: #FAFAFA;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  transition: all ${({theme}) => theme.transition.duration.standard};
  z-index: ${({theme}) => theme.zIndex.drawer};
  overflow-y: auto;
  overflow-x: hidden;
`;

function SideBar(){
    // SideBar Hidden/Expand event
    const initSideBar = useSelector(state => state.sideBarHidden.initSideBar);
    const sideBarState = useSelector(state => state.sideBarHidden.sideBarState);
    const [sideBarFlag, setSideBarFlag] = useState(initSideBar);
    
    const dispatch  = useDispatch();

    const outsideClick = () => {
        console.log("hidden bar start")
        dispatch(hidden());
        console.log("hidden bar end")
    }
    
    useEffect(() => {
        setSideBarFlag(sideBarState);
    },[sideBarState]);

    useEffect(() => {
        if(document.getElementById('outside')){
                const outside = document.getElementById('outside');
                outside.addEventListener('click', outsideClick);
            }
    },[]);

    return(
        <>
        {initSideBar ? <Outside id="outside"  style={{zIndex: sideBarFlag ? "-1" : "1199", opacity: sideBarFlag ? "0":"1"  }} /> : null }
        <Div style={{transform: sideBarFlag ? "translateX(-100%)" : "translateX(0)"}}>
            <Logo />
            <Menu />
            <LinkFoot />
        </Div>
        </>
    )
}

export default SideBar;