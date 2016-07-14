var express = require('express');
var apiProxyRouter = express.Router();
var JsonSerialize;

JsonSerialize = function JsonSerialize(jsonString) {
    if (typeof jsonString !== 'string' && typeof jsonString !== 'object') {
        throw new Error('JsonSerialize error: couldn\'t serialize', jsonString);
    }

    if (typeof jsonString === 'string') {
        return JSON.parse(jsonString);
    }

    if (typeof jsonString === 'object') {
        return jsonString;
    }
}

apiProxyRouter.post('/login', (req, res) => {

    res.json({message: 'login', __stub: true});

});

apiProxyRouter.post('/register', (req, res) => {

    res.json({
        "name":"Arlene wang"
    });
});

module.exports = apiProxyRouter;
