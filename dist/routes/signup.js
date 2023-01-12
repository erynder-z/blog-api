"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRoute = void 0;
const express_1 = require("express");
const signup_controller_1 = __importDefault(require("../controllers/signup_controller"));
exports.signupRoute = (0, express_1.Router)();
exports.signupRoute.post('/api/signup', signup_controller_1.default);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vcm91dGVzL3NpZ251cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxxQ0FBaUM7QUFDakMseUZBQXNEO0FBRXpDLFFBQUEsV0FBVyxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO0FBRXBDLG1CQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSwyQkFBTSxDQUFDLENBQUMifQ==