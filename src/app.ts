import express from 'express';
import cookieParser from 'cookie-parser';
import router from './routes/api';
import { PORT } from './utils/env';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

export default app;