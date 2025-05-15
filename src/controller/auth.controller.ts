import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/env';

export const loginWithOAuth = async (req: Request, res: Response): Promise<void> => {
    const { id, username } = req.body;

    if (!id || !username) {
        res.status(400).json({
            meta: {
                status: 400,
                message: "ID dan Username wajib diisi"
            }
        });
    }

    const token = jwt.sign({ id, username }, JWT_SECRET, {
        expiresIn: "1h",
    });

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
    });

    res.json({
        meta: {
            status: 200,
            message: 'Login berhasil'
        },
        data: {
            token
        },
    });
};
