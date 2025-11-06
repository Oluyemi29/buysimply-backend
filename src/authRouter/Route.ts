import express from "express";
import {
  DeleteLoan,
  GetallExpredLoan,
  GetallLoan,
  GetSingleUSerLoan,
  Login,
  Logout,
} from "../authController/Controller";
import {
  IsActive,
  ProtectedRoute,
  SuperAdminProtectedRoute,
} from "../middleware";

const authRouter = express.Router();

authRouter.post("/login", Login);
authRouter.get("/isactive", IsActive);
authRouter.get("/loans", ProtectedRoute, GetallLoan);
authRouter.get("/expiredloans", ProtectedRoute, GetallExpredLoan);
authRouter.get("/loans/:userEmail", ProtectedRoute, GetSingleUSerLoan);
authRouter.delete("/deleteloan", SuperAdminProtectedRoute, DeleteLoan);
authRouter.delete("/logout", ProtectedRoute, Logout);
export default authRouter;
