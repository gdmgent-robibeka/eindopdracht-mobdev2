require('dotenv').config();

const express = require('express');
const MongoClient = require('./db/MongoClient');
const { registerMiddleware } = require('./middleware');
const { registerRoutes } = require('./routes');

// Connect with DB
const db = new MongoClient();
db.connect();

const app = express();
const port = process.env.PORT || 80;

registerMiddleware(app);
registerRoutes(app);

app.listen(port, () => {
  console.log(`Server runnning at http://localhost:${port}`);
});

const closeServer = () => {
  db.disconnect();
  process.exit();
};

process.on('SIGINT', () => closeServer());
process.on('SIGTERM', () => closeServer());
