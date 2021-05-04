import React from "react";
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import NotFoundPage from 'pages/NotFoundPage';
import Logo from "components/logo/Logo";
import Header from "components/header/Header";
import SideBar from "components/sideBar/SideBar";
import Home from 'pages/home/Home';
import RootContainer from 'components/common/layoutContainer/rootContainer'


function Router(){

  return(
    <BrowserRouter>
    <>
          <Logo />
          <SideBar/>
          <Header />
          <RootContainer className="root__container">
            <Switch>
              <Route path='/' exact component={Home} />
              <Route component={NotFoundPage} />
            </Switch>
          </RootContainer>
      </>
    </BrowserRouter>
  );
};

export default Router;