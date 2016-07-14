import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import globalVar from './global';
import routerConfig from './router';

angular.module('myApp', [
  uiRouter,
  Common.name,
  Components.name
])
.config(routerConfig);

