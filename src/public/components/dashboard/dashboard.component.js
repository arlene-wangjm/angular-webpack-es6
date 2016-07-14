import template from './dashboard.html';
import controller from './dashboard.controller';

let dashboardComponent = {
  restrict: 'E',
  scope: {},
  template,
  controller,
  controllerAs: 'vm',
  bindToController: true
};

export default dashboardComponent;
