"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRoute = void 0;
const express_1 = require("express");
const signup_controller_1 = require("../controllers/signup_controller");
exports.signupRoute = (0, express_1.Router)();
exports.signupRoute.post('/api/signup', signup_controller_1.signup_post);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vcm91dGVzL3NpZ251cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBaUM7QUFDakMsd0VBQStEO0FBRWxELFFBQUEsV0FBVyxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO0FBRXBDLG1CQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSwrQkFBVyxDQUFDLENBQUMifQ==