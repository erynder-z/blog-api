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
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const http_errors_1 = __importDefault(require("http-errors"));
const bodyParser = __importStar(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const routes_1 = require("./routes");
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const passport_1 = __importDefault(require("passport"));
const passport_config_1 = require("./configs/passport-config");
const mongodb_1 = require("./configs/mongodb");
const app = (0, express_1.default)();
dotenv.config();
(0, mongodb_1.initializeMongoDB)();
(0, passport_config_1.initializePassport)();
app.use((0, cors_1.default)({
    origin: process.env.CORS_ACCESS,
}));
console.log(process.env.CORS_ACCESS);
app.use(passport_1.default.initialize());
app.use(bodyParser.json());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use('/', routes_1.routes);
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
app.use(error_middleware_1.default);
app.listen(process.env.PORT, () => {
    console.log(`now listening on port ${process.env.PORT}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQTRFO0FBQzVFLCtDQUFpQztBQUNqQyw4REFBc0M7QUFDdEMsd0RBQTBDO0FBQzFDLG9EQUE0QjtBQUM1QixrRUFBeUM7QUFDekMsZ0RBQXdCO0FBQ3hCLGdEQUF3QjtBQUN4QixvREFBNEI7QUFDNUIsOERBQXNDO0FBQ3RDLHFDQUFrQztBQUNsQyxxRkFBNEQ7QUFDNUQsd0RBQWdDO0FBQ2hDLCtEQUErRDtBQUMvRCwrQ0FBc0Q7QUFFdEQsTUFBTSxHQUFHLEdBQVksSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFDL0IsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhCLElBQUEsMkJBQWlCLEdBQUUsQ0FBQztBQUNwQixJQUFBLG9DQUFrQixHQUFFLENBQUM7QUFFckIsR0FBRyxDQUFDLEdBQUcsQ0FDTCxJQUFBLGNBQUksRUFBQztJQUNILE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVc7Q0FDaEMsQ0FBQyxDQUNILENBQUM7QUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxrQkFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7QUFDL0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUMzQixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsZ0JBQU0sRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2pELEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSx1QkFBWSxHQUFFLENBQUMsQ0FBQztBQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsTUFBTSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsZ0JBQU0sR0FBRSxDQUFDLENBQUM7QUFDbEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLHFCQUFXLEdBQUUsQ0FBQyxDQUFDO0FBRXZCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGVBQU0sQ0FBQyxDQUFDO0FBRXJCLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO0lBQy9ELElBQUksQ0FBQyxJQUFBLHFCQUFXLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsMEJBQWUsQ0FBQyxDQUFDO0FBRXpCLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO0lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUMzRCxDQUFDLENBQUMsQ0FBQyJ9