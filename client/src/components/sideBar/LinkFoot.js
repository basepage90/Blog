import React from 'react';
import { useSelector } from 'react-redux'
import styled from 'styled-components';
import GitHubIcon from '@material-ui/icons/GitHub';

import LoginMenu from "components/header/LoginMenu";
// import SearchBox from "components/header/SearchBox";

const Div = styled.div`
  flex: 0 0 auto;
  display: flex;
  width: inherit;
  bottom: 0;
  padding: 15px;
  align-items: center;
  justify-content: center;

  & *{
    cursor: pointer;
  }
`;

function LinkFoot (){
  const mobileFlag = useSelector(state => state.sideBarHidden.mobileFlag);
  
  if(mobileFlag){
    return (
      <Div>
        <GitHubIcon fontSize="large" onClick={() => {window.open('https://github.com/basepage90', '_blank')}}/>
        <LoginMenu />
        {/* <SearchBox /> */}
      </Div>
    );
  } else {
    return(
      <Div>
        <GitHubIcon fontSize="large" onClick={() => {window.open('https://github.com/basepage90', '_blank')}}/>
      </Div>
    );
  }
    
};

export default LinkFoot;