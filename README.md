# Explanation
minioをnext.jsで扱えるようにするためのテストリポジトリです。


# Build

```
docker compose build
docker compose run next npm install
docker compose up -d
```

# /minio

`http://localhost:9001/`

minioのwebコンソールを開くことができます。
ユーザー名とパスワードは`docker-compose.yml`で設定できます。
デフォルトだとユーザー名は`test`、パスワードは`pass`に設定されています。

# /next

`http://localhost:3000/`
バケットの追加と、バケットの一覧から画像を追加することが出来ます。
`.env.local`を`/next`に追加してください。
内容は[envfiles](https://github.com/NUTFes/envfiles/blob/main/minio/minio.env)を参照してください。

## `pages/api`
minioのバケット操作や画像アップロードのメソッドが入っています。
