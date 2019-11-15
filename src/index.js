import 'regenerator-runtime';
import morganBody from 'morgan-body';
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

if (process.env.NODE_ENV !== 'test') {
  morganBody(app, { prettify: true });
}
app.use('/', routes);

app.get('/', (req, res) =>
  res.status(200).send({
    status: 'success',
    data: {
      message: 'Welcome to Teamwork API'
    }
  })
);
app.use('*', (_req, res) => {
  res.status(404).send({
    status: 'error',
    data: {
      message: '404 Page Not Found'
    }
  });
});
const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`Server is Running on Port ${PORT}`)
);

export default app;
