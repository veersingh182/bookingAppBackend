import Jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const Token = req.cookies.access_token;
  if (!Token) return next(createError(401, "you are not authenticated!!!"));

  Jwt.verify(Token, process.env.JWT, (err, UserDecodedInfo) => {
    if (err) return next(createError(403, "Invalid Token!"));
    req.user = UserDecodedInfo;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user._id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      next(createError(403, "you are not authorized."));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      next(createError(403, "you are not autherised."));
    }
  });
};
