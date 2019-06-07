import * as jwt from "jsonwebtoken";
import { tokenHashKey } from "../graphql/resolvers/constants";

export const isAuth = (req: any, res: any, next: any) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1]; // Authorization: Bearer {token}
    if (!token) {
        req.isAuth = false;
        return next();
    }
    let decodedToken: any;
    try {
        decodedToken = jwt.verify(token, tokenHashKey)
    } catch (err) {
        req.isAuth = false;
        return next();
    }
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    return next();
}