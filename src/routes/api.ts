import express from "express";
import { checkout } from "../controller/checkout.controller";
import { loginWithOAuth } from "../controller/auth.controller";
import { getUsers } from "../controller/user.controller";

const router = express.Router();

router.post('/checkout', checkout);
router.post('/login', loginWithOAuth);
router.get('/users', getUsers);

export default router;