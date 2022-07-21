import { Request, Response, NextFunction } from "express";

const verifyUserIsAdmMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.data.adm) {
    return res.status(403).json({
      message: "Needs admin permission to access",
    });
  }

  next();
};

export default verifyUserIsAdmMiddleware;
