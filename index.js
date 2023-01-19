require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const { dbConnect } = require('./src/config/db');
const userAUth = require('./src/routers/auth');
const userProfileRouter = require('./src/routers/userProfileRouter');
const admin = require('./src/routers/adminRouter');
const favouritesRouter = require('./src/routers/favouritesRouter');
const cors = require('cors');
const PORT = process.env.PORT;
const cookieParser = require('cookie-parser');
const { cricketRouter } = require('./src/routers/cricketRouter');
const { ErrorHandler } = require('./src/middlewares/ErrorHandlers/error-handlers/errorHandler');
const { startSocketConnection } = require('./src/socket');

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(bodyParser.json({ limit: '5mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.urlencoded({ extended: false }));
dbConnect(process.env.MONGO_URL);

app.set('trust proxy', true);
app.use('/api/user/auth', userAUth);
app.use('/api/cricket/', cricketRouter);
app.use('/api/user/profile', userProfileRouter);
app.use('/api/favourites',favouritesRouter);
app.use('/admin',admin);

app.use(ErrorHandler);

let server = http.createServer(app)

server.listen(process.argv[2] || PORT, () => {
  console.log(`listen to port ${process.argv[2] || PORT}`)
});

startSocketConnection(server);
