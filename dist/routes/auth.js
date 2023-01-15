"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
const login_controller_1 = require("../controllers/login_controller");
exports.authRoute = (0, express_1.Router)();
exports.authRoute.post('/api/login', login_controller_1.login_post);
exports.authRoute.get('/api/check-token', login_controller_1.check_token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3JvdXRlcy9hdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFDQUFpQztBQUNqQyxzRUFBMEU7QUFFN0QsUUFBQSxTQUFTLEdBQUcsSUFBQSxnQkFBTSxHQUFFLENBQUM7QUFFbEMsaUJBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLDZCQUFVLENBQUMsQ0FBQztBQUV6QyxpQkFBUyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSw4QkFBVyxDQUFDLENBQUMifQ==