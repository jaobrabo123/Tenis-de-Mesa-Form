// * Imports
import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import corsConfig from '@configs/cors';
import RateLimit from '@middlewares/rateLimit';
import errorHandler from '@middlewares/errorHandler';

// * Server initialization
const port = process.env.PORT || 2923;
const app = express();
const server = http.createServer(app);
// app.set('trust proxy', 1); 

// * Global Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(realIpHandler);
app.use(RateLimit.general);
app.use(cors(corsConfig));

// * Cron tasks
// import '@tasks/cronSessionsCleanup';

// * Importing Routes
import routes from '@routes/index';
import realIpHandler from '@middlewares/realIp';
app.use(routes);

// * Error handling
app.use(errorHandler);

// * Server Port
server.listen(port, ()=>console.log(`Servidor rodando em http://localhost:${port}`));