const jwt = require("jsonwebtoken");

module.exports = authentication = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  try {
    if (token) {
      const decoded = jwt.verify(token, "hush");
      if (decoded) {
        const userId = decoded.userId;
        req.body.userId = userId;
        next();
      } else {
        res.send({ err: "Login failed" });
      }
    } else {
      res.send({ err: "Login failed" });
    }
  } catch (error) {
    res.send({ err: "Something went wrong" });
  }
};
