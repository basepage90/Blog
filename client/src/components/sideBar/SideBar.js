import React,{ useEffect } from "react";
import styled from "styled-components";
import Logo from "components/sideBar/Logo";
import Menu from "components/sideBar/Menu";
import LinkFoot from "components/sideBar/LinkFoot";
import { sidebarWidth } from 'styles/styleConst'

import { hidden } from "store/store";
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

// 의존성배열없이 componentDidMount 처럼 동작 하기 위한 변수.
let justOne = 1;

function SideBar(){
    // SideBar Hidden/Expand event
    const initSideBar = useSelector(state => state.sideBarHidden.initSideBar);
    const sideBarState = useSelector(state => state.sideBarHidden.sideBarState);
    const dispatch  = useDispatch();

    const outsideClick = () => {
        dispatch(hidden());
    }
    
    useEffect(() => {
        if( justOne === 1 && document.getElementById('outside')){
            const outside = document.getElementById('outside');
            outside.addEventListener('click', outsideClick);
        }
        justOne++;
    });
    
    return(
        <>
        {initSideBar ? <Outside id="outside"  style={{zIndex: sideBarState ? "-1" : "1199", opacity: sideBarState ? "0":"1"  }} /> : null }
        <Div style={{transform: sideBarState ? "translateX(-100%)" : "translateX(0)"}}>
            <Logo />
            <Menu />
            <LinkFoot />
        </Div>
        </>
    )
}

export default SideBar;