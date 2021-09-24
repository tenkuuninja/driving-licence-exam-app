import { RouteProps } from 'react-router-dom';
import HomePage from '../views/HomePage';
// import LoginPage from 'views/LoginPage';
// import RegisterPage from 'views/RegisterPage';

interface RouteCustomProps extends RouteProps {
  guard?: string
}

const navigation: RouteCustomProps[] =  [
  {
    path: '/',
    exact: true,
    component: HomePage,
    guard: 'none'
  },
  // {
  //   path: '/dang-nhap.html',
  //   exact: true,
  //   component: LoginPage,
  //   guard: 'none'
  // },
  // {
  //   path: '/dang-ky-tai-khoan.html',
  //   exact: true,
  //   component: RegisterPage,
  //   guard: 'none'
  // }
]

export default navigation;
