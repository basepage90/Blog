import React, { useState } from "react";
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { closePublisher, setContents } from "store/store";
import { useQuery, useMutation} from '@apollo/react-hooks'
import { GetMenuList, CreateArticle } from 'gql/query'
import { useSnackbar } from 'notistack';
import axios from "axios";
import Dropzone from 'components/common/upload/Dropzone'

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import CloseIcon from "@material-ui/icons/Close";
import PublicIcon from "@material-ui/icons/Public";
import LockIcon from "@material-ui/icons/LockOutlined";
import TextField from '@material-ui/core/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StAppBar = styled(AppBar)`
  position: relative;
  background-color: ${({theme}) => theme.palette.sky1};
`;
const StTypography = styled(Typography)`
  flex: 1;
`;
const StFormControl = styled(FormControl)`
  margin: 0 24px;
`;

const ButtonPublish = styled(Button)`
  background-color: ${({theme}) => theme.palette.sky1};
  &:hover {
      background-color: ${({theme}) => theme.palette.sky0};
  }
`;

const TextFieldDesc = styled(TextField)`
    margin: 0 24px;
`;

const CountDescSpan = styled.span`
    margin: 10px 24px 10px auto;
    color: ${props => props.byteLength < props.maxByte ? '#868E96;' : 'red;' }
`;

const ButtonWrapper = styled.div`
  margin: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-item: center;
`;

const ButtonPublic = styled(Button)`
  flex: 0 0 48%;
  color: #FFF;
  background-color: ${props => props.privacy === "public" ?  ({theme}) => theme.palette.sky1+';' : '#868E96;' }
  &:hover {
    background-color:${props => props.privacy === "public" ? ({theme}) => theme.palette.sky1+';' : '#868E96;' }
  }
`;

const ButtonPrivate = styled(Button)`
  flex: 0 0 48%;
  color: #FFF;
  background-color: ${props => props.privacy === "private" ? ({theme}) => theme.palette.hotpink1+';' : '#868E96;'}
  &:hover {
    background-color: ${props => props.privacy === "private" ? ({theme}) => theme.palette.hotpink1+';' : '#868E96;'}
  }
`;

const Typo = styled.span`
    margin-left: 10px;
`;

// 바이트 계산 함수 : 한글은 2, 그외 영문숫자 특수문자는 1로 취급
// 다만,utf8에서한글은 3이며, 사실 현재 바이트를 구하기 위함이 아니다.
const CountByteLength = (str,b,i,c) => {
  for(b=i=0; c=str.charCodeAt(i++); b += c >> 11 ? 2 : c >> 7 ? 2 : 1);
  return b;
};

// 바이트 단위로 substring 하는 함수
const cutByLen = (str,maxByte,b,i,c) => {
  for(b=i=0; c=str.charCodeAt(i);) {
    b += c >> 7 ? 2 : 1 ;
  if (b > maxByte)
    break;
    i++;
  }
  return str.substring(0,i);
};

const ArtilcePublisher = ({history}) => {
  // ↓ dialog
  const open = useSelector(state => state.publish.open);
  const dispatch = useDispatch({});
  const close = () => {
    dispatch(closePublisher());
  };

  // ↓ alert
  const [openAlert, setOpenAlert] = useState(false);
  const clickAlertOpen = () => {
    setOpenAlert(true);
  };
  const clickAlertClose = () => {
    setOpenAlert(false);
  };

  
  // ↓ category select section 
  const {loading, data} = useQuery(GetMenuList);
  const [lgno, setLgno] = useState("");
  const [mdno, setMdno] = useState("");

  const changeLg = (event) => {
    setLgno(event.target.value);
    setMdno("");
  };

  const changeMd = (evnet) => {
    setMdno(evnet.target.value);
  };

  // thumbnail
  const [file,setFile] = useState();

  // snackbar 
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleSnackbaraVariant = (variant, pv) => {
    let msg;
    switch (variant) {
      case 'success':
        msg = '포스트를 발행했어요 :)'
        break;
      case 'error':
        msg = '발행에 실패했어요 (server response error)'
        break;
      case 'warning':
        msg = pv + ' 이(가) 비어 있어요!';
        break;
      default:
          break;
    }
    const key = enqueueSnackbar(msg, { variant, onClick: () => {closeSnackbar(key)} })
  };

  // buttonm selector : public & private
  const [privacy, setPrivacy] = useState("public");
  const handleChange = (privacyFlag) => {
    setPrivacy(privacyFlag);
  }
  
  let title;
  let subtitle;
  let category_lg;
  let category_md;
  let thumbnail;
  let desc;

  const JustPublish = () => {
    const success = createArticle({ variables:  {
        title: title,
        subtitle: subtitle,
        contents: contents,
        desc: desc,
        category_lg : category_lg,
        category_md: category_md,
        thumbnail: thumbnail,
        privacy: privacy,
      }
    })
    
    success.then(({data})=> {
      // gql server 로부터 return 받은 data의 id가 존재할때만, publish 를 완료한다
      if(data.createArticles.id === undefined) {
        handleSnackbaraVariant('error')
        return;
      } else {
        handleSnackbaraVariant('success')
        close();
        localStorage.removeItem(`smde_autoSaving`);
        dispatch(setContents(""));
        history.goBack();
      }
    })
  }

  const uploadThumbnail = async () => {
    const url = "http://wjk.ddns.net:5000/upload/thumbnail"
    const formData = new FormData();
    formData.append("thumbnail", file);
    const headers = { headers: { "Content-Type": "multipart/form-data" } };

    await axios.post(url, formData, headers)
    .then( (response) => {
        // try 
        thumbnail = response.data.filePath
        JustPublish();
      }).catch( (error) => {
        // catch
        handleSnackbaraVariant('error')
    }).then( () => {
        // finally
    });
  }

  // 소개글 카운터
  const [byteLength, setByteLength] = useState(0);
  const maxByte = 110;
  const countDesc = (event) => {
    const nowByte = CountByteLength(event.target.value);
    if(nowByte < maxByte){
      setByteLength(nowByte)
    }else{
      setByteLength(maxByte)
    }
    if(nowByte >= maxByte){
      event.target.value = cutByLen(event.target.value,maxByte);
    }
  }

  const postValidator = () => {
    if ( title.length === 0 ){
      return 'Title';
    } else if ( subtitle.length === 0 ) {
      return 'Subtitle';
    } else if(contents === "" || contents === null){
      return 'Contents';
    } else if(lgno === ""){
      return 'Large Category';
    } else if(mdno === ""){
      return 'Middle Category';
    } else if(file === undefined){
      return 'Thumbnail';
      } else if(desc === ""){
          return 'Description';
      }else{
        return true;
      }
    };

  // ↓ publish section
  const [ createArticle ] = useMutation(CreateArticle);
  const contents = useSelector(state => state.post.contents);
  
  const doPublish = () => {

    
    // ▼ data setting and vaildation
    title = document.getElementById('post__title').value;
    subtitle = document.getElementById('post__subtitle').value;
    // const thumnail;
    desc = document.getElementById('post__desc').value;
    
    const pv = postValidator();

    if(pv !== true ){
      handleSnackbaraVariant('warning', pv)
      return;
    }

    category_lg =  data.categoryList[lgno].category_lg;
    
    if(data.categoryList[lgno].category_md.length === 0 ){
      category_md = data.categoryList[lgno].category_lg;
    } else {
      category_md =  data.categoryList[lgno].category_md[mdno].name;
    }
    // ▲ data setting and vaildation

    clickAlertClose();

    uploadThumbnail();
  }

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={close}
        TransitionComponent={Transition}
      >
        <StAppBar >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={close}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <StTypography variant="h6" >
              포스팅
            </StTypography>
            <ButtonPublish
              variant="contained"
              color="primary"
              size="small"
              onClick={clickAlertOpen}
            >
              발행하기
            </ButtonPublish>
            <Dialog
              open={openAlert}
              TransitionComponent={Transition}
              keepMounted
              onClose={clickAlertClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">{"현재 포스트를 발행할까요?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  현재 포스트를 발행할까요?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={clickAlertClose} color="primary">
                  취소
                </Button>
                <Button onClick={doPublish} color="primary">
                  발행
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        </StAppBar>

        {loading ? null : 
        <>
          <StFormControl >
            <InputLabel id="lgCategory-label">large Category</InputLabel>
            <Select
              labelId="lgCategory"
              value={lgno}
              onChange={changeLg}
            >
              {data.categoryList.map((lg,key) => (
                  <MenuItem className="lg" value={key} key={key} lgname={lg.category_lg} >{lg.screen_name}</MenuItem>
                ))}
            </Select>
          </StFormControl>

          <StFormControl >
            <InputLabel id="mdCategory-label">middle Category</InputLabel>
            <Select
              labelId="mdCategory"
              id="mdCategory"
              value={mdno}
              onChange={changeMd}
            >
              {lgno === "" ? null
                : data.categoryList[lgno].category_md.length === 0 ? <MenuItem value="0">{data.categoryList[lgno].screen_name}</MenuItem>
                    : data.categoryList[lgno].category_md.map((md,key) => (
                        <MenuItem value={key} key={key}>{md.screen_name}</MenuItem>
                      ))
              }
                
            </Select>
          </StFormControl>
        </>
        }
        <Dropzone setFile={setFile} />
        <TextFieldDesc id="post__desc" label="간략 소개" multiline={true} rows="2" rowsMax="5" variant="outlined" onChange={countDesc} />
        <CountDescSpan byteLength={byteLength} maxByte={maxByte} > { byteLength} / {maxByte} </CountDescSpan>
        <ButtonWrapper>
          <ButtonPublic
              variant="contained"
              color="default"
              size="large"
              privacy={privacy}
              onClick={()=>handleChange("public")}
          >
          <PublicIcon />
          <Typo>전체 공개</Typo>
          </ButtonPublic>
          <ButtonPrivate
              variant="contained"
              color="default"
              size="large"
              privacy={privacy}
              onClick={()=>handleChange("private")}
          >
            <LockIcon />
            <Typo>비공개</Typo>
          </ButtonPrivate>
        </ButtonWrapper>

      </Dialog>
    </>
  );
}

export default ArtilcePublisher;

