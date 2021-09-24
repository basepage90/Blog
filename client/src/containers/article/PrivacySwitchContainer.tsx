import { useState } from 'react';
import { useMutation } from '@apollo/client'
import PrivacySwitch from 'components/article/PrivacySwitch'
import { useSnackbar, VariantType } from 'notistack';
import { UpdatePrivacy } from 'gql/query';

interface PrivacySwitchContainerProps {
    data: {
        id: number;
        privacy: string;
    }
}

const PrivacySwitchContainer = ({data:{id,privacy}}: PrivacySwitchContainerProps) => {
    // Init chk
    let initPrivacy;
    if(privacy === "public"){
        initPrivacy = false;
    } else{
        initPrivacy = true;
    }

    const [chk, setChk] = useState(initPrivacy);

    // updatePrivacy gql and change chk
    const [ updatePrivacy ] = useMutation(UpdatePrivacy)
        
    const changePrivacy = (nowPrivacy: string) => {
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

    // Snackbar
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleSnackbaraVariant = (variant: VariantType, nowPrivacy: string) => {
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

    return <PrivacySwitch chk={chk} handleChange={handleChange} />
}

export default PrivacySwitchContainer;