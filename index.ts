import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { routes } from './routes';

const app: Express = express();
dotenv.config();

app.use(bodyParser.json());

app.use('/', routes);

app.listen(process.env.PORT, () => {
  console.log(`now listening on port ${process.env.PORT}`);
});
