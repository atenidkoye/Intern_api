import { pool } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerService = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
        [email, hashedPassword]
    );

     return result.rows[0]      
};


export const loginService = async (email: string, password: string) => {
    console.log("SIGN SECRET:", process.env.JWT_SECRET);
    const userRes = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    const user = userRes.rows[0];
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(

        { id: user.id, role: user.role },
        JWT_SECRET,
        {expiresIn: "1d"}
    );

    return {token};
    

};