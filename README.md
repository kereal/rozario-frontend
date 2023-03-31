# Приложение на SvelteKit

# Deployment

```
docker network create --driver bridge rozario

docker pull ghcr.io/kereal/rozario-fontend
docker stop ghcr.io/kereal/rozario-fontend && docker rm $_ || true
docker run -dp 127.0.0.1:3006:3006 --network rozario --name rozario-fontend ghcr.io/kereal/rozario-fontend

```

# .env

```
VITE_PROD_API_URL=
VITE_DEV_API_URL=
```
