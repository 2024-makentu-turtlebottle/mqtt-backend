import express from 'express';
const router = express.Router();
import { InfluxDB, Point, currentTime } from '@influxdata/influxdb-client'

/** influxdb config Environment variables **/
const url = process.env.INFLUX_URL
const token = process.env.INFLUX_TOKEN
const org = process.env.INFLUX_ORG
const bucket = process.env.INFLUX_BUCKET
const influxDB = new InfluxDB({ url, token })

/** 
 * get result data from influxdb 
 * **/
router.get('/', async (req, res, next) => {  
    try {
      const { time } = req.query;
      const queryApi = new InfluxDB({url, token}).getQueryApi(org)
      
      /** To avoid SQL injection, use a string literal for the query. */
      // const fluxQuery = `from(bucket:"scritchcare") |> range(start: -24h) |> filter(fn: (r) => r._measurement == "scrithcCare")`
      const fluxQuery = time === 'min'
    ? `from(bucket:"makentu") |> range(start: -15m) |> filter(fn: (r) => r._measurement == "neck")`
    : `from(bucket:"makentu") |> range(start: -24h) |> filter(fn: (r) => r._measurement == "neck")`;

      const data = [];
  
      for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery)) {
        const o = tableMeta.toObject(values);
        const timestamp = new Date(o._time);
 	data.push({
		"time": timestamp,
		"value": o._value,
		});
	console.log(data);
        // 加上八小時
        const adjustedTimestamp = new Date(timestamp.getTime() + 8 * 60 * 60 * 1000);

      }  
      res.status(200).json({ data });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

export default router;
