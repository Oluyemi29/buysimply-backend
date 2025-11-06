"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controller_1 = require("../authController/Controller");
const middleware_1 = require("../middleware");
const authRouter = express_1.default.Router();
authRouter.post("/login", Controller_1.Login);
authRouter.get("/isactive", middleware_1.IsActive);
authRouter.get("/loans", middleware_1.ProtectedRoute, Controller_1.GetallLoan);
authRouter.get("/expiredloans", middleware_1.ProtectedRoute, Controller_1.GetallExpredLoan);
authRouter.get("/loans/:userEmail", middleware_1.ProtectedRoute, Controller_1.GetSingleUSerLoan);
authRouter.delete("/deleteloan", middleware_1.SuperAdminProtectedRoute, Controller_1.DeleteLoan);
authRouter.delete("/logout", middleware_1.ProtectedRoute, Controller_1.Logout);
exports.default = authRouter;
//# sourceMappingURL=Route.js.map