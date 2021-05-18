import React from "react";
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import NotFoundPage from 'pages/NotFoundPage';
import Logo from "components/logo/Logo";
import Header from "components/header/Header";
import SideBar from "components/sideBar/SideBar";
import Home from 'pages/home/Home';
import RootContainer from 'components/common/layoutContainer/rootContainer'
import store from "store/store";

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
    path: "/javascript",
    name: "javascript",
    component: null,
  },
  {
    layout: "/dev",
    path: "/architecture",
    name: "architecture",
    component: null,
  },
  {
    layout: "/music",
    path: "",
    name: "music",
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
  // Root Grid Expand event
  const [sideBarFlag, setSideBarFlag] = React.useState(false);
  store.subscribe(()=> { 
      const sideBarState = store.getState().sideBarHidden.sideBarState;
      setSideBarFlag(sideBarState);
  });
  const expansion = {
    width: sideBarFlag ? "100%" : "calc(100% - 256px)"
  };

  return(
    <BrowserRouter>
    <>
          <Logo />
          <SideBar/>
          <Header />
          <RootContainer className="root__container" style={expansion}>
            {switchRoutes}
          </RootContainer>
      </>
    </BrowserRouter>
  );
};

export default Router;