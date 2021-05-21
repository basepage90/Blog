import Home from 'pages/home/Home';

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
      name: "About",
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

export default routesCollection;