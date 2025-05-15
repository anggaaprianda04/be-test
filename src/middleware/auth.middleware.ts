import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/env';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({
            meta: {
                status: 400,
                message: 'Token tidak ditemukan'
            },
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(401).json({
            meta: {
                status: 401,
                message: 'Token tidak valid'
            },
        });
    }
};
