const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

module.exports = (fn) => {
  return async (req, res, next) => {
    try {
      const start = performance.now(); 

      await fn(req, res, next);

      const end = performance.now(); 
      const duration = end - start;
      console.log(`Request to ${req.method} ${req.originalUrl} took ${duration}ms`);

    } catch (error) {
      const errorDetails = {
        message: error.message,
        stack: error.stack,
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        timestamp: new Date().toISOString(),
      };

      fs.appendFileSync(
        path.join(__dirname, '../logs/error.log'),
        JSON.stringify(errorDetails) + '\n'
      );

      next(error);
    }
  };
};

const exampleController = require('./controllers/exampleController');

const express = require('express');
const router = express.Router();

router.get('/example', module.exports(exampleController.getExample));

const improvedAsyncFunction = async (req, res, next) => {
  try {
    const result = await someAsyncOperation(req.params.id);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    console.error(`Error in improvedAsyncFunction: ${err.message}`);
    next(err);
  }
};

const logRequestDetails = (req, res, next) => {
  console.log(`Request received: ${req.method} ${req.originalUrl}`);
  next();
};

const trackPerformance = (req, res, next) => {
  req.startTime = performance.now();
  res.on('finish', () => {
    const duration = performance.now() - req.startTime;
    console.log(`Request to ${req.method} ${req.originalUrl} took ${duration}ms`);
  });
  next();
};

router.get('/improved-example/:id', trackPerformance, module.exports(improvedAsyncFunction));

const handleValidationError = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
      errors: err.errors,
    });
  }
  next(err);
};

const globalErrorHandler = (err, req, res, next) => {
  console.error(`Global Error: ${err.message}`);
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message || 'Internal Server Error',
  });
};

const app = express();

app.use(express.json());
app.use(logRequestDetails); 
app.use(trackPerformance); 

app.use('/api', router);

app.use(handleValidationError); 
app.use(globalErrorHandler); 

module.exports = app;
