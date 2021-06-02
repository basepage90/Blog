import { useState } from "react";
import { useDispatch } from "react-redux";
import { adminOpen, snackBarOpen } from "store/store";
import styled from "styled-components";
import { headerHeight } from 'styles/styleConst'

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';

import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import LinkIcon from '@material-ui/icons/Link';

import AdminDialog from "components/header/AdminDialog"
import UrlCopy from 'components/header/UrlCopy';

const Div = styled.div`
    position: relative;
    height: ${ headerHeight };
    height: 38px;
    .MuiFab-root{
        width: 36px;
        height: 36px;
    }
    & .MuiFab-primary{
        background-color: ${({theme}) => theme.palette.sky0};
    }
`;

export default function SpeedDialButton(){
    // Speed Dial
    const [open, setOpen] = useState(false);
    const dialClose = () => {
        if(open){
            setOpen(false);
        }
    };
    const dialOpen = () => {
        if(!open){
            setOpen(true);
        }
    };

    const dispatch = useDispatch({});
    
    // Admin Dialog
    const handleClickOpen = () => {
        dispatch(adminOpen());
    };

    // SnackBar
    const snackOpen = () => {
        dispatch(snackBarOpen());
    };

    const DialChild = [
        { icon: <SearchIcon />, name: 'Search', onClick: handleClickOpen, compo: null },
        { icon: <LinkIcon />, name: 'Link', onClick: snackOpen, compo: UrlCopy },
        { icon: <AccountCircle />, name: 'Admin', onClick: handleClickOpen, compo: AdminDialog },
    ];

    return (
        <>
        <Div>
            <SpeedDial
            ariaLabel="SpeedDial"
            icon={<SpeedDialIcon />}
            onClose={dialClose}
            onClick={dialOpen}
            open={open}
            direction={"down"}
            >
            {DialChild.map((action) => (
                <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.onClick}
                />
                ))
            }
            </SpeedDial>
            <AdminDialog />
            {DialChild.map((action) => (
                action.compo !== null ? <action.compo key={action.name} /> : null
            ))
            }
        </Div>
        </>
    )
}