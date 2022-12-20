"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
exports.userRoute = (0, express_1.Router)();
exports.userRoute.get('/user', (req, res) => {
    res.send('HELLO FROM userroute');
});
exports.userRoute.post('/user', (req, res) => {
    res.send(req.body);
});
