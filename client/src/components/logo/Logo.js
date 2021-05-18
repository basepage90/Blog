import React from 'react';
import styled from 'styled-components';
import { LogoImg } from 'statics/images';
import {sidebarWidth} from 'styles/styleConst'
import store from "store/store";

const MyLogo = styled.a`
    position: fixed;
    top: 0;
    left: 0;
    width: ${sidebarWidth};
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right:1px solid rgba(0, 0, 0, 0.12);
`;
    
const LogoImage = styled.div`
    width: 75%;
    height: 75%;
    background-image: url(${LogoImg});
    background-size: cover;
    background-position: center;
`;

function Logo (){
    // sideBar hidden event
    const [sideBarFlag, setSideBarFlag] = React.useState(false);

    store.subscribe(()=> { 
        const sideBarState = store.getState().sideBarHidden.sideBarState;
        setSideBarFlag(sideBarState);
    });
    return (
        <MyLogo href="/" style={{display: sideBarFlag ? "none" : ""}}>
            <LogoImage/>
        </MyLogo>
    );
};

export default Logo;