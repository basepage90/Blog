import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { BaseURL, ServerPort } from 'constants/AddressConstant'
import { useSelector, useDispatch } from "react-redux";
import { closePublisher, setContents, RootState } from "store/store";
import { useQuery, useMutation} from '@apollo/react-hooks'
import { GetMenuList, CreateArticle, UpdateArticles } from 'gql/query'
import { useSnackbar, VariantType } from 'notistack';
import axios from "axios";
import Dropzone from 'components/common/upload/Dropzone'
import { CountByteLength, CutByLen } from 'util/useFunction'

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide, { SlideProps } from "@material-ui/core/Slide";
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

const Transition = React.forwardRef(function Transition(props: SlideProps, ref) {
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

const CountDescSpan = styled.span<{byteLength: number, maxByte: number}>`
  margin: 10px 24px 10px auto;
  color: ${props => props.byteLength < props.maxByte ? '#868E96;' : 'red;' }
`;

const ButtonWrapper = styled.div`
  margin: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-item: center;
`;

const ButtonPublic = styled(Button)<{privacy: string}>`
  flex: 0 0 48%;
  color: #FFF;
  background-color: ${props => props.privacy === "public" ?  ({theme}) => theme.palette.sky1+';' : '#868E96;' }
  &:hover {
    background-color:${props => props.privacy === "public" ? ({theme}) => theme.palette.sky1+';' : '#868E96;' }
  }
`;

const ButtonPrivate = styled(Button)<{privacy: string}>`
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

interface ArtilcePublisherProps {
  history: any;
  pdata: any;
}

const ArtilcePublisher = ({history,pdata}: ArtilcePublisherProps) => {
  // ↓ dialog
  const open = useSelector( (state: RootState) => state.publish.open);
  const dispatch = useDispatch();
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

  const changeLg = (event: any) => {
    setLgno(event.target.value);
    setMdno('0');
  };

  const changeMd = (evnet: any) => {
    setMdno(evnet.target.value);
  };

  // thumbnail
  const [file,setFile] = useState('');

  // snackbar 
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleSnackbaraVariant = (variant: VariantType, pv: string) => {
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
  const handleChange = (privacyFlag: string) => {
    setPrivacy(privacyFlag);
  }
  
  let title: string;
  let hashtag: string;
  let category_lg: string;
  let category_md: string;
  let thumbnail: string;

  const JustPublish = () => {
    const success = createArticle({ variables:  {
        title: title,
        hashtag: hashtag,
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
      if(data.createArticles.id !== undefined) {
        handleSnackbaraVariant('success','');
        dispatch(setContents(""));
        localStorage.removeItem(`smde_autoSaving`);
        window.location.replace('/');
        return;
      } else {
        handleSnackbaraVariant('error','');
        return;
      }
    })
  }

  const JustUpdate = (changeThumb: boolean) => {
    let success;
    
    if(changeThumb){
      success = updateArticles({ variables:  {
        id: pdata.id,
        title: title,
        hashtag: hashtag,
        contents: contents,
        desc: desc,
        category_lg : category_lg,
        category_md: category_md,
        thumbnail: thumbnail,
        privacy: privacy,
        }
      })
    }else{
      success = updateArticles({ variables:  {
        id: pdata.id,
        title: title,
        hashtag: hashtag,
        contents: contents,
        desc: desc,
        category_lg : category_lg,
        category_md: category_md,
        thumbnail: file,
        privacy: privacy,
        }
      })
    }
    
    success.then(({data})=> {
      // gql server 로부터 return 받은 data의 id가 존재할때만, publish 를 완료한다
      if(data.updateArticles > 0) {
        handleSnackbaraVariant('success','');
        dispatch(setContents(""));
        window.location.replace('/');
        return;
      } else {
        handleSnackbaraVariant('error','');
        return;
      }
    })
  }

  const uploadThumbnail = async () => {
    const url = BaseURL + ServerPort + "/upload/thumbnail"
    const formData = new FormData();
    formData.append("thumbnail", file);
    const headers = { headers: { "Content-Type": "multipart/form-data" } };

    await axios.post(url, formData, headers)
    .then( (response) => {
        // try 
        thumbnail = response.data.filePath;
        if(pdata === null){
          JustPublish();
        }else{
          JustUpdate(true);
        }
      }).catch( (error) => {
        // catch
        handleSnackbaraVariant('error','');
    }).then( () => {
        // finally
    });
  }

  // Desc State
  const [desc, setDesc] = useState("");
  

  // 소개글 카운터
  const [byteLength, setByteLength] = useState(0);
  const maxByte = 110;

  const ChangeAndCut = (event: any) => {
    setDesc(event.target.value);

    const nowByte = CountByteLength(event.target.value);
    if(nowByte < maxByte){
      setByteLength(nowByte)
    }else{
      setByteLength(maxByte)
    }
    if(nowByte >= maxByte){
      setDesc(CutByLen(event.target.value,maxByte));
    }
  }

  const postValidator = () => {
    if ( title.length === 0 ){
      return 'Title';
    } else if ( hashtag.length === 0 ) {
      return 'Hashtag';
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
  const [ updateArticles ] = useMutation(UpdateArticles);
  const contents = useSelector( (state: RootState) => state.post.contents);
  
  const doPublish = () => {
    // ▼ data setting and vaildation
    title = (document.getElementById('post__title') as HTMLInputElement).value;
    hashtag = (document.getElementById('post__hashtag') as HTMLInputElement).value;
    if(hashtag.indexOf("#", 0) !== 0){
      hashtag = "#" + hashtag;
    }
    
    const pv = postValidator();

    if(pv !== true ){
      clickAlertClose();
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

    if(file === "unchanged"){
      // 썸네일이 "unchanged" 이면, uploadThumbnail을 생략하고 바로 업데이트한다.
      JustUpdate(false);
    }else{
      uploadThumbnail();
    }
  }

  useEffect(() => {
    // 1) pdata 가 존재하고, category data loading 이 완료상태이면,
    if(pdata !== null && loading === false){
      const lgVal = pdata.category_lg;
      const mdVal = pdata.category_md;
      let initLgno: string = '';

      // 2) Lgno의 초기값을 셋팅한다.
      data.categoryList.map((lg: { category_lg: any; }, key: string) => {
        if(lg.category_lg === lgVal){
          setLgno(key)
          initLgno = key;
        }
        return null
      })

      // 3) Lgno 초기값을 가지고, Mdno 초기값을 셋팅한다.
      if(data.categoryList[initLgno].category_md.length === 0) {
        setMdno('0');
      } else {
        data.categoryList[initLgno].category_md.map((md: { name: any; },key: string) => {
          if(md.name === mdVal){
            setMdno(key);
          }
          return null;
        })
      }
      // 4) Desc 초기값을 셋팅한다.
      setDesc(pdata.desc);
    }

  },[pdata,loading,data])
  
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
              {pdata === null ? '발행하기': '수정하기'}
            </ButtonPublish>
            <Dialog
              open={openAlert}
              TransitionComponent={Transition}
              keepMounted
              onClose={clickAlertClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title"> {pdata === null ? '현재 포스트를 발행할까요?': '현재 포스트를 수정할까요?'}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                {pdata === null ? '현재 포스트를 발행합니다': '현재 포스트를 수정합니다'}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={clickAlertClose} color="primary">
                  취소
                </Button>
                <Button onClick={doPublish} color="primary">
                {pdata === null ? '발행': '수정'}
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
              {data.categoryList.map((lg: any, key:string) => (
                  <MenuItem className="lg" value={key} key={key} >{lg.screen_name}</MenuItem>
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
                    : data.categoryList[lgno].category_md.map((md: any, key: string) => (
                        <MenuItem value={key} key={key}>{md.screen_name}</MenuItem>
                      ))
              }
                
            </Select>
          </StFormControl>
        </>
        }
        <Dropzone pdata={pdata === null ? null : pdata} setFile={setFile} />
        <TextFieldDesc id="post__desc" value={desc} label="간략 소개" multiline={true} rows="2" rowsMax="5" variant="outlined" onChange={ChangeAndCut} />
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