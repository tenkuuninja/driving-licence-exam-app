import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
const HomePageComponent = lazy(() => import('../views/HomePage'));
const ExamPageComponent = lazy(() => import('../views/ExamPage'));
const SignalPageComponent = lazy(() => import('../views/SignalPage'));
const LawPageComponent = lazy(() => import('../views/LawPage'));
const Law1002019PageComponent = lazy(() => import('../views/Law1002019Page'));
const MenuMobliePageComponent = lazy(() => import('../views/MenuMobliePage'));
const TrickPageComponent = lazy(() => import('../views/TrickPage'));
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
    path: '/bien-bao-giao-thong.html',
    exact: true,
    component: SignalPageComponent
  },
  {
    path: '/luat-duong-bo.html',
    exact: true,
    component: LawPageComponent
  },
  {
    path: '/can-cu-phap-ly.html',
    exact: true,
    component: Law1002019PageComponent
  },
  {
    path: '/meo-thi-ket-qua-cao.html',
    exact: true,
    component: TrickPageComponent
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
    component: NoMatchPageComponent
  }
]

export default navigation;
