import app from 'app';

import appConfig from 'config/App.Config';

app.listen(appConfig.port, () => {
  console.log(`Connected to port ${appConfig.port}`);
});
