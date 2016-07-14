import angular from 'angular';
import dashboardComponent from './dashboard.component';

let dashboardModule = angular.module('dashboard', [])

.component('dashboard', dashboardComponent);

export default dashboardModule;
