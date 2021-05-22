import Home from 'pages/home/Home';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import ComputerIcon from '@material-ui/icons/Computer';
import HeadsetIcon from '@material-ui/icons/Headset';
import RestaurantIcon from '@material-ui/icons/Restaurant';

const homeIcon = <HomeIcon key="headerIcon" />
const faceIcon = <FaceIcon key="headerIcon" />
const computerIcon = <ComputerIcon key="headerIcon" />
const headsetIcon = <HeadsetIcon key="headerIcon" />
const restaurantIcon = <RestaurantIcon key="headerIcon" />


const routesCollection = [
    {
      layout: "/",
      path: "",
      icon: homeIcon,
      name: "Home",
      subName: "",
      component: Home,
    },
    {
      layout: "/about",
      path: "",
      icon: faceIcon,
      name: "About",
      subName: "",
      component: Home,
    },
    {
      layout: "/dev",
      path: "",
      icon: computerIcon,
      name: "Development",
      subName: "",
      component: null,
    },
    {
      layout: "/dev",
      path: "/java",
      icon: computerIcon,
      name: "Development",
      subName: "Java",
      component: null,
    },
    {
      layout: "/dev",
      path: "/golang",
      icon: computerIcon,
      name: "Development",
      subName: "Go Lang",
      component: null,
    },
    {
      layout: "/dev",
      path: "/front-end",
      icon: computerIcon,
      name: "Development",
      subName: "Front-End",
      component: null,
    },
    {
      layout: "/dev",
      path: "/dbms",
      icon: computerIcon,
      name: "Development",
      subName: "DMBS",
      component: null,
    },
    {
      layout: "/dev",
      path: "/os",
      icon: computerIcon,
      name: "Development",
      subName: "OS",
      component: null,
    },
    {
      layout: "/dev",
      path: "/architecture",
      icon: computerIcon,
      name: "Development",
      subName: "Architecture",
      component: null,
    },
    {
      layout: "/dev",
      path: "/common",
      icon: computerIcon,
      name: "Development",
      subName: "Common",
      component: null,
    },
    {
      layout: "/music",
      path: "/krHiphop",
      icon: headsetIcon,
      name: "Music",
      subName: "힙합",  
      component: null,
    },
    {
      layout: "/music",
      path: "/hiphop",
      icon: headsetIcon,
      name: "Music",
      subName: "Hiphop",  
      component: null,
    },
    {
      layout: "/music",
      path: "/r&b",
      icon: headsetIcon,
      name: "Music",
      subName: "R&B",  
      component: null,
    },
    {
      layout: "/music",
      path: "/pop",
      icon: headsetIcon,
      name: "Music",
      subName: "Pop",  
      component: null,
    },
    {
      layout: "/recipe",
      path: "",
      icon: restaurantIcon,
      name: "Recipe",
      subName: "",  
      component: null,
    },
  ];

export default routesCollection;