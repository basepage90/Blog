import React from 'react';
import styled from 'styled-components';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';

const Div = styled.div`
  flex: 0 0 auto;
  display: flex;
  bottom: 0;
  padding: 15px;
  align-items: center;
  justify-content: center;
  gap: 20px;
  & *{
    cursor: pointer;
  }
`;

function LinkFoot (){
    return (
      <Div>
        <GitHubIcon fontSize="large" onClick={() => {window.open('https://github.com/basepage90', '_blank')}}/>
        <InstagramIcon fontSize="large" onClick={() => {window.open('https://instagram.com/crispy__kim', '_blank')}}/>
      </Div>
    )
};

export default LinkFoot;