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

const Div = styled.div`
  position: fixed;
  display: flex;
  top:64px;
  bottom:0;
  width: ${sidebarWidth};\

  border-right: 1px solid rgba(0, 0, 0, 0.12);
  \`border-top: 1px solid rgba(0, 0, 0, 0.12);
 
  \`background-image: url(${sidebar1});
  \`background-size: cover;
  \`background-position: center;
`;

export default function SideBar(){
    return (
    <Div>
      <List>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
      
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItem>
      </List>
    </Div>
    )
};