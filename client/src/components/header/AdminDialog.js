import React from 'react';
import styled from "styled-components";
import { adminClose } from "store/store";
import { useDispatch, useSelector } from "react-redux";

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


const CloseDiv = styled.div`
  position: absolute;
  right: 0;
  display:flex;
  justify-content: flex-end;
`;

const emails = ['Admin', 'Kakao'];

export default function AdminDialog() {
  const adminState = useSelector( state => state.admin.open )
  const dispatch = useDispatch();

  const handleClickClose = () => {
    dispatch(adminClose());
  };
  
  return (
    <Dialog maxWidth="xl" onClose={handleClickClose} aria-labelledby="simple-dialog-title" open={adminState}>
      <CloseDiv onClick={handleClickClose}>
        <IconButton color="inherit" size="medium"  aria-label="close">
              <CloseIcon/>
        </IconButton>
      </CloseDiv>
      <DialogTitle>Admin Login</DialogTitle>
        <DialogContent>
          <DialogContentText>로그인은 관리자 전용이에요!</DialogContentText>
          <List>
            {emails.map((email) => (
              <ListItem button onClick={handleClickClose} key={email}>
                <ListItemAvatar>
                  <Avatar >
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
    </Dialog>
  );
}