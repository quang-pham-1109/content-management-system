import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initRoutes } from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

initRoutes(app);

app.get('/', (req, res) => {
  res.send('Sever is running!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
