import template from './login.html';
import controller from './login.controller';

let loginComponent = {
  restrict: 'E',
  scope: {},
  template,
  controller,
  controllerAs: 'vm',
  bindToController: true
};

export default loginComponent;
