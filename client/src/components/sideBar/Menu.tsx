import React,{ useState } from "react";
import styled from 'styled-components';
import {Link} from "react-router-dom";
import { click } from "store/store";
import { useDispatch } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { GetMenuList } from 'gql/query'

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

const JustDiv = styled.div`
`;
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
    const {loading, data} = useQuery(GetMenuList);

    const dispatch = useDispatch();

    const menuClick = () => {
      dispatch(click());
    }

    // menu select
    const [selectedIndex, setSelectedIndex] = useState<number>();
    const handleListItemClick = (index:number) => {
      setSelectedIndex(index);
    };

    // category_md expand
    const [openDev, setOpenDev] = useState(false);
    const [openMusic, setOpenMusic] = useState(false);

    const handleClick = (text: string) => {
      switch (text){
        case 'development': setOpenDev(!openDev);
          break;
        case 'music': setOpenMusic(!openMusic);
          break;
        default :
          break;
      }
    };

    const selectOpener = (text: string) => {
      switch (text){
        case 'development': 
          return openDev
        case 'music': 
          return openMusic
        default :
          return 
      }
    }

    // icon selector
    const selectIcon = (text: string) => {
      switch (text) {
        case 'about' : 
          return <FaceIcon />
        case 'development' :
          return  <ComputerIcon />
        case 'music' :
          return <HeadsetIcon />
        case 'recipe' :
          return  <RestaurantIcon />
        default :
          return 
      }
    }

    if (loading){
      return <Div onClick={menuClick} />
    } else {
      const loadMenu = data.categoryList.map((lg: any) => {
          if(lg.category_md.length === 0){
            return (
            <ListItem key={lg.category_lg} button component={Link} to={"/"+lg.category_lg+"/"+lg.category_lg} selected={selectedIndex === lg.sno} onClick={() => {handleListItemClick(lg.sno); }}>
              <ListItemIcon >
                {selectIcon(lg.category_lg)}
              </ListItemIcon>
              <ListItemText primary={lg.screen_name} />
            </ListItem>
            )
          }else{
            return (
              <JustDiv key={lg.category_lg+"jd"}>
              <ListItem  button  selected={selectedIndex === lg.sno}  onClick={() => {handleListItemClick(lg.sno); handleClick(lg.category_lg) }} >
                <ListItemIcon  >
                  {selectIcon(lg.category_lg)}
                </ListItemIcon>
                <ListItemText primary={lg.screen_name} />
                {selectOpener(lg.category_lg) ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
                  <Collapse in={selectOpener(lg.category_lg)}  timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    {lg.category_md.map( (md: any) => {
                      return (
                        <ListItem key={md.name} button className="nested" component={Link}  to={"/"+lg.category_lg+"/"+md.name} >
                          <ListItemIcon />
                          <ListItemText primary={md.screen_name} />
                        </ListItem>
                      )
                    })}
                    </List>
                </Collapse>
               </JustDiv>
            )
          }
        })

    return (
      <Div onClick={menuClick} >
        <List>
        {loadMenu}
        </List>
      </Div>
    )
  }
    
};

export default Menu;