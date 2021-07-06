import { useState } from 'react';
import styled from 'styled-components';
import { useSelector, shallowEqual } from "react-redux";
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { CreateReply } from 'gql/query';
import { useSnackbar } from 'notistack';

import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const ReplyWriterInner = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-around;
  background-color: #FFFFFF;
  border: 1px solid #DDDFE4;
  padding: 8px;
`;

const NameField = styled(TextField)`
  flex: 1 1 auto;
  max-width: 46%;
  
  .MuiInputLabel-root.Mui-focused {
    color: ${({theme}) => theme.palette.sky0};
  }

  .MuiInput-underline:after {
    border-bottom-color: ${({theme}) => theme.palette.sky1};
  }
`;

const PasswordField = styled(FormControl)`
  flex: 1 1 auto;
  max-width: 46%;

  .MuiInputLabel-root.Mui-focused {
    color: ${({theme}) => theme.palette.sky0};
  }

  .MuiInput-underline:after {
    border-bottom-color: ${({theme}) => theme.palette.sky1};
  }
`;

const ContentsField = styled(TextField)`
    & .MuiOutlinedInput-root.Mui-focused fieldset{
      border-color: ${({theme}) => theme.palette.sky1};
    }
`;

const SubmitWrapper = styled.div`
  flex: 1 1 auto;
  height: 36px;
  margin-left: 16px;
  margin-right: 16px;
  display: flex;
  justify-content: flex-end;

  & .MuiCheckbox-colorPrimary.Mui-checked {
    color: ${({theme}) => theme.palette.sky1};
  }
`;

// const Secret = styled.span`
//   flex-basis: 100px;
// `;

const SubmitBtn = styled(Button)`
  flex-basis: 100px;
  background-color: ${({theme}) => theme.palette.sky1};
  &:hover {
    background-color: ${({theme}) => theme.palette.sky0};
  }
`;

const maxLength = 500;

const CountDescSpan = styled.span`
margin: 10px 24px 10px auto;
color: ${props => props.currentLength < props.maxLength ? '#868E96;' : 'red;' }
`;


const ReplyWriter = ({replyId,depth,siblingName,groupNo,refetch,setOpenReply}) => {

  const { admin_flag, nickname } = useSelector(
    state => ({
      admin_flag: state.user.admin_flag,
      nickname: state.user.nickname,
    }),shallowEqual)
        
  
  const { id } = useParams();
  
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  
  const [currentLength, setCurrentLength] = useState(0)

  const countLength = (e) => {
    setCurrentLength(e.target.value.length)
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const replyValidator = (name,password,contents) => {
    if (admin_flag){
      if ( contents.length === 0 ) {
        return '댓글 내용';
      }else{
        return true;
      }
    }else{
      if ( name.length === 0 ){
        return '이름';
      } else if ( password.length === 0 ) {
        return '비밀번호';
      } else if ( contents.length === 0 ) {
        return '댓글 내용';
      }else{
        return true;
      }
    }
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleSnackbaraVariant = (variant, rv) => {
    let msg;
    switch (variant) {
      case 'success':
        msg = '댓글을 등록했어요 :)'
        break;
      case 'error':
        msg = '댓들등록에 실패했어요 (server response error)'
        break;
      case 'warning':
        msg = rv + ' 이(가) 비어 있어요!';
        break;
      default:
          break;
    }
    const key = enqueueSnackbar(msg, { variant, onClick: () => {closeSnackbar(key)} })
  };

  const [ createReply ] = useMutation(CreateReply)
  
  const doCreateReply = () => {
    let name;
    let password;
    const contents = document.getElementById('reply__contents__'+replyId).value;
    // const secret = document.getElementById('reply__secret__'+replyId).checked;

    if(admin_flag){
      name = nickname;
      password = "";
    }else{
      name = document.getElementById('reply__name__'+replyId).value;
      password = document.getElementById('reply__password__'+replyId).value;
    }

    const rp = replyValidator(name,password,contents)

    if(rp !== true ){
      handleSnackbaraVariant('warning', rp)
      return;
    }
    
    const success = createReply({ variables: {
      article_id : id,
      depth: depth === undefined ? 0 : depth,
      group_no: groupNo === undefined ? 0 : groupNo,
      sibling_name: siblingName === undefined ? "" : siblingName,
      name: name,
      password: password,
      contents: contents,
      admin_flag: admin_flag,
      }})

        success.then(({data})=> {
            // gql server 로 부터의 return 은 id. 즉, 생성한 id 를 반환받으면 성공
            if(data.createReply.id !== undefined || data.createReply.id !== null) {
                handleSnackbaraVariant('success')
                document.getElementById('reply__contents__'+replyId).value = "";
                if(setOpenReply !== undefined ){
                  setOpenReply(false);
                }
                refetch();
            } else {
                handleSnackbaraVariant('error')
            }
            // handleClose();
        })

    }

    return (
          <ReplyWriterInner >
            {!admin_flag &&
            <>
              <NameField  id={"reply__name__"+replyId} label="이름" />
              <PasswordField >
                <InputLabel htmlFor="reply__password">비밀번호</InputLabel>
                <Input id={"reply__password__"+replyId}
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                }
              />
              </PasswordField>
            </>
            }

            <ContentsField id={"reply__contents__"+replyId}
              style={{ margin: 16 }}
              placeholder="당신의 소중한 댓글을 남겨주세요 :)"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              inputProps={{ maxLength: maxLength}}
              onChange={countLength}
              multiline={true}
            />
            <SubmitWrapper>
              {/* <Secret >
                비밀글
                <Checkbox color="primary" id={"reply__secret__"+replyId} />
              </Secret> */}
              <CountDescSpan currentLength={currentLength} maxLength={maxLength} > {currentLength} / {maxLength} </CountDescSpan>
              <SubmitBtn variant="contained" color="primary" onClick={doCreateReply}>
                등록
              </SubmitBtn>
            </SubmitWrapper>
            </ReplyWriterInner>
    )
}

export default ReplyWriter;