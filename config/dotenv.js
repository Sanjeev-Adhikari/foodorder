import * as dotenv from 'dotenv';
dotenv.config();

export const BACKEND_PORT = process.env.BACKEND_PORT;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_PORT = process.env.DATABASE_PORT;
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const SECRET_KEY = process.env.SECRET_KEY;