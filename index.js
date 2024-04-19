import './db/index.js';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import thoughtsRouter from './routes/thoughtsRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port = process.env.PORT || 5050;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/auth', authRouter);
app.use('/thoughts', thoughtsRouter);
app.use('*', (req, res) => res.sendStatus(404));
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
