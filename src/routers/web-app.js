var app,
    express,
    path,
    pjson,
    webAppRouter;

express = require('express');
path = require('path');
pjson = require('../../package.json');
webAppRouter = express.Router();

webAppRouter.get([
    '/', '/login', '/dashboard', '/home'
], (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

webAppRouter.get(['/discover'], (req, res) => {
    res.set('Content-Type', 'application/json');
    res.json(req.app.locals.config);
})

module.exports = webAppRouter