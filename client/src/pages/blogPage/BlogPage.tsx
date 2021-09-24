import React, { useEffect } from "react";
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from "store/store"
import { useQuery } from '@apollo/react-hooks'
import { GetMenuList, GetCurrentUser } from 'gql/query'

import SideBar from "components/sideBar/SideBar";
import Header from "components/header/Header";
import CardListPage from 'pages/blogPage/CardListPage'
import LatestPage from 'pages/blogPage/LatestPage'
import RootContainer from 'components/common/layoutContainer/RootContainer'
import ArticlePage from 'pages/blogPage/ArticlePage'
import NotFoundPage from 'pages/NotFoundPage';

const switchRoutes: any = (
  <Switch>
    <Route path="/" exact component={LatestPage} />
    <Route path="/:categoryLg/:categoryMd" exact component={CardListPage} />
    <Route path="/:categoryLg/:categoryMd/:id" exact component={ArticlePage} />
    <Route component={NotFoundPage} />
  </Switch>
);

function BlogPage(){
  const { loading, data } = useQuery(GetMenuList);
  
  const GetCurrentUserQuery = useQuery(GetCurrentUser,{fetchPolicy: 'network-only'});
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!GetCurrentUserQuery.loading){
      if(GetCurrentUserQuery.data !== undefined){
        if(GetCurrentUserQuery.data.getCurrentUser !== null){
          const userInfo = {
            email: GetCurrentUserQuery.data.getCurrentUser.email,
            nickname: GetCurrentUserQuery.data.getCurrentUser.nickname,
            admin_flag: GetCurrentUserQuery.data.getCurrentUser.admin_flag,
          }
          dispatch(setUser(userInfo));
        } // getCurrentuser
      } // data
    } //loading
  },[GetCurrentUserQuery,dispatch])

  return(
    <>
      <SideBar />
      <Header loading={loading} data={data} />
      <RootContainer switchRoutes={switchRoutes} />
    </>
  );
};

export default BlogPage;