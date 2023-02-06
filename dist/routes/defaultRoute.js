"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRoute = void 0;
const express_1 = require("express");
exports.defaultRoute = (0, express_1.Router)();
let API_CALLS = 0;
exports.defaultRoute.get('/api/*', (req, res) => {
    API_CALLS + 1;
    console.log(API_CALLS);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdFJvdXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vcm91dGVzL2RlZmF1bHRSb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBaUM7QUFFcEIsUUFBQSxZQUFZLEdBQUcsSUFBQSxnQkFBTSxHQUFFLENBQUM7QUFDckMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLG9CQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUN0QyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQyJ9