import express from "express";
const router = express.Router();
import mysql2 from "mysql2";
import { db } from "../util/db.js";
import { verifyHistoricalDetails } from "../middleware/verify_historical_details.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";

router.post("/", [verifyJwtToken, verifyHistoricalDetails], async (req, res) => {
  const { symbol, from_date, to_date } = req.body;
  try {
    const connection = await mysql2.createConnection(db);
    const query = `SELECT * FROM historicalPrices WHERE instrument_name = '${symbol}' and (date between '${from_date}' and '${to_date}');`;
    const [rows] = await connection.promise().query(query);
    return res.status(200).json({ status: "success", data: rows });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
