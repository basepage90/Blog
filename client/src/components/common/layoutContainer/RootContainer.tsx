import React from "react";
import styled from 'styled-components';
import { RootState } from "store/store"
import {sidebarWidth,headerHeight} from 'constants/StyleConstant'
import { useSelector } from "react-redux";

const Div = styled.div`
  position: relative;
  margin-top: ${headerHeight};
  float:right;
  width: calc(100% - ${sidebarWidth});
  padding: 2% 2% 0 2%;
  transition: all ${({theme}) => theme.transition.duration.standard};
`;

interface RootContainerProps {
  switchRoutes: string[];
}

function RootContainer({switchRoutes}: RootContainerProps){
    // Root Grid Expand event
    const mobileFlag = useSelector( (state: RootState) => state.sideBarHidden.mobileFlag);
    const sideBarState = useSelector( (state: RootState) => state.sideBarHidden.sideBarState);

    const expansion = {
      width: mobileFlag ? "100%" : sideBarState ? "100%" : "calc(100% - 256px)"
    };
    
    return (
      <Div className="root__container" style={expansion}>
        {switchRoutes}
      </Div>
    );
}

export default RootContainer;