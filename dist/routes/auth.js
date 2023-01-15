"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth_controller");
exports.authRoute = (0, express_1.Router)();
exports.authRoute.post('/api/login', auth_controller_1.login_post);
exports.authRoute.get('/api/check-token', auth_controller_1.check_token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3JvdXRlcy9hdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFDQUFpQztBQUNqQyxvRUFBeUU7QUFFNUQsUUFBQSxTQUFTLEdBQUcsSUFBQSxnQkFBTSxHQUFFLENBQUM7QUFFbEMsaUJBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLDRCQUFVLENBQUMsQ0FBQztBQUV6QyxpQkFBUyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSw2QkFBVyxDQUFDLENBQUMifQ==