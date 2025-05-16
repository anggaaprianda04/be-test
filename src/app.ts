import express from 'express';
import cookieParser from 'cookie-parser';
import router from './routes/api';
import { PORT } from './utils/env';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.json());

app.use('/api', router);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is running",
        data: null,
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

export default app;