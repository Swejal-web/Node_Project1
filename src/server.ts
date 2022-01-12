import app from 'app';
import dotenv from 'dotenv';
import appConfig from 'config/App.Config';

dotenv.config({ path: './config.env' });

app.listen(appConfig.port, () => {
  console.log(`Connected to port ${appConfig.port}`);
});
