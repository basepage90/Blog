import styled from "styled-components";

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

interface EditAndDeleteButtonProps {
    open: boolean;
    handleClickOpen: () => void;
    handleClose: () => void;
    doDelete: () => void;
    goEdit: () => void;
};

const EditAndDeleteButton = ({open,handleClickOpen,handleClose,doDelete,goEdit}: EditAndDeleteButtonProps) => {
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
                <DialogTitle id="alert-dialog-title">{"?????? ???????????? ????????????????"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Caution) ????????? ???????????? ???????????? ?????????!
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="default">
                    ??????
                </Button>
                <Button onClick={doDelete} color="secondary" autoFocus>
                    ??????
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditAndDeleteButton;