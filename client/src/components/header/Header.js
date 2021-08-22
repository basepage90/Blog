import React, { useEffect } from "react";
import styled from "styled-components";
import { BaseURL, ServerPort } from 'constants/AddressConstant'
import {sidebarWidth,headerHeight} from 'constants/StyleConstant'
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { transSideBar, adminOpen } from "store/store";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import SearchBox from "components/header/SearchBox";
import SpeedDialButton from "components/header/SpeedDialButton"
import {Link} from "react-router-dom";
import AdminDialog from 'components/header/AdminDialog'
import initKakao from 'util/initKakao'
import ResultViewer from 'containers/search/ResultViewer'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import HeadsetIcon from '@material-ui/icons/Headset';
import ComputerIcon from '@material-ui/icons/Computer';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Div = styled.div`
    position: fixed;
    left: ${sidebarWidth};
    right: 0;
    height: ${headerHeight};
    transition: all ${({theme}) => theme.transition.duration.standard};
    z-index: ${({theme}) => theme.zIndex.appBar};
`;
    
const StAppBar = styled(AppBar)`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: auto;
    background-color: ${({theme}) => theme.palette.sky0};
`;

const StToolbar = styled(Toolbar)`
    .menu__btn{
        margin-right: 1.5rem;
    }
    .subject{
        flex-grow: 1;
        display: flex;
        align-items: center;
    }
`;

let prevScrollpos = window.pageYOffset;

const HideHeader = () => {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos || prevScrollpos === 0) {
        document.getElementById("rootHeader").style.top = "0";
    } else {
        let height = document.getElementById("rootHeader").offsetHeight;
        document.getElementById("rootHeader").style.top = -height+"px";
    }
    prevScrollpos = currentScrollPos;
}

// icon selector
const selectIcon = (text) => {
    switch (text) {
        case 'about' : 
            return <FaceIcon key="face" />
        case 'development' :
            return  <ComputerIcon key="computer" />
        case 'music' :
            return <HeadsetIcon key="headset" />
        case 'recipe' :
            return  <RestaurantIcon key="restaurant" />
        default : 
            return <HomeIcon key="home" /> 
    }
}

function Header({ loading, data }){
    const dispatch = useDispatch();

    console.log("test jenkins5");

    // SideBar 
    const { mobileFlag, sideBarState, admin_flag } = useSelector(
        state => ({
            mobileFlag: state.sideBarHidden.mobileFlag,
            sideBarState: state.sideBarHidden.sideBarState,
            menuOpen: state.menuClick.open, // menuClickState -> makeSubject를 위해 subcribe 기능은 하되, 직접적으로 사용하지는 않는다.
            // nicname: state.user.nickname,
            // email: state.user.email,
            admin_flag: state.user.admin_flag,
    }), shallowEqual);
        
    const handleSideBarOpen = () => { dispatch(transSideBar()) };
    
    // Admin Dialog
    const handleClickOpen = () => { dispatch(adminOpen()) };

    // location - path
    const location =  useLocation();
    
    // Suject
    const makeSubject = () => {
        const locationArr = (location.pathname).split( '/', '3' )
        const location_lg = locationArr[1]
        const location_md = locationArr[2]
        let subject;
        const nbsp = String.fromCharCode(160);
        const arrowIcon = <ArrowRightIcon key="arrow" />;
        if(!loading){
            data.categoryList.map(lg => {
                if( location_lg === lg.category_lg ) {
                    if(mobileFlag){
                        if(lg.category_md.length === 0){
                            subject = [selectIcon(lg.category_lg), nbsp+nbsp, lg.screen_name]
                        } else{
                            lg.category_md.map( md => {
                                if(location_md === md.name){
                                    subject = [selectIcon(lg.category_lg), nbsp+nbsp, arrowIcon, nbsp, md.screen_name]
                                }   
                                return null;
                            })
                        }
                    } else {
                        if(lg.category_md.length === 0){
                            subject = [selectIcon(lg.category_lg), nbsp+nbsp, lg.screen_name]
                        } else {
                            lg.category_md.map( md => {
                                if(location_md === md.name){
                                    subject = [selectIcon(lg.category_lg), nbsp+nbsp, lg.screen_name, nbsp, arrowIcon, nbsp, md.screen_name]
                                }   
                                return null;
                            })
                        } 
                    }
                } else if (location.pathname === "/"){
                    subject = [selectIcon(), nbsp+nbsp, "Home"]
                    return subject
                }
                return null;
            });
        }
        return subject
    }


    const signout = async () => {
        initKakao();
        const apiClient = axios.create({
            baseURL: BaseURL + ServerPort,
            withCredentials: true,
          });
        const url = "/signout"
        await apiClient.post(url)
        .then( (response) => {
            // try
            // case1) 서비스연결끊기 : 약관동의만료 + 토큰만료
            window.Kakao.API.request({
                url: '/v1/user/unlink',
                success: function(response) {
                    window.location.replace('/');
                },
                fail: function(error) {
                    window.location.replace('/');
                },
            });

            // case2) 계정로그아웃	: 계정 로그아웃 + 토큰만료
            // window.location.href = 'https://kauth.kakao.com/oauth/logout?client_id=17e2b41913f7f223f6c370c7cfe2d33b&logout_redirect_uri=http://crispyblog.ddns.net'; 
        }).catch( (error) => {
            // catch
        }).then( () => {
            // finally
        });
    }

    // This expression is working similar to ComponentDidMount + componentWillUnmount
    useEffect(() => {
        window.addEventListener('scroll',  HideHeader);
        return () => {
            window.removeEventListener('scroll', HideHeader);
        }
    }, []);
    
    return (
        <Div id="rootHeader" style={{ left: mobileFlag ?  "0" :  (sideBarState  ? "0": sidebarWidth) }} >
            <StAppBar aria-label="menu">    
                <StToolbar >
                    <IconButton
                        edge="start"
                        className="menu__btn"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleSideBarOpen}
                    >
                    { mobileFlag ? <MenuIcon /> : sideBarState ? <MenuIcon /> : <ChevronLeft />}
                    </IconButton>
                        <span className="subject">
                            {makeSubject()}
                        </span>
                    { mobileFlag ? <SpeedDialButton /> :
                    <>
                        <SearchBox />
                        {admin_flag ? 
                        <>
                            <IconButton color="inherit" component={Link} to="/write" >
                                <CreateIcon />
                            </IconButton>
                            <IconButton
                             onClick={signout}
                             color="inherit"
                             >
                                <ExitToAppIcon />
                            </IconButton>
                        </>
                        :
                        <>
                            <IconButton
                            onClick={handleClickOpen}
                            color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <AdminDialog />
                        </>
                        }
                    </>
                    }
                </StToolbar>
            </StAppBar>
            <ResultViewer />
        </Div>
    )
};

export default Header;