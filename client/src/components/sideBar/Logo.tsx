import React from 'react';
import styled from 'styled-components';
import { LogoImg } from 'statics/images';
import {sidebarWidth} from 'constants/StyleConstant'


const MyLogo = styled.a`
    flex: 0 0 auto;
    width: ${sidebarWidth};
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right:1px solid rgba(0, 0, 0, 0.12);
`;
    
const LogoImage = styled.div`
    width: 80%;
    height: 70%;
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