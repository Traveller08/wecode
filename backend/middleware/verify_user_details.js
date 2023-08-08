import { validate } from "deep-email-validator";

export const verifyUserDetails = async (req, res, next) => {
  const { firstName, lastName, username, password, codeforcesHandle } =
    req.body;
  // console.log("Req body verifyUserDetails: " , req.body);
  if (
    username.includes("--") ||
    password.includes("--") ||
    firstName.includes("--") ||
    lastName.includes("--") ||
    codeforcesHandle.includes("--")
  ) {
    return res.status(403).send({ message: "invalid credentials" });
  }
  console.log("Req body verifyUserDetails 2 : ", req.body);
  try {
    const email_verification_result = await validate(username);
    if (!email_verification_result.valid) {
      return res.status(401).send({ message: "Invalid email" });
    }
  } catch (error) {
    return res.status(501).send({ message: "Internal server error" });
  }
  // console.log("Req body verifyUserDetails 3: " , req.body);
  next();
};
