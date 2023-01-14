# Explanation
minioをnext.jsで扱えるようにするためのテストリポジトリです。
まず、minioとappsは別のコンテナで管理されることを想定してディレクトリを構成しました。
そのため、minioとappsのそれぞれでdockerをbuild / up する必要があります。

# Build
## Build MinIO
```
cd minio
docker compose build --no-cache
docker compose up -d
```

## Build apps
まず`apps/next/src/`に`.env.local`を作成し、ACCESS＿KEYとSECRET_KEYを記入してください。
```
cd apps
docker compose build --no-cache
docker compose run next npm install
docker compose up -d
```