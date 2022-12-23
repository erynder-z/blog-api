"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRoute = void 0;
const express_1 = require("express");
exports.defaultRoute = (0, express_1.Router)();
exports.defaultRoute.get('/api', (req, res) => {
    res.send('blog startpage');
});
exports.defaultRoute.post('/api', (req, res) => {
    res.send(req.body);
});
