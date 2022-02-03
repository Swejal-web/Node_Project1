import app from 'app';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

app.listen(process.env.PORT, () => {
  console.log(`Connected to port ${process.env.PORT}`);
});
