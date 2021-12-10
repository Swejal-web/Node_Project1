import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.write('Hey there');
  res.end();
});

app.listen(3000, () => {
  console.log('Connected to port 3000');
});
