const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const registerMiddleware = (app) => {
  if (process.env.ENV === 'production') {
    var corsOptions = {
      origin: process.env.APP_URL,
      optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));
  }

  app.use(cors());

  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.xssFilter());
};

module.exports = {
  registerMiddleware,
};
