import type { RequestCustomVS } from '@schemas/entities/requestEntity';
import type { Response, NextFunction } from 'express';
import { ResponseVS } from '@utils/response';
import { cadastroSchema } from '@schemas/zod/controllers/cadastroControllerSchema';
import CadastroService from '@services/cadastroService';

export default class CadastroController {

    static async cadastro(req: RequestCustomVS, res: Response, next: NextFunction){
        try {
            const dto = cadastroSchema.parse(req.body);
            const data = await CadastroService.cadastro(dto);
            ResponseVS(res, {data}, 201);
        } catch (err) {
            next(err);
        }
    }

    static async vagasDisponiveis(_req: RequestCustomVS, res: Response, next: NextFunction){
        try {
            const data = await CadastroService.vagasDisponiveis();
            ResponseVS(res, {data});
        } catch (err) {
            next(err);
        }
    }

}