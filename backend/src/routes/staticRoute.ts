// * Imports
import express from 'express';
import type { SuccessResponse, ErrorResponse } from '@schemas/entities/responseEntity'
import { RequestCustomVS } from '@schemas/entities/requestEntity';

const router = express.Router();

router.get('/', (_req, res)=>{
    res.status(200).json({ message: 'Bem vindo à API!' } satisfies SuccessResponse);
});

router.get('/myip', (req: RequestCustomVS, res)=>{
    console.log('IP:',req.realIp);
    res.status(204).send();
});

router.use((_req, res)=>{
    res.status(404).json({ error: 'Esta rota não existe!', type: 'VS_NOT_FOUND' } satisfies ErrorResponse);
});

export default router;