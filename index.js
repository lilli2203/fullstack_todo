const express = require("express");
const AppError = require("./utils/appError");
const authRouter = require("./routes/auth");
const todoRouter = require("./routes/todo");
const globalErrorHandler = require("./controllers/errors");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const morgan = require("morgan");

const app = express();
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, 
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp({
  whitelist: [
    'duration',
    'ratingsQuantity',
    'ratingsAverage',
    'maxGroupSize',
    'difficulty',
    'price'
  ]
}));
app.use(cors());
app.options('*', cors());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

app.use("/auth", authRouter);
app.use("/todos", todoRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find the ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/ping', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Server is alive!' });
});

app.get('/sample', (req, res) => {
  const { name, age } = req.query;
  res.status(200).json({
    status: 'success',
    message: `Hello ${name}, you are ${age} years old!`
  });
});

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.status(200).json({
    status: 'success',
    message: `User ID is ${userId}`
  });
});

app.get('/middleware-sample', (req, res, next) => {
  console.log('Middleware executed before reaching this route');
  next();
}, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Middleware sample route'
  });
});

app.get('/protected', (req, res, next) => {
  const authenticated = true;
  if (!authenticated) {
    return next(new AppError('You are not authenticated', 401));
  }
  res.status(200).json({
    status: 'success',
    message: 'Protected route accessed'
  });
});

module.exports = app;
