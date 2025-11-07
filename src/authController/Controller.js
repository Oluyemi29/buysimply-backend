"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteLoan = exports.GetSingleUSerLoan = exports.GetallExpredLoan = exports.GetallLoan = exports.Logout = exports.Login = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersPath = path_1.default.join(__dirname, "./../data", "staffs.json");
const loanPath = path_1.default.join(__dirname, "./../data", "loans.json");
const usersData = JSON.parse(fs_1.default.readFileSync(usersPath, "utf8"));
const loansData = JSON.parse(fs_1.default.readFileSync(loanPath, "utf8"));
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "All field are reuired",
            });
        }
        // checking is user already exist
        const user = usersData.find((eachStaff) => {
            return eachStaff.email === email;
        });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User not found",
            });
        }
        const comfirmPassword = user.password === password;
        if (!comfirmPassword) {
            return res.status(400).send({
                success: false,
                message: "incorrect password",
            });
        }
        if (user) {
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "7d" });
            res.cookie("buysimply", token, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });
            return res.status(200).send({
                success: true,
                message: "User registered successfully",
                data: user,
                token: token,
            });
        }
        else {
            return res.status(400).send({
                success: false,
                message: "An error occured",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "an error occured",
        });
    }
};
exports.Login = Login;
const Logout = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).send({
                success: false,
                message: "All field are reuired",
            });
        }
        // checking is user exist
        const user = usersData.find((eachStaff) => {
            return eachStaff.id === userId;
        });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "unauthorise access",
            });
        }
        // clearing cookies
        res.clearCookie("buysimply", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        return res.status(200).send({
            success: true,
            message: "Logout successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "an error occured",
        });
    }
};
exports.Logout = Logout;
const GetallLoan = (req, res) => {
    try {
        const allLoan = loansData;
        console.log(allLoan);
        return res.status(200).send({
            success: true,
            message: "loan data goten",
            data: allLoan,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "an error occured",
        });
    }
};
exports.GetallLoan = GetallLoan;
const GetallExpredLoan = (req, res) => {
    try {
        const allLoan = loansData.filter((eachloan) => {
            const now = new Date();
            return new Date(eachloan.maturityDate) < now;
        });
        console.log(allLoan);
        return res.status(200).send({
            success: true,
            message: "loan data goten",
            data: allLoan,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "an error occured",
        });
    }
};
exports.GetallExpredLoan = GetallExpredLoan;
const GetSingleUSerLoan = (req, res) => {
    try {
        const { userEmail } = req.params;
        const userLoanData = loansData.filter((eachloan) => {
            return eachloan.applicant?.email === userEmail;
        });
        return res.status(200).send({
            success: true,
            message: "loan data goten",
            data: userLoanData,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "an error occured",
        });
    }
};
exports.GetSingleUSerLoan = GetSingleUSerLoan;
const DeleteLoan = (req, res) => {
    try {
        const { loanId } = req.body;
        const userLoanData = loansData.filter((eachloan) => {
            return eachloan.id !== loanId;
        });
        return res.status(200).send({
            success: true,
            message: "deleted",
            data: userLoanData,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "an error occured",
        });
    }
};
exports.DeleteLoan = DeleteLoan;
//# sourceMappingURL=Controller.js.map