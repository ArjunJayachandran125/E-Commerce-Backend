import express from 'express';
import userRoutes from './routes/userRoute.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express(); 

app.use(express.json());

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;