import React from 'react';
import styled from 'styled-components';
import GitHubIcon from '@material-ui/icons/GitHub';

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
    return (
        <Div>
           <GitHubIcon fontSize="large" onClick={() => {window.open('https://github.com/basepage90', '_blank')}}/>
        </Div>
    );
};

export default LinkFoot;