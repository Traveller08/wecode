export const verifyLoginDetails = (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (toString(username).includes("--") || password.includes("--")) {
    return res.status(403).send({ message: "invalid credentials" });
  }
  next();
};
