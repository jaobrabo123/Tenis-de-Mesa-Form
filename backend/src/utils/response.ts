import { SuccessResponse } from '@schemas/entities/responseEntity';
import type { Response as Res } from 'express';

export function ResponseVS(res: Res, content: SuccessResponse, status: number = 200){
    return res.status(status).json(content); 
}