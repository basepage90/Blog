import React,{ useEffect } from "react";
import styled from "styled-components";
import Logo from "components/sideBar/Logo";
import Menu from "components/sideBar/Menu";
import LinkFoot from "components/sideBar/LinkFoot";
import { sidebarWidth } from 'constants/StyleConstant'

import { transSideBar, transMobileFlag} from "store/store";
import { useDispatch, useSelector } from 'react-redux'

const Outside = styled.div`
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const Div = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    width: ${sidebarWidth};
    height: 100%;
    background-color: #FAFAFA;
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    transition: all ${({theme}) => theme.transition.duration.standard};
    z-index: ${({theme}) => theme.zIndex.drawer};
    overflow-y: auto;
    overflow-x: hidden;
`;



// 의존성배열없이 componentDidMount 처럼 동작 하기 위한 변수.
let justFlag = true;

function SideBar(){
    // SideBar Hidden/Expand event
    const mobileFlag = useSelector(state => state.sideBarHidden.mobileFlag);
    const sideBarState = useSelector(state => state.sideBarHidden.sideBarState);
    const dispatch  = useDispatch();

    const outsideClick = () => {
        dispatch(transSideBar());
    }

    
    const monitoringSideBar = () => {
        const prevBrowserWidth = window.innerWidth || document.body.clientWidth ;
        let prevSideBar = prevBrowserWidth < 768 ? true:false;
        
        window.onresize = () => {
            const currentBrowserWidth = window.innerWidth || document.body.clientWidth ;
            const CurrentSideBar = currentBrowserWidth < 768 ? true:false;
            
            if( prevSideBar !== CurrentSideBar){
                dispatch(transMobileFlag(CurrentSideBar));
            }
            prevSideBar = CurrentSideBar;
        }
    }
    
    useEffect(() => {
        if( justFlag){
            monitoringSideBar();
            justFlag = false;
        }
    });
    
    useEffect(() => {
        const outside = document.getElementById('outside');
        // mobile 화면에서는 outsideClick 를 add 한다
        if( mobileFlag ){
            outside.addEventListener('click', outsideClick);
        }
                
        return () => { // componentWillUnmount
            // mobile 화면을 벗어나면, outsideClick 를 remove 한다.
            // dispatch(transSideBar()) 한 시점 이후에 mobileFlag 는 false 로 바뀌지만, componentWillUnmount 이미 true 인상태에서 발생한다.  
            if( mobileFlag ){
                outside.removeEventListener('click', outsideClick);
            }
        }
    });

    const mobile = {
        outside: {
            zIndex: !sideBarState ? "-1" : "1199",
            opacity: !sideBarState ? "0":"1",
        },
        div: {
            transform: !sideBarState ? "translateX(-100%)" : "translateX(0)"
        }
    };
     
    const desktop = {
        outside: {
            zIndex: "-1",
            opacity: "0"
        },
        div: {
            transform: sideBarState ? "translateX(-100%)" : "translateX(0)"
        }
    };
    
    if (mobileFlag){
        if(sideBarState){
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return (
            <>
            <Outside id="outside"  style={ mobile.outside }/>
            <Div style={ mobile.div }>
                <Logo />
                <Menu />
                <LinkFoot />
            </Div>
            </>
        );
    }else{
        return(
            <>
            <Outside id="outside"  style={ desktop.outside } />
            <Div style={ desktop.div }>
                <Logo />
                <Menu />
                <LinkFoot />
            </Div>
            </>
        );
    }
}

export default SideBar;