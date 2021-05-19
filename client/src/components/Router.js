import React from "react";
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import NotFoundPage from 'pages/NotFoundPage';
import SideBar from "components/sideBar/SideBar";
import Header from "components/header/Header";
import Home from 'pages/home/Home';
import RootContainer from 'components/common/layoutContainer/rootContainer'

const routesCollection = [
  {
    layout: "/",
    path: "",
    name: "Home",
    component: Home,
  },
  {
    layout: "/about",
    path: "",
    name: "about",
    component: Home,
  },
  {
    layout: "/dev",
    path: "",
    name: "development",
    component: null,
  },
  {
    layout: "/dev",
    path: "/java",
    name: "java",
    component: null,
  },
  {
    layout: "/dev",
    path: "/golang",
    name: "golang",
    component: null,
  },
  {
    layout: "/dev",
    path: "/front-end",
    name: "front-end",
    component: null,
  },
  {
    layout: "/dev",
    path: "/dbms",
    name: "dbms",
    component: null,
  },
  {
    layout: "/dev",
    path: "/os",
    name: "os",
    component: null,
  },
  {
    layout: "/dev",
    path: "/architecture",
    name: "architecture",
    component: null,
  },
  {
    layout: "/dev",
    path: "/common",
    name: "common",
    component: null,
  },
  {
    layout: "/music",
    path: "",
    name: "music",
    component: null,
  },
  {
    layout: "/music",
    path: "/힙합",
    name: "힙합",
    component: null,
  },
  {
    layout: "/music",
    path: "/힙합",
    name: "힙합",
    component: null,
  },
  {
    layout: "/music",
    path: "/hiphop",
    name: "hiphop",
    component: null,
  },
  {
    layout: "/music",
    path: "/r&b",
    name: "r&b",
    component: null,
  },
  {
    layout: "/music",
    path: "/pop",
    name: "pop",
    component: null,
  },
  {
    layout: "/recipe",
    path: "",
    name: "recipe",
    component: null,
  },
];

const switchRoutes = (
  <Switch>
    {routesCollection.map((prop, key) => {
        return ( <Route path={prop.layout + prop.path} exact component={prop.component} key={prop.name} /> );
      })
    }
    <Route component={NotFoundPage} />
  </Switch>
);

function Router(){
  return(
    <BrowserRouter>
      <>    
        <SideBar/>
        <Header />
        <RootContainer switchRoutes={switchRoutes} />
      </>
    </BrowserRouter>
  );
};

export default Router;