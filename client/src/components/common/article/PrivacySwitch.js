import { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import Switch from '@material-ui/core/Switch';
import { UpdatePrivacy } from 'gql/query';
import { useSnackbar } from 'notistack';

const SwitchWrapper =  styled.div`
    display: flex;
    width: 220px;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
`;

const PrivacySwitch = ({data:{id,privacy}}) => {
    // Init chk
    let initPrivacy;
    if(privacy === "public"){
        initPrivacy = false;
    } else{
        initPrivacy = true;
    }
    const [chk, setChk] = useState(initPrivacy);

    // Snackbar
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleSnackbaraVariant = (variant, nowPrivacy) => {
        let msg;
        let msgPrivacy;

        switch (nowPrivacy) {
            case 'public' :
                msgPrivacy = '전체 공개';
                break;
            case 'private' :
                msgPrivacy = '비공개';
                break;
            default :
                break;
        }
        
        switch (variant) {
            case 'success':
                msg = msgPrivacy + '로 변경했어요 :)';
                break;
            case 'error':
                msg = msgPrivacy + '로 변경에 실패했어요(server response error)';
                break;
            default:
                break;
        }
        const key = enqueueSnackbar(msg, { variant, onClick: () => {closeSnackbar(key)} })
    };
    
    // updatePrivacy gql and change chk
    const [ updatePrivacy ] = useMutation(UpdatePrivacy)
    
    const changePrivacy = (nowPrivacy) => {
        const success = updatePrivacy({ variables: {
                id: id,
                privacy: nowPrivacy,
            }
        })
        success.then(({data})=> {
            // gql server 로 부터의 return 은 modified count. 즉,  update count 가 0 보다 크면 성공.
            if(data.updatePrivacy > 0) {
                handleSnackbaraVariant('success', nowPrivacy)
                setChk(!chk)
            } else {
                handleSnackbaraVariant('error', nowPrivacy)
                return;
            }
        })
    }
    
    // switch event
    const handleChange = () =>{
        if(chk){
            changePrivacy("public")
        }else{
            changePrivacy("private")
        }
    }
        
    return(
    <SwitchWrapper>
        공개
        <Switch className="switch" checked={chk} name="chekcedPrivacy" onChange={handleChange} />
        비공개
    </SwitchWrapper>
    )
};

export default PrivacySwitch;