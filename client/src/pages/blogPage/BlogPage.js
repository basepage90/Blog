import React from "react";
import { Route, Switch } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks'
import { GetMenuList } from 'gql/query'

import SideBar from "components/sideBar/SideBar";
import Header from "components/header/Header";
import CardListPage from 'pages/blogPage/CardListPage'
import RootContainer from 'components/common/layoutContainer/rootContainer'
import ArticlePage from 'pages/blogPage/ArticlePage'
import NotFoundPage from 'pages/NotFoundPage';

const switchRoutes = (
  <Switch>
    <Route path="/" exact component={CardListPage} />
    <Route path="/:categoryLg/:categoryMd" exact component={CardListPage} />
    <Route path="/:categoryLg/:categoryMd/:id" exact component={ArticlePage} />
    <Route component={NotFoundPage} />
  </Switch>
);

function BlogPage(){
  const { loading, data } = useQuery(GetMenuList);
  return(
    <>
      <SideBar />
      <Header loading={loading} data={data} />
      <RootContainer switchRoutes={switchRoutes} />
    </>
  );
};

export default BlogPage;