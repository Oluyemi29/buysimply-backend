import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

type UserDatas = {
  id: number;
  name: string;
  email: string;
  role: string;
  password: string | undefined;
}[];

type LoanDataProps = {
  id: number;
  amount: string;
  maturityDate: string;
  status: string;
  applicant:
    | {
        name: string;
        email: string;
        telephone: string;
        totalLoan: string;
      }
    | undefined;
  createdAt: "2024-01-25 14:27:37";
}[];

const usersPath = path.join(__dirname, "./../data", "staffs.json");
const loanPath = path.join(__dirname, "./../data", "loans.json");
const usersData = JSON.parse(fs.readFileSync(usersPath, "utf8")) as UserDatas;
const loansData = JSON.parse(
  fs.readFileSync(loanPath, "utf8")
) as LoanDataProps;

export const Login = async (req: Request, res: Response) => {
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
      return (
        eachStaff.email === email && eachStaff.password?.toString() === password
      );
    });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }
    console.log(user);

    const comfirmPassword = user.password === password.toString();
    if (!comfirmPassword) {
      return res.status(400).send({
        success: false,
        message: "incorrect password",
      });
    }
    user.password = undefined;
    if (user) {
      const token = jwt.sign(
        { id: user.id },
        process.env.SECRET_KEY as string,
        { expiresIn: "7d" }
      );
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
    } else {
      return res.status(400).send({
        success: false,
        message: "An error occured",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "an error occured",
    });
  }
};

export const Logout = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "an error occured",
    });
  }
};

export const GetallLoan = (req: Request, res: Response) => {
  try {
    const allLoan = loansData;
    console.log(allLoan);

    return res.status(200).send({
      success: true,
      message: "loan data goten",
      data: allLoan,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "an error occured",
    });
  }
};
export const GetallExpredLoan = (req: Request, res: Response) => {
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
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "an error occured",
    });
  }
};

export const GetSingleUSerLoan = (req: Request, res: Response) => {
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
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "an error occured",
    });
  }
};

export const DeleteLoan = (req: Request, res: Response) => {
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
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "an error occured",
    });
  }
};
