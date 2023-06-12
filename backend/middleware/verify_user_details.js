export const verifyUserDetails = (req, res, next) => {
    const { firstName, lastName, username, password } = req.body;
    if (!firstName || !lastName || !username || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    next();
  };