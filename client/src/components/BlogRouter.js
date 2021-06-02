import React from "react";
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks'
import { GetMenuList } from 'gql/query'

import SideBar from "components/sideBar/SideBar";
import Header from "components/header/Header";
import CardListPage from 'pages/CardListPage'
import RootContainer from 'components/common/layoutContainer/rootContainer'
import ArticlePage from 'pages/ArticlePage'
import NotFoundPage from 'pages/NotFoundPage';

const switchRoutes = (
  <Switch>
    <Route path="/" exact component={CardListPage} />
    <Route path="/:categoryLg/:categoryMd" exact component={CardListPage} />
    <Route path="/:categoryLg/:categoryMd/:id" exact component={ArticlePage} />
    <Route component={NotFoundPage} />
  </Switch>
);

function Router(){
  const { loading, data } = useQuery(GetMenuList);
  return(
    <BrowserRouter>
      <>    
        <SideBar />
        <Header loading={loading} data={data} />
        <RootContainer switchRoutes={switchRoutes} />
      </>
    </BrowserRouter>
  );
};

export default Router;