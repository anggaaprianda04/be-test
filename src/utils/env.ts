import dotenv from "dotenv";

dotenv.config();

export const PORT: number = 3000;

export const JWT_SECRET: string = process.env.JWT_SECRET || "";