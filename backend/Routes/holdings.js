import express from "express";
const router = express.Router();

router.get('/', async (req, res) => {
    return res.status(200).json({ message: 'User registered successfully' });
});

export default router;