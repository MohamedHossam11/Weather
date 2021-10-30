const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;
const weather = require('./Routes/index');
const DBConfig = require('./constants');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

DBConfig.authenticate()
  .then(() => {
    console.log('Connected to postgres');
  })
  .catch((err) => {
    console.error('Unable to connect to postgres', err);
  });

app.get('/', (req, res) => {
  res.send('No such url');
});

app.use('/weather', weather);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, X-Auth-Token, Accept'
  );
  next();
});

DBConfig
  .sync({ force: true })
  .then(() => console.log('Synced models with database'))
  .catch((error) => console.log('Could not sync models with database', error));

app.listen(port, () => {
  console.log(`Weather is listening at http://localhost:${port}`);
});
