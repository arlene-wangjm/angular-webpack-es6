# StaticFile

Security site
===============

***... A work in progress***

This codebase is intended to deliver a working web UI application, as part of the Security revamp project.

Installation
------------

        $ git https://code.ap.fid-intl.com/gitblit/summary/hk-fidelity-online%2Fhk-fidelity-online-secure.git
        $ cd hk-fidelity-online-secure
        $ npm install

Note: This has been built on a windows box. It should work on a Mac - but may need some "mucking about".

Running the app
---------------

        $ gulp


Running the app for development
-------------------------------

Each of these commands need to be executed in a seperate terminal window

To run the app (as above):

        $ gulp dev

To execute any unit tests in your project and reload on changes, do:

        $ gulp test:unit       

Technologies
------------

The client codebase utilises the following:

+ Javascript ES6 / ES2015 (Javascript foo) : https://github.com/lukehoban/es6features/blob/master/README.md
+ Node JS (more Javascript foo) : https://nodejs.org/en/
+ npm (node package managment) : http://npmjs.org/
+ Babel (to convert from ES6 to releasable ES5 code) : https://babeljs.io/docs/learn-es2015/
+ Webpack (to manage modules / Javascript dependencies) : https://webpack.github.io/
+ Zurb Foundation (for Sass / CSS) : http://foundation.zurb.com/
+ Karma (for unit tests runner) 
+ Mocha (for unit test)
+ Chai(assert for unit test) : http://chaijs.com/api/bdd/
+ ispartar(code coverage) : https://github.com/douglasduteil/isparta
+ Protractor (e2e testing) : not work, can't install chromedriver.exe
+ Express.js (node server, remove angualr hashbang#)

- There are some other plugins ... look them up from the package.json :)


Client side security
--------------------
TODO


App source structure
--------------------

The application source code structure is something like this:

     |-dist.....................[where our releasable bundle goes]
     |-src .....................[this is where all our code goes]
     |----public ...............[]
     |------fonts
     |------images .............[]
     |------common
     |------components .........[]
     |------sass ...............[]
     |-test ....................[put all our tests in here]
     |----helpers...............[test helpers]
     |----unit
     |----e2e
     |-coverage.................[code coverage]




Win.



--


angularjs code style follow:
https://github.com/mgechev/angularjs-style-guide/blob/master/README-zh-cn.md

