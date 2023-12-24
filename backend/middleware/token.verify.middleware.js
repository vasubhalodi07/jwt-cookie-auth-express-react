const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res
      .status(403)
      .send({ message: "Unauthorized: Token not provided" });
  }

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Token Expired" });
      }
      return res.status(500).send({ message: "Internal Server Error" });
    }

    req.userId = decoded._id;
    next();
  });
};

module.exports = verifyToken;
