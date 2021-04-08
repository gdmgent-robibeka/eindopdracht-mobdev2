require('dotenv').config();

const express = require('express');
const MongoClient = require('./db/MongoClient');
const cors = require('cors');
const { registerRoutes } = require('./routes');

// Connect with db
const db = new MongoClient();
db.connect();

const app = express();
const port = process.env.PORT || 80;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

registerRoutes(app);

// Default 404
app.use((req, res) => {
  res.status(404);
  res.json({ error: 'Page not found' });
});

app.use(function (err, req, res, next) {
  res.status(500).json(err);
});

app.listen(port, () => {
  console.log(`Server runnning at http://localhost:${port}`);
});

const closeServer = () => {
  db.disconnect();
  process.exit();
};

process.on('SIGINT', () => closeServer());
process.on('SIGTERM', () => closeServer());
