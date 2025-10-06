# How to run

For both environments, swagger is available under the /swagger path

## Production

### Run compose

```
docker compose --env-file .env.sample.local -f oci://ghcr.io/flaviusaugustus/terminal/compose:latest up
```

## Development

Development environment supports automatic container sync upon changing application code

### Run compose

```
docker compose --env-file .env.sample.local up --watch
```

- Frontend Url: https://localhost:5173
- Backend Url: http://localhost:5006
