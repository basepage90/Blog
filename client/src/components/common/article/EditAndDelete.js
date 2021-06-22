import { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import { DeleteArticles } from 'gql/query';
import { useSnackbar } from 'notistack';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ButtonWrapper = styled.div`
    display: flex;
    width: 220px;
    justify-content: space-between;
    margin: 10px 0;
`;

const ButtonEdit = styled(Button)`
    max-width: 100px;
    flex: 1 1 auto;
    background-color: ${({theme}) => theme.palette.sky1};
    &:hover {
        background-color: ${({theme}) => theme.palette.sky0};
    }
`;

const ButtonDelete = styled(Button)`
    max-width: 100px;
    flex: 1 1 auto;
    background-color: ${({theme}) => theme.palette.hotpink1};
    &:hover {
        background-color: ${({theme}) => theme.palette.hotpink0};
    }
`;


const EditAndDelete = ({data:{id}}) => {

    const history = useHistory();

    const goEdit = () => {
        history.push('/edit/'+id)
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

    return(
        <>
            <ButtonWrapper>
                <ButtonEdit
                variant="contained"
                color="primary"
                startIcon={<EditOutlinedIcon />}
                size="small"
                onClick={goEdit}
                >
                    Edit
                </ButtonEdit>
                <ButtonDelete
                variant="contained"
                color="primary"
                startIcon={<DeleteIcon />}
                size="small"
                onClick={handleClickOpen}
                >
                    Delete
                </ButtonDelete>
            </ButtonWrapper>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"현재 포스트를 삭제할까요?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Caution) 삭제한 포스트는 되돌릴수 없어요!
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="default">
                    취소
                </Button>
                <Button onClick={doDelete} color="secondary" autoFocus>
                    삭제
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditAndDelete;