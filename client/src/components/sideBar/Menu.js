import React,{ useState } from "react";
import styled from 'styled-components';
import {Link} from "react-router-dom";
import { click } from "store/store";
import { useDispatch } from 'react-redux'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FaceIcon from '@material-ui/icons/Face';
import HeadsetIcon from '@material-ui/icons/Headset';
import ComputerIcon from '@material-ui/icons/Computer';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

const Div = styled.div`
  display: flex;
  width: inherit;
  flex-grow: 1;
  transition: all ${({theme}) => theme.transition.duration.standard};

  & ul { 
    width: inherit;
    height: 100%;
  }

  & a {
    text-decoration: none;
    color: #495057;
  }

  & [class*='nested'] {
    padding-left: 32px;
  }
`;

function Menu(){

    const dispatch = useDispatch();

    const menuClick = () => {
      dispatch(click());
    }

    // list select
    const [selectedIndex, setSelectedIndex] = useState();

    const handleListItemClick = (event,index) => {
      setSelectedIndex(index);
    };

    // List expand
    const [openDev, setOpenDev] = useState(false);
    const [openMusic, setOpenMusic] = useState(false);

    const handleClick = (text) => {
      switch (text){
        case 'dev': setOpenDev(!openDev);
          break;
        case 'music': setOpenMusic(!openMusic);
          break;
        default :
          break;
      }
    };
    return (
    <Div onClick={menuClick} >
      <List>

        <ListItem button component={Link} to="/about/about" selected={selectedIndex === 0} onClick={(event) => {handleListItemClick(event, 0); }}>
          <ListItemIcon>
            <FaceIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>

        <ListItem button selected={selectedIndex === 1}  onClick={(event) => {handleListItemClick(event , 1); handleClick("dev") }} >
          <ListItemIcon>
            <ComputerIcon />
          </ListItemIcon>
          <ListItemText primary="Development" />
          {openDev ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
          <Collapse in={openDev} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className="nested" component={Link} to="/dev/java" >
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Java" />
              </ListItem>
              <ListItem button className="nested" component={Link} to="/dev/golang" >
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Go Lang" />
              </ListItem>
              <ListItem button className="nested" component={Link} to="/dev/front-end" >
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Front-End" />
              </ListItem>
              <ListItem button className="nested" component={Link} to="/dev/dbms" >
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="DBMS" />
              </ListItem>
              <ListItem button className="nested" component={Link} to="/dev/os" >
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="OS" />
              </ListItem>
              <ListItem button className="nested" component={Link} to="/dev/architecture" >
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Architecture" />
              </ListItem>
              <ListItem button className="nested" component={Link} to="/dev/common" >
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Common" />
              </ListItem>
            </List>
          </Collapse>

        
          <ListItem button selected={selectedIndex === 2} onClick={(event) => {handleListItemClick(event , 2); handleClick('music')}}>
            <ListItemIcon>
              <HeadsetIcon />
            </ListItemIcon>
            <ListItemText primary="Music" />
            {openMusic ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openMusic} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className="nested" component={Link} to="/music/krHiphop" >
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="힙합" />
              </ListItem>
              <ListItem button className="nested" component={Link} to="/music/hiphop" >
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Hiphop" />
              </ListItem>
              <ListItem button className="nested" component={Link} to="/music/r&b" >
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="R&B" />
              </ListItem>
              <ListItem button className="nested" component={Link} to="/music/pop" >
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Pop" />
              </ListItem>

             </List>
          </Collapse>
        

          <ListItem button component={Link} to="/recipe/recipe" selected={selectedIndex === 3} onClick={(event) => {handleListItemClick(event, 3)}}>
            <ListItemIcon>
              <RestaurantIcon />
            </ListItemIcon>
            <ListItemText primary="Recipe" />
          </ListItem>

      </List>
    </Div>
    )
};


export default Menu;