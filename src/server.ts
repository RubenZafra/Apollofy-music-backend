import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './routes/user.routes';
import trackRouter from './routes/track.routes';
import albumRouter from './routes/album.routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use('/users', userRouter);
app.use('/track', trackRouter);
app.use('/album', albumRouter);

export default app;
