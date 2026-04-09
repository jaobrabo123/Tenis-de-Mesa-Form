import type { RequestCustomVS } from "@schemas/entities/requestEntity";
import type { Response, NextFunction } from "express";

const realIpHandler = (req: RequestCustomVS, _res: Response, next: NextFunction) => {
    const rawIp = req.headers['cf-connecting-ip'] || req.ip;
    req.realIp = Array.isArray(rawIp) ? rawIp[0] : (rawIp as string);
    next();
};

export default realIpHandler;