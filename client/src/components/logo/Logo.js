import React from 'react';
import styled from 'styled-components';
import { LogoImg } from 'statics/images';
import {sidebarWidth} from 'styles/styleConst'

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
    return (
        <MyLogo href="/">
            <LogoImage/>
        </MyLogo>
    );
};

export default Logo;