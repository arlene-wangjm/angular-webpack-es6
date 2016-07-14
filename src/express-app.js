var express = require('express');
var http = require('http');
var app = express();
//var bodyParser = require('body-parser');
var apiProxyRouter = require('./routers/api-proxy');
var webAppRouter = require('./routers/web-app');
var path = require('path');

//process.env.ENV_NAME = process.env.ENV_NAME || 'local';
//app.locals.config = require(`./properties.${process.env.ENV_NAME}.json`);

console.log(`APP STARTED \n********* ******* \n with the following config : \n ${JSON.stringify(app.locals.config, 4, 4)} \n`);

app.use(express.static('./dist'));

//app.use(bodyParser.json()); // for parsing application/json
app.set('port', process.env.PORT || 1337);

app.use(apiProxyRouter);
app.use(webAppRouter);

app.listen(process.env.PORT || 1337);

console.log('Express server listening on port ' + app.get('port'));

module.exports = app;
