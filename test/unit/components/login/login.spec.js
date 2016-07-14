import chai from "chai";

import LoginModule from '../../../../src/public/components/login/login';
import LoginComponent from '../../../../src/public/components/login/login.component';
import LoginController from '../../../../src/public/components/login/login.controller';
import LoginTemplate from '../../../../src/public/components/login/login.html';

var assert = chai.assert;

describe('Login', () => {
  let makeController;

  beforeEach(window.module(LoginModule.name));  // eslint-disable-line
  beforeEach(inject(() => {
    makeController = () => {
      return new LoginController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property', () => { // erase if removing this.name from the controller
      let controller = makeController();
      assert.property(controller, "name");

    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has form in template', () => {
      assert.match(LoginTemplate, /\s?\<form\s?/g);
    });
  });


  describe('Component', () => {
    // component/directive specs
    let component = LoginComponent;

    it('includes the intended template',() => {
      assert.equal(component.template, LoginTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      assert.property(component, "controllerAs");
    });

    it('invokes the right controller', () => {
      assert.equal(component.controller, LoginController);
    });
  });

});
