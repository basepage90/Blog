import React, { useState } from "react";
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { closePublisher, setContents } from "store/store";
import { useQuery, useMutation} from '@apollo/react-hooks'
import { GetMenuList, CreateArticle } from 'gql/query'
import { useSnackbar } from 'notistack';

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

const Button2 = styled(Button)`
    background-color: ${({theme}) => theme.palette.sky1};
    &:hover {
        background-color: ${({theme}) => theme.palette.sky0};
    }
`;

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
  
  // snackbar 
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleSnackbaraVariant = (variant) => {
    let msg;
    switch (variant) {
      case 'success':
        msg = '포스트를 발행했어요 :)'
        break;
      case 'error':
        msg = '발행에 실패했어요 (server response error)'
        break;
      default:
          break;
    }
    const key = enqueueSnackbar(msg, { variant, onClick: () => {closeSnackbar(key)} })
  };

  // ↓ publish section
  const [ createArticle ] = useMutation(CreateArticle);
  const contents = useSelector(state => state.post.contents);

  const doPublish = () => {
    const category_lg =  data.categoryList[lgno].category_lg;
    let category_md;
    if(data.categoryList[lgno].category_md.length === 0 ){
      category_md = data.categoryList[lgno].category_lg;
    } else {
      category_md =  data.categoryList[lgno].category_md[mdno].name;
    }
    const title = document.getElementById('post__title').value;
    const subtitle = document.getElementById('post__subtitle').value;

    clickAlertClose();
    const success = createArticle({ variables:  {
      title: title,
      subtitle: subtitle,
      contents: contents,
      desc: "test desc01",
      category_lg : category_lg,
      category_md: category_md,
      }
    })



    success.then(({data})=> {
      // gql server 로부터 return 받은 data의 id가 존재할때만, publish 한다
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
            <Button2
              variant="contained"
              color="primary"
              size="small"
              onClick={clickAlertOpen}
            >
              발행하기
            </Button2>
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
        
        썸네일 업로드
        포스트 설명
        전체공개 비공개
      </Dialog>
    </>
  );
}

export default ArtilcePublisher;

