import { useState } from 'react';
import styled from 'styled-components';

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
  ime-mode: active;
  
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
  ime-mode:active;
  
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


const ReplyWriter = ({replyId,admin_flag,doCreateReply}) => {
  const [currentLength, setCurrentLength] = useState(0)
    
  const countLength = (e) => {
    setCurrentLength(e.target.value.length)
  }
  
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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