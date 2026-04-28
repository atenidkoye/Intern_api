import { Request, Response} from "express";
import { registerService, loginService } from "./auth.service"

export const register = async (req: Request, res:Response) => {
    try {
        const {email, password} = req.body;
        const user = await registerService(email, password);
        res.status(201).json(user)
    } catch (err: any) {
        res.status(400).json({error: err.message})
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await loginService(email, password);
        res.json(result);
    } catch (err: any) {
        res.status(401).json({error: err.message})
    }
};