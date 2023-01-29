"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const initializeMongoDB = () => {
    const mongoDB = `${process.env.MONGODB_URI}`;
    mongoose_1.default.set('strictQuery', false);
    mongoose_1.default.connect(mongoDB);
    const db = mongoose_1.default.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    process.on('SIGINT', () => {
        db.close(() => {
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });
    });
};
exports.initializeMongoDB = initializeMongoDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29kYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbmZpZ3MvbW9uZ29kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3REFBZ0M7QUFFekIsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLEVBQUU7SUFDcEMsTUFBTSxPQUFPLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRTdDLGtCQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuQyxrQkFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQixNQUFNLEVBQUUsR0FBRyxrQkFBUSxDQUFDLFVBQVUsQ0FBQztJQUMvQixFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsMkJBQTJCLENBQUMsQ0FBQyxDQUFDO0lBRXpFLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtRQUN4QixFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsbURBQW1ELENBQUMsQ0FBQztZQUNqRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFkVyxRQUFBLGlCQUFpQixxQkFjNUIifQ==