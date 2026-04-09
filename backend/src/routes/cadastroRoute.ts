import express, { type RequestHandler } from 'express';
import RateLimit from '@middlewares/rateLimit';
import CadastroController from '@controllers/cadastroController';

const router = express.Router();

router.post('/cadastro', RateLimit.cadastro, CadastroController.cadastro as RequestHandler);

export default router;