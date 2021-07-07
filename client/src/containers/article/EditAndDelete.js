import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { DeleteArticles } from 'gql/query';
import { useSnackbar } from 'notistack';
import EditAndDeleteButton from 'components/article/EditAndDeleteButton'

const EditAndDelete = ({data:{id}}) => {
    const history = useHistory();
    
    const goEdit = () => {
        history.push('/edit/'+ id)
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleSnackbaraVariant = (variant) => {
        let msg;
        switch (variant) {
            case 'success':
                msg = '포스트를 삭제했어요 :)';
                break;
            case 'error':
                msg = '포스트 삭제에 실패했어요(server response error)';
                break;
            default:
                break;
        }
        const key = enqueueSnackbar(msg, { variant, onClick: () => {closeSnackbar(key)} })
    };

    const [ deleteArticles ] = useMutation(DeleteArticles)

    const doDelete = () => {
        const success = deleteArticles({ variables: {id: id}})

        success.then(({data})=> {
            // gql server 로 부터의 return 은 delete count. 즉,  0보다 크면 성공.
            if(data.deleteArticles > 0) {
                handleSnackbaraVariant('success')
            } else {
                handleSnackbaraVariant('error')
            }
            handleClose();
            window.location.replace('/');
        })
    }

    return (
        <EditAndDeleteButton
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            doDelete={doDelete}
            goEdit={goEdit}
        />
    )

}

export default EditAndDelete;