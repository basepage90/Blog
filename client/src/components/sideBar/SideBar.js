import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import {sidebar1} from 'statics/images';
import {sidebarWidth} from 'styles/styleConst'

import store,{updateLayout,updatePath} from "store/store";
import {Link} from "react-router-dom";
import { connect } from "react-redux";

const Div = styled.div`
  position: fixed;
  display: flex;
  top:64px;
  bottom:0;
  width: ${sidebarWidth};
  transition: all ${({theme}) => theme.transition.duration.standard};

  border-right: 1px solid rgba(0, 0, 0, 0.12);
  \`border-top: 1px solid rgba(0, 0, 0, 0.12);
  
  \`background-image: url(${sidebar1});
  \`background-size: cover;
  \`background-position: center;

  & ul { 
    width: inherit;
  }

  & a {
    text-decoration: none;
    color: #495057;
  }

`;


function SideBar({updateLayout,updatePath}){

    // sideBar hidden event
    const [sideBarFlag, setSideBarFlag] = React.useState(false);

    store.subscribe(()=> { 
      const sideBarState = store.getState().sideBarHidden.sideBarState;
      setSideBarFlag(sideBarState);
    });

    const updateSubject = (text) => {
      updateLayout(text);
    };

    return (
    <Div style={{display: sideBarFlag ? "none" : ""}}>
      <List>

        <Link to="/about" layout="About" onClick={(e) => {updateSubject('About')}} >
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
        </Link>

        <Link to="/dev" onClick={(e) => {updateSubject('Development')}} >
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Development" />
          </ListItem>
        </Link>

        <Link to="/music" onClick={(e) => {updateSubject('Music')}} >
          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Music" />
          </ListItem>
        </Link>

        <Link to="/recipe" onClick={(e) => {updateSubject('Recipe')}} >
          <ListItem button>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Recipe" />
          </ListItem>
        </Link>

      </List>
    </Div>
    )
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLayout: (text) => dispatch(updateLayout(text)),
    updatePath: (text) => dispatch(updatePath(text)),
   };
}

export default connect(null,mapDispatchToProps)(SideBar);