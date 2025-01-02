import jwt from "jsonwebtoken";

export const protectedRouteMiddleware = async (req, res, next) => {
  try {
    console.log("Cookies: ", req.cookies);
    const  token  = req.cookies?.token;

    //VALIDATION
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "UNAUTHORIZED - NO TOKEN PROVIDED",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETE);

    //VALIDATION
    if (!decoded) {
      return res.status(401).send({
        success: false,
        message: "UNAUTHORIZED - INVALID TOKEN",
      });
    }

    req.userid = decoded.userid;
    next();
  } catch (error) {
    console.log(`ERROR IN PROTECTED ROUTE ACESESS MIDLEWARE`, error);
    res.status(500).send({
      success: false,
      message: "ERROR IN PROTECTED ROUTE ACESESS MIDLEWARE",
    });
  }
};
