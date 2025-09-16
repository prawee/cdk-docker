# CDK Docker

POC of using `Lambda` + `Docker` and `CDK`

## Build (Docker)
### Self-Host
```
docker build -t brt/hono-dev .
```

## Running
### Self-Host
```
docker run -p 3000:3000 brt/hono-dev node server.js
```