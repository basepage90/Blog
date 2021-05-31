import CardListPage from 'pages/CardListPage';

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
      categoryLg: "/",
      categoryMd: "",
      icon: homeIcon,
      name: "Home",
      subName: "",
      component: CardListPage,
    },
    {
      categoryLg: "/about",
      categoryMd: "/about",
      icon: faceIcon,
      name: "About",
      subName: "",
      component: CardListPage,
    },
    {
      categoryLg: "/dev",
      categoryMd: "/java",
      icon: computerIcon,
      name: "Development",
      subName: "Java",
      component: null,
    },
    {
      categoryLg: "/dev",
      categoryMd: "/golang",
      icon: computerIcon,
      name: "Development",
      subName: "Go Lang",
      component: null,
    },
    {
      categoryLg: "/dev",
      categoryMd: "/front-end",
      icon: computerIcon,
      name: "Development",
      subName: "Front-End",
      component: null,
    },
    {
      categoryLg: "/dev",
      categoryMd: "/dbms",
      icon: computerIcon,
      name: "Development",
      subName: "DMBS",
      component: null,
    },
    {
      categoryLg: "/dev",
      categoryMd: "/os",
      icon: computerIcon,
      name: "Development",
      subName: "OS",
      component: null,
    },
    {
      categoryLg: "/dev",
      categoryMd: "/architecture",
      icon: computerIcon,
      name: "Development",
      subName: "Architecture",
      component: null,
    },
    {
      categoryLg: "/dev",
      categoryMd: "/common",
      icon: computerIcon,
      name: "Development",
      subName: "Common",
      component: null,
    },
    {
      categoryLg: "/music",
      categoryMd: "/krHiphop",
      icon: headsetIcon,
      name: "Music",
      subName: "힙합",  
      component: CardListPage,
    },
    {
      categoryLg: "/music",
      categoryMd: "/hiphop",
      icon: headsetIcon,
      name: "Music",
      subName: "Hiphop",  
      component: null,
    },
    {
      categoryLg: "/music",
      categoryMd: "/r&b",
      icon: headsetIcon,
      name: "Music",
      subName: "R&B",  
      component: null,
    },
    {
      categoryLg: "/music",
      categoryMd: "/pop",
      icon: headsetIcon,
      name: "Music",
      subName: "Pop",  
      component: null,
    },
    {
      categoryLg: "/recipe/recipe",
      categoryMd: "",
      icon: restaurantIcon,
      name: "Recipe",
      subName: "",  
      component: null,
    },
  ];

export default routesCollection;