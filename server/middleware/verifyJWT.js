const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  console.log("Auth Header:", req.headers.authorization || req.headers.Authorization);
  console.log("Cookies received: ", req?.cookies);
  // Try to extract the token from the Authorization header
  const authHeader = req.headers.authorization || req.headers.Authorization;
  let token;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
    console.log("Access token from header:", token);
  }
  else if (req?.cookies?.accessToken) {
      token = req.cookies.accessToken;
      console.log("Access token from cookie:", token);
  }else{
    console.log("No token provided");
    return res.sendStatus(401);
  }
  // If no token is found, return a 401 Unauthorized
  if (!token) {
    console.log("No token provided");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res.sendStatus(403);
    }
    // Attach the user data to the request object for use in next middlewares/routes
    req.id = decoded.UserInfo.id;
    req.email = decoded.UserInfo.email;
    req.roles = decoded.UserInfo.roles;
    // Token is valid – proceed to the next middleware
    next();
  });
};

module.exports = verifyJWT;
