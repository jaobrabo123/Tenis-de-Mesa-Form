import rateLimit from 'express-rate-limit';
import { ManyRequestsError } from '@utils/errorClasses';

class RateLimit {
    static readonly general = rateLimit({
        windowMs: 1 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (_req, _res, next) =>
            next(new ManyRequestsError('Muitas requisições, tente novamente mais tarde.')),
    });

    static readonly cadastro = rateLimit({
        windowMs: 5 * 60 * 1000,
        max: 10,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (_req, _res, next) =>
            next(new ManyRequestsError('Muitas tentativas de cadastro, tente novamente mais tarde.')),
    });
}

export default RateLimit;