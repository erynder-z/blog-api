"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoute = void 0;
const express_1 = require("express");
const login_controller_1 = require("../controllers/login_controller");
exports.loginRoute = (0, express_1.Router)();
exports.loginRoute.post('/api/login', login_controller_1.login_post);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9yb3V0ZXMvbG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscUNBQWlDO0FBQ2pDLHNFQUE2RDtBQUVoRCxRQUFBLFVBQVUsR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztBQUVuQyxrQkFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsNkJBQVUsQ0FBQyxDQUFDIn0=