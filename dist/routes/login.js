"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoute = void 0;
const express_1 = require("express");
exports.loginRoute = (0, express_1.Router)();
exports.loginRoute.get('/api/login', (req, res) => {
    res.send('HELLO FROM login');
});
exports.loginRoute.post('/api/login', (req, res) => {
    res.send(req.body);
});
