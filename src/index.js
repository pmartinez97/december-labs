const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middleware/error');
const auth = require("./middleware/auth")
require("dotenv").config();

const APP_PORT = process.env.PORT || 4000

const app = express();

// Enable cors
app.use(cors());
app.options('*', cors());

app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send('Challenge accepted');
});

app.use('/api', auth ,routes);

// convert error to ApiError, if needed
app.use(errorConverter);

app.use(errorHandler)

app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}...`));