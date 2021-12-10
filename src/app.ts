import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.write('Hey there');
  res.end();
});

app.listen(3000, () => {
  console.log('Connected to port 3000');
});
