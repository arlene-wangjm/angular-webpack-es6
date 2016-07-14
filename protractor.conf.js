//NOT WORK
//reference to
//http://www.ng-newsletter.com/posts/practical-protractor.html
//https://github.com/lmk123/blog/issues/10

// node ./node_modules/protractor/bin/webdriver-manager update
// node ./node_modules/protractor/bin/webdriver-manager start
//not work, download chromeDriver and selenium-server, but chromeDriver can't extract,don't know why
exports.config = {
  chromeDriver: './node_modules/protractor/selenium/chromedriver',
  seleniumAddress: 'http://localhost:1234/wd/hub',
  specs: ['test/e2e/**/*.js']
};