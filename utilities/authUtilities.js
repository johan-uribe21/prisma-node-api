import njwt from "njwt";
import * as userCrud from "../controllers/user/user.crud";

export function verifyAuthenticated(req, res, next) {
  if (req.user) {
    console.log("user is authenticated");
    next();
  } else {
    res.status(403).json({ error: "User is not authenticated" });
  }
}

const { APP_SECRET } = process.env;

export function encodeToken(tokenData) {
  return njwt.create(tokenData, APP_SECRET).compact();
}

export function verifyAndDecode(token) {
  return njwt.verify(token, APP_SECRET).body;
}

/**
 * Express middleware - attaches a user object to req if a valid jwt is included in the `Authorization` header
 * @param req - Request object
 * @param res - Response object
 */
export const jwtAuthMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")
    ? req.header("Authorization").split(" ")[1]
    : null;
  if (!token) {
    return next();
  }

  try {
    const userClaims = verifyAndDecode(token);
    const user = await userCrud.readById(userClaims.userId);

    if (user) {
      req.user = user;
    }
  } catch (e) {
    return next();
  }

  next();
};

/**
 * Response controller for a successfull login
 * @param req - Request object
 * @param res - Response object
 */
export function jwtSuccessfulLogin(req, res) {
  const user = req.user;
  const accessToken = encodeToken({ userId: user.id });
  user.accessToken = accessToken;
  res.json(user);
}
