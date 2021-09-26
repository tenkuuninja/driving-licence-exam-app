import { RouteProps } from 'react-router-dom';
import HomePage from '../views/HomePage';
import ExamPage from '../views/ExamPage';
import MenuMobliePage from '../views/MenuMobliePage';
import NoMatchPage from '../views/NoMatchPage';

const navigation: RouteProps[] =  [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: [
      '/on-tap-cau-sai.html',
      '/thi-sat-hach-de-so-(\\d).html',
      '/hoc-ly-thuyet-chu-de-([a-z-]+).html'
    ],
    exact: true,
    component: ExamPage
  },
  {
    path: [
      '/thi-sat-hach.html',
      '/hoc-theo-chu-de.html'
    ],
    exact: true,
    component: MenuMobliePage
  },
  {
    path: '*',
    component: NoMatchPage
  }
]

export default navigation;
