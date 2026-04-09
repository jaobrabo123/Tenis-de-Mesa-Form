import express from 'express';

// * Importing routes
import cadastroRoute from './cadastroRoute';

import staticRoute from './staticRoute';

const router = express.Router();

router.use(cadastroRoute);

// * Sempre por último, para evitar que as rotas sejam sobrescritas
router.use(staticRoute);

export default router;