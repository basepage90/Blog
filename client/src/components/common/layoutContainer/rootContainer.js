import React,{ useState, useEffect } from "react";
import styled from 'styled-components';
import {sidebarWidth,headerHeight} from 'styles/styleConst'
import { useSelector } from "react-redux";

const Div = styled.div`
  position: relative;
  margin-top: ${headerHeight};
  float:right;
  width: calc(100% - ${sidebarWidth});
  display: grid;
  padding: 2% 2% 0 2%;
  transition: all ${({theme}) => theme.transition.duration.standard};
`;

function RootContainer({switchRoutes}){
    // Root Grid Expand event
    const initSideBar = useSelector(state => state.sideBarHidden.initSideBar);
    const sideBarState = useSelector(state => state.sideBarHidden.sideBarState);

    const [sideBarFlag, setSideBarFlag] = useState(initSideBar);
    

    useEffect (()=>{
      setSideBarFlag(sideBarState);
    },[sideBarState]);

    const expansion = {
      width: initSideBar ? "100%" : sideBarFlag ? "100%" : "calc(100% - 256px)"
    };
    return (
      <Div className="root__container" style={expansion}>
        {switchRoutes}
      </Div>
    );
    
}
export default RootContainer;