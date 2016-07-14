import angular from 'angular';
import Header from './header/header';
import Footer from './footer/footer';
import Navbar from './navbar/navbar';

export default angular.module('app.common', [
  Header.name,
  Footer.name,
  Navbar.name
]);
