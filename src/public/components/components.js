import angular from 'angular';
import Dashboard from './dashboard/dashboard';
import Home from './home/home';
import Login from './login/login';


export default angular.module('app.components', [
  Dashboard.name,
  Login.name,
  Home.name
]);
