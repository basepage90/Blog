import { useEffect } from "react";
import { Snackbar } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { snackBarClose } from "store/store";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function UrlCopy ()  {
    const snackBarState = useSelector( state => state.snackBar.open )
    const dispatch = useDispatch();
    const handleClickClose = () => {
      dispatch(snackBarClose());
    };

    const copy = () => {
        const url = document.location.href;
        const tempElem = document.createElement('textarea');
        tempElem.value = url;  
        document.body.appendChild(tempElem);
        tempElem.select();
        document.execCommand("copy");
        document.body.removeChild(tempElem);
    }

    useEffect(() => {
        if(snackBarState){
            copy();
        }
    },[snackBarState]);

    return (
        <Snackbar
        open={snackBarState}
        onClose={handleClickClose}
        autoHideDuration={1500} 
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert onClose={handleClickClose} severity="success">
                Link Copy Success!
            </Alert>
        </Snackbar>
    )

}

export default UrlCopy;