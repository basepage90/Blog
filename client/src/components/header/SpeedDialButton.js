import { useState } from "react";
import styled from "styled-components";
import { BaseURL, ServerPort } from 'constants/AddressConstant'
import { headerHeight } from 'constants/StyleConstant'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { adminOpen, snackBarOpen, openSearchDialog } from "store/store";
import axios from "axios";
import AdminDialog from "components/header/AdminDialog"
import SearchDialog from "components/header/SearchDialog"
import UrlCopy from 'components/header/UrlCopy';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreateIcon from '@material-ui/icons/Create';

import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import LinkIcon from '@material-ui/icons/Link';


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
    const handleClick = (val) => {

        switch (val){
            case 'admin': dispatch(adminOpen());
                break;
            case 'search': dispatch(openSearchDialog());
                break;
            case 'snack': dispatch(snackBarOpen());
                break;
            default:
                break;
        }
    };

    const { admin_flag } = useSelector(
        state => ({admin_flag: state.user.admin_flag})
    );

    const signout = async () => {
        const apiClient = axios.create({
            baseURL: BaseURL + ServerPort,
            withCredentials: true,
          });
        const url = "/signout"
        await apiClient.post(url)
        .then( (response) => {
            // try 
            window.location.replace('/');
        }).catch( (error) => {
            // catch
        }).then( () => {
            // finally
        });
    }
    
    const history = useHistory();

    const goWrite = () => {
      history.push('/write')
    }

    const DialChild = 
        admin_flag ?
            [
                { icon: <SearchIcon />, name: 'Search', onClick: () => {handleClick('search')}, compo: SearchDialog },
                { icon: <LinkIcon />, name: 'Link', onClick: () => {handleClick('snack')}, compo: UrlCopy },
                { icon: <CreateIcon />, name: 'Write', onClick: goWrite, compo: null} , 
                { icon: <ExitToAppIcon />, name: 'Sign out', onClick: signout, compo: null }
            ]
        : 
            [
                { icon: <SearchIcon />, name: 'Search', onClick: () => {handleClick('search')}, compo: SearchDialog },
                { icon: <LinkIcon />, name: 'Link', onClick: () => {handleClick('snack')}, compo: UrlCopy },
                { icon: <AccountCircle />, name: 'Admin', onClick: ()=> {handleClick('admin')}, compo: AdminDialog }
            ]
    ;

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
            {DialChild.map((action) => (
                action.compo !== null ? <action.compo key={action.name} /> : null
            ))
            }
        </Div>
        </>
    )
}