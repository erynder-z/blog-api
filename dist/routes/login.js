"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
const login_controller_1 = require("../controllers/login_controller");
exports.authRoute = (0, express_1.Router)();
exports.authRoute.post('/api/login', login_controller_1.login_post);
exports.authRoute.get('/api/check-token', login_controller_1.check_token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9yb3V0ZXMvbG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscUNBQWlDO0FBQ2pDLHNFQUEwRTtBQUU3RCxRQUFBLFNBQVMsR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztBQUVsQyxpQkFBUyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsNkJBQVUsQ0FBQyxDQUFDO0FBRXpDLGlCQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLDhCQUFXLENBQUMsQ0FBQyJ9