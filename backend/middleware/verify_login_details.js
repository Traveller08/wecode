export const verifyLoginDetails = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.send({ message: 'Please provide both username and password' });
    }
    next();
  };
  