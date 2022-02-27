import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
}

//เพิ่มให้ type ของ express.req มี property currentUser
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    console.log('Common currentUser session >>>>', req.session?.jwt);
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;

        console.log('Common currentUser payload >>>>', payload);
    } catch (err) {
        console.log('Common currentUser Error >>>>', err);
    }

    next();
};