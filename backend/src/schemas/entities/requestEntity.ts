import type { Request } from 'express';

export interface RequestCustomVS extends Request {
    realIp?: string;
}

export interface RequestAuthVS extends Request {
    realIp: string;
}