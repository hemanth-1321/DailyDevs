import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  console.log("cookie", req.cookies);
  console.log("token", req.cookies.token);
  console.log("cookie", req.body);

  if (!token) {
    res.status(401).json({
      error: "unAuthorized ",
    });
    return;
  }
  console.log("recieved token", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
      id: string;
      email: string;
    };

    req.user = decoded;
    console.log("token", req.user);
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
    return;
  }
};
