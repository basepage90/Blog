import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Button} from '@material-ui/core';

ErrorScreenTemplate.propTypes = {
  image: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired
};


const StyledButton = styled(Button)`
  color: white;
  background: ${({theme}) => theme.palette.sky1};
  &:hover{
    background: ${({theme}) => theme.palette.sky0};
  }
`;

const Screen = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 20rem;
    height: auto;
    ${({theme}) => theme.media.small} {
      width: 12rem;
    }
  }
  .message {
    padding-left: 1rem;
    padding-right: 1rem;
    white-space: pre;
    text-align: center;
    line-height: 1.5;
    font-size: 2.5rem;
    color: ${({theme}) => theme.palette.gray8};
    margin-top: 2rem;
    ${({theme}) => theme.media.small} {
      font-size: 1.5rem;
      margin-top: 1rem;
    }
  }
  .msg{
    font-family: brandon-grotesque;
  }
  .reason{
    font-family: futura-pt;
  }
`;


function ErrorScreenTemplate({image,message,reason,buttonText,onButtonClick}) {
  return (
    <Screen>
      <img src={image} alt="error" />
      <div className="message">
        <h1 className="msg">{message}</h1>
        <p className="reason">{reason}</p>
      </div>
      {buttonText && (
        <div className="button-wrapper">
          <StyledButton variant="contained" onClick={onButtonClick}>
            {buttonText}
          </StyledButton>
        </div>
      )}
    </Screen>
  );
}

  
export default ErrorScreenTemplate;  