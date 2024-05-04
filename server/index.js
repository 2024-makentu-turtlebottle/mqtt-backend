import 'dotenv/config'
import express from "express";
import influxdbRoutes from './utils/influxdb.js';
import cors from 'cors';

const app = express();
const port = 3000; // default port to listen
app.use(express.json());
app.use(cors());

app.use('/1.0/influxdb', influxdbRoutes);

app.get('/', async (req, res, next) => {
  res.status(200).send('Backend health check');
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
