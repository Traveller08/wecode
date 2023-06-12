export const verifyHistoricalDetails = (req, res, next) => {
    const { symbol, from_date, to_date } = req.body;
    if (!symbol, !from_date, !to_date) {
      return res.send({ message: 'Please provide valid symbol and to and from date' });
    }
    next();
  };
  