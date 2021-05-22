import React from "react";
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import NotFoundPage from 'pages/NotFoundPage';
import SideBar from "components/sideBar/SideBar";
import Header from "components/header/Header";
import RootContainer from 'components/common/layoutContainer/rootContainer'
import routesCollection from 'components/routesCollection'

const switchRoutes = (
  <Switch>
    {routesCollection.map((prop, key) => {
        return ( <Route path={prop.layout + prop.path} exact component={prop.component} key={key} /> );
      })
    }
    <Route component={NotFoundPage} />
  </Switch>
);

function Router(){
  return(
    <BrowserRouter>
      <>    
        <SideBar />
        <Header routesCollection={routesCollection} />
        <RootContainer switchRoutes={switchRoutes} />
      </>
    </BrowserRouter>
  );
};

export default Router;