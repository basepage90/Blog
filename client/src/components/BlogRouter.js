import React from "react";
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import NotFoundPage from 'pages/NotFoundPage';
import SideBar from "components/sideBar/SideBar";
import Header from "components/header/Header";
import RootContainer from 'components/common/layoutContainer/rootContainer'
import routesCollection from 'components/routesCollection'

import CardListPage from 'pages/CardListPage'
import ArticlePage from 'pages/ArticlePage'


const switchRoutes = (
  <Switch>
    <Route path="/" exact component={CardListPage} />
    <Route path="/:categoryLg/:categoryMd" exact component={CardListPage} />
    <Route path="/:categoryLg/:categoryMd/:id" exact component={ArticlePage} />
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