import React, { useState } from 'react';
import styled from "styled-components";
import { adminClose } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from '@apollo/client';
import { SendAuthEmail } from 'gql/query'

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Fab from '@material-ui/core/Fab';

const CloseDiv = styled.div`
  position: absolute;
  right: 0;
  display:flex;
`;

const BackDiv = styled.div`
  position: absolute;
  left: 0;
  display:flex;
`;

const ButtonContinue = styled(Button)`
    background-color: ${({theme}) => theme.palette.sky1};
    &:hover {
        background-color: ${({theme}) => theme.palette.sky0};
    }
`;

const SinginTypeWrapper = styled.div`
  display: ${props => props.openEmail ? 'none' : 'block' } ;
`;

const SiginWrapper = styled.div`
  display: ${props => props.openEmail ? 'flex' : 'none' } ;
  flex-direction: column;

  .btn__continue {
    margin: 20px 0;

  }
`;

const StFab = styled(Fab)`
  background-color: #FF0045;
  &:hover {
      background-color: #F50057;
  }
`;

const signinType = ['Email', 'Kakao'];

export default function AdminDialog() {
  const adminState = useSelector( state => state.admin.open )
  const dispatch = useDispatch();

  const handleClickClose = () => {
    dispatch(adminClose());
    setOpenEmail(false);
    setSendEmail(false);
  };

  const [ openEmail, setOpenEmail ] = useState(false);

  const selectType = (type) => {
    switch (type) {
      case 'Email' : setOpenEmail(!openEmail);
        break;
      case 'Kakao' :
        break;
      default:
        break;
    }
  }

  const [ sendEmail, setSendEmail ] = useState(false);
  
  const [ getEmail ] = useLazyQuery(SendAuthEmail,{
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      if(!data.sendAuthEmail.admin_flag){
        alert("관리자가 아닙니다.")
        return;
      }else{
        setSendEmail(true)
      }

    },
    onError: (error) => {
      alert("등록되지 않은 이메일 입니다.")
    }
  });

  const Continue = () => {
    const email = document.getElementById('email').value;
    getEmail({variables: { email : String(email) }});
  };


  return (
    <Dialog maxWidth="xl" onClose={() => {openEmail ? setOpenEmail(false) || setSendEmail(false) : handleClickClose()}} open={adminState}>
      {openEmail ? null
      : <CloseDiv onClick={handleClickClose}>
          <IconButton color="inherit" size="medium"  aria-label="close">
                <CloseIcon />
          </IconButton>
        </CloseDiv>
      }
      {openEmail ? 
        <BackDiv onClick={() => { setOpenEmail(false); setSendEmail(false); }}>
          <IconButton color="inherit" size="medium"  aria-label="back">
                <KeyboardBackspaceIcon />
          </IconButton>
        </BackDiv>
      : null}
     
      <DialogTitle style={{margin: '0 auto'}}>Admin Sign in</DialogTitle>
        <DialogContent>
          <SinginTypeWrapper openEmail={openEmail}>
            <DialogContentText>로그인은 관리자 전용이에요!</DialogContentText>
            <List>
              {signinType.map((type) => (
                <ListItem button onClick={() => selectType(type)} key={type}>
                  <ListItemAvatar>
                    <Avatar >
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={type} />
                </ListItem>
              ))}
            </List>
          </SinginTypeWrapper>
          <SiginWrapper openEmail={openEmail} >
          { sendEmail ?
            <>
              <span>로그인 링크가 '이메일'로 발송 되었어요!</span>
              <StFab color="secondary" variant="extended" onClick={ () => {window.open('https://mail.google.com/'); } } >
                ◀ 클릭해서 Gmail로 이동하기 ▶
              </StFab>
            </>
            :
            <>
              <TextField id="email" label="E-Mail" />
              <ButtonContinue className="btn__continue" variant="contained" color="primary" onClick={Continue}>Continue</ButtonContinue>
            </>
          }
          </SiginWrapper>
        </DialogContent>
    </Dialog>
  );
}