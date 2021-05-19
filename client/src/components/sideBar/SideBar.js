import React from "react";
import styled from "styled-components";
import store from "store/store";
import Logo from "components/sideBar/Logo";
import Menu from "components/sideBar/Menu";
import LinkFoot from "components/sideBar/LinkFoot";
import {sidebarWidth} from 'styles/styleConst'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: ${sidebarWidth};
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

function SideBar(){
    // SideBar Hidden/Expand event
    const [sideBarFlag, setSideBarFlag] = React.useState(false);
    store.subscribe(()=> { 
        const sideBarState = store.getState().sideBarHidden.sideBarState;
        setSideBarFlag(sideBarState);
    });
    return(
        <Div style={{display: sideBarFlag ? "none" : ""}} >
            <Logo />
            <Menu />
            <LinkFoot />
        </Div>
    )
}

export default SideBar;