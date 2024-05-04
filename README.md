# Containerize a backend & nginx with docker
1. Add `.env` file in backend/frontend
- backend
```
INFLUX_URL=
INFLUX_TOKEN=
INFLUX_ORG=
INFLUX_BUCKET=
```

2. Run `docker compose -f docker-compose.yml up -d` to start the container

3. Refer the configs to set up mqtt & influxdb architechture
