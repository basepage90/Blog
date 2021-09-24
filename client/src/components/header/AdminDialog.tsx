import React, { useState } from 'react';
import styled from "styled-components";
import { BaseURL, ClientPort } from 'constants/AddressConstant'
import { adminClose } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from '@apollo/client';
import { SendAuthEmail } from 'gql/query';
import initKakao from 'util/initKakao'
import { kakaoMono } from 'statics/images'
import { RootState } from "store/store";


import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import EmailIcon from '@material-ui/icons/Email';
import { useSnackbar, VariantType } from 'notistack';

const KakaoButton = styled.button`
    background-image: url(${kakaoMono});
    background-size: 80%;
    background-position: center;
    border: none;
    width: 100%;
    height: 50px;
    border-radius: 12px;
`;


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

const SinginTypeWrapper = styled.div<{openEmail: boolean}>`
  display: ${props => props.openEmail ? 'none' : 'block' } ;
`;

const SiginWrapper = styled.div<{openEmail: boolean}>`
  display: ${props => props.openEmail ? 'flex' : 'none' } ;
  flex-direction: column;
  .btn__continue {
    margin: 20px 0;
  }
`;

const SpanMsg =  styled.span`
  margin-bottom: 10px;
`;

const StFab = styled(Fab)`
  background-color: #FF0045;
  &:hover {
      background-color: #F50057;
  }
`;

const CircularProgressWrapper = styled.div`
  position: absolute;
  bottom: 26px;
  left: 50%;
  transform: translateX(-50%);
`;

const signinType = [
  { name: 'Email', icon: <EmailIcon /> },
  { name: 'Kakao', icon: <KakaoButton /> },
];

export default function AdminDialog() {
  const adminState = useSelector( (state: RootState) => state.admin.open )
  const dispatch = useDispatch();

  const handleClickClose = () => {
    if(openEmail){
      setOpenEmail(false);
      setSendEmail(false);
    }else{
      dispatch(adminClose());
      setOpenEmail(false);
      setSendEmail(false);
    }
  };

  const [ openEmail, setOpenEmail ] = useState<boolean>(false);

  const loginWithKakao = () => {
    initKakao();
    window.Kakao.Auth.authorize({
    redirectUri: BaseURL + ClientPort + `/signin/kakao`
    })
  }

  const selectType = (type: string) => {
    switch (type) {
      case 'Email' : setOpenEmail(!openEmail);
        break;
      case 'Kakao' :loginWithKakao();
        break;
      default:
        break;
    }
  }

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleSnackbaraVariant = (variant: VariantType) => {
    let msg;
    switch (variant) {
      case 'warning':
        msg = '등록되지 않은 이메일 입니다'
        break;
      default:
          break;
    }
    const key = enqueueSnackbar(msg, { variant, onClick: () => {closeSnackbar(key)} })
  };

  const [dataLoading, setDataLoading] = useState(false);

  const [ sendEmail, setSendEmail ] = useState(false);
  
  const [ getEmail ] = useLazyQuery(SendAuthEmail,{
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      if(!data.sendAuthEmail.admin_flag){
        alert("관리자가 아닙니다.")
        setDataLoading(false);
      }else{
        setSendEmail(true)
        setDataLoading(false);
      }

    },
    onError: (error) => {
      handleSnackbaraVariant('warning')
      setDataLoading(false);
    }
  });

  const Continue = () => {
    setDataLoading(true);
    const email = (document.getElementById('email') as HTMLInputElement).value;
    getEmail({variables: { email : String(email) }});
  };

  return (
    <Dialog maxWidth="xl" onClose={handleClickClose} open={adminState}>
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
                <ListItem button onClick={() => selectType(type.name)} key={type.name}>
                  <ListItemAvatar>
                    <Avatar >
                    {type.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={type.name} />
                </ListItem>
              ))}
            </List>
          </SinginTypeWrapper>
          <SiginWrapper openEmail={openEmail} >
          { sendEmail ?
            <>
              <SpanMsg>로그인 링크가 '이메일'로 발송 되었어요!</SpanMsg>
              <StFab color="secondary" variant="extended" onClick={ () => {window.open('https://mail.google.com/'); } } >
                ◀ 클릭해서 Gmail로 이동하기 ▶
              </StFab>
            </>
            :
            <>
              <TextField id="email" label="E-Mail" autoComplete="off" />
              <ButtonContinue
                className="btn__continue"
                variant="contained"
                color="primary"
                onClick={Continue}
                disabled={dataLoading}
              >
                Continue
              </ButtonContinue>
              {dataLoading && 
                <CircularProgressWrapper >
                  <CircularProgress size={26} /> 
                </CircularProgressWrapper>
              }
            </>
          }
          </SiginWrapper>
        </DialogContent>
    </Dialog>
  );
}