import 'regenerator-runtime';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);
app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Welcome to Teamwork API.'
  })
);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`Server is Running on Port ${PORT}`)
);

export default app;
