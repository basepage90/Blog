import styled from 'styled-components'
import { forwardRef } from "react";
import { closeSearchDialog } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import SearchBoxMobile from 'components/header/SearchBoxMobile'
import ResultViewerMobile from 'containers/search/ResultViewerMobile'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StAppBar = styled(AppBar)`
  background-color: ${({theme}) => theme.palette.sky0};
`;


const SearchDialog = () => {
  const searchDialogOpen = useSelector( state => state.search.searchDialogOpen )
  const dispatch = useDispatch();
  
  const handleClose = () => {
      dispatch(closeSearchDialog());
  };

  return (
    <Dialog fullScreen open={searchDialogOpen} onClose={handleClose} TransitionComponent={Transition}>
      <StAppBar>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon  />
          </IconButton>
            <SearchBoxMobile />
        </Toolbar>
      </StAppBar>
      <ResultViewerMobile />
    </Dialog>
  )
}

export default SearchDialog;