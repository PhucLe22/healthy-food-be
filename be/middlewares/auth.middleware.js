import { verifyToken } from "../config/jwt.config.js";

export function authenticationMiddleware(req, res, next) {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "You need to login to access this feature!",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);

    req.user = payload;

    next();
  } catch (err) {
    const message =
      err.name === "TokenExpiredError"
        ? "Your session has expired, please login again."
        : "Authentication failed.";

    return res.status(401).json({
      success: false,
      message,
    });
  }
}
export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "You need to login to access this feature!",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this feature!",
      });
    }

    next();
  };
}