"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagRoute = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const tag_controller = __importStar(require("../controllers/tag_controller"));
exports.tagRoute = (0, express_1.Router)();
exports.tagRoute.get('/api/tags', tag_controller.show_all_tags);
exports.tagRoute.get('/api/tag/:id', tag_controller.show_tag_detail);
exports.tagRoute.post('/api/create_tag', passport_1.default.authenticate('jwt', { session: false }), tag_controller.create_tag);
exports.tagRoute.delete('/api/tag/:id/delete', passport_1.default.authenticate('jwt', { session: false }), tag_controller.create_tag);
exports.tagRoute.put('/api/tag/:id/update', passport_1.default.authenticate('jwt', { session: false }), tag_controller.update_tag);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vcm91dGVzL3RhZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHFDQUFpQztBQUNqQyx3REFBZ0M7QUFDaEMsOEVBQWdFO0FBRW5ELFFBQUEsUUFBUSxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO0FBRWpDLGdCQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFeEQsZ0JBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUU3RCxnQkFBUSxDQUFDLElBQUksQ0FDWCxpQkFBaUIsRUFDakIsa0JBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQ2hELGNBQWMsQ0FBQyxVQUFVLENBQzFCLENBQUM7QUFFRixnQkFBUSxDQUFDLE1BQU0sQ0FDYixxQkFBcUIsRUFDckIsa0JBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQ2hELGNBQWMsQ0FBQyxVQUFVLENBQzFCLENBQUM7QUFFRixnQkFBUSxDQUFDLEdBQUcsQ0FDVixxQkFBcUIsRUFDckIsa0JBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQ2hELGNBQWMsQ0FBQyxVQUFVLENBQzFCLENBQUMifQ==