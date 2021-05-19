import React from "react";
import styled from 'styled-components';
import {sidebarWidth,headerHeight} from 'styles/styleConst'
import store from "store/store";

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
    const [sideBarFlag, setSideBarFlag] = React.useState(false);
    store.subscribe(()=> { 
        const sideBarState = store.getState().sideBarHidden.sideBarState;
        setSideBarFlag(sideBarState);
    });
    const expansion = {
      width: sideBarFlag ? "100%" : "calc(100% - 256px)"
    };
    return (
      <Div className="root__container" style={expansion}>
        {switchRoutes}
      </Div>
    );
    
}
export default RootContainer;