// import validator from 'deep-email-validator';
import { validate } from "deep-email-validator";

export const verifyUserDetails = async (req, res, next) => {
  const { firstName, lastName, username, password, codeforcesHandle } =
    req.body;
  console.log(req.body);
  if (
    username.includes("--") ||
    password.includes("--") ||
    firstName.includes("--") ||
    lastName.includes("--") ||
    codeforcesHandle.includes("--")
  ) {
    return res.status(403).send({ message: "invalid credentials" });
  }
  try {
    const email_verification_result = await validate(username);
    if (!email_verification_result.valid) {
      return res.status(401).send({ message: "Invalid email" });
    }
  } catch (error) {
    return res.status(501).send({ message: "Internal server error" });
  }
  next();
};
