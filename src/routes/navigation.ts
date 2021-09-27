import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
const HomePageComponent = lazy(() => import('../views/HomePage'));
const ExamPageComponent = lazy(() => import('../views/ExamPage'));
const MenuMobliePageComponent = lazy(() => import('../views/MenuMobliePage'));
const NoMatchPageComponent = lazy(() => import('../views/NoMatchPage'));

const navigation: RouteProps[] =  [
  {
    path: '/',
    exact: true,
    component: HomePageComponent
  },
  {
    path: [
      '/on-tap-cau-sai.html',
      '/thi-sat-hach-de-so-(\\d).html',
      '/hoc-ly-thuyet-chu-de-([a-z-]+).html'
    ],
    exact: true,
    component: ExamPageComponent
  },
  {
    path: [
      '/thi-sat-hach.html',
      '/hoc-ly-thuyet.html'
    ],
    exact: true,
    component: MenuMobliePageComponent
  },
  {
    path: '*',
    component: NoMatchPageComponent
  }
]

export default navigation;
