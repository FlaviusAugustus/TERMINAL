# How to run app via docker compose

## Generate self-signed certificates

```
openssl req -x509 -out ./Config/cert/localhost.crt -keyout ./Config/cert/localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

## Run compose

```
docker compose --env-file .env.sample.local up
```

## Apply db migrations and seed

```
./Server/update-database.sh TerminalDbContext
```

## To rebuild containers after making changes run

```
docker compose --env-file .env.sample.local build --no-cache
```
