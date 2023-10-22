# Explanation
minioをnext.jsで扱えるようにするためのテストリポジトリです。


# Build

```
docker compose build
docker compose run next npm install
docker compose up -d
```

`.env.local`を`/next`に追加してください。

内容は[envfiles](https://github.com/NUTFes/envfiles/blob/main/minio/minio.env)を参照してください。

# /minio

`http://localhost:9001/`

minioのwebコンソールを開くことができます。
ユーザー名とパスワードは`docker-compose.yml`で設定できます。
デフォルトはインフラの人に聞いてください（いつもの）
パスワードは最低でも8文字でなくてはなりません。

# /next

`http://localhost:3000/`

バケットの追加と、バケットの一覧から画像を追加することが出来ます。

## `pages/api`
minioのバケット操作や画像アップロードのメソッドが入っています。

# 実装API

使用例は[/next/pages/index.tsx](https://github.com/imaimai17468/minio-sample/blob/master/next/src/pages/index.tsx)を参照してください。

[minio APIs](https://min.io/docs/minio/linux/developers/javascript/API.html)
## api/bucket
code: [/next/pages/api/bucket.ts](https://github.com/imaimai17468/minio-sample/blob/master/next/src/pages/api/bucket.ts)

minio API: MakeBucket / listBuckets

### POST
- body
    - bucketName: string

### GET
- body
    - 特になし
- res
    - name: string
    - creationDate: Date

## api/images
minio API: getObject / presignedGetObject

### POST
code: [/next/pages/api/images/index.ts](https://github.com/imaimai17468/minio-sample/blob/master/next/src/pages/api/images/index.ts)
- bodyにFormDataを入れてPOSTしてください
  - 要参考: [/next/pages/index.tsx](https://github.com/imaimai17468/minio-sample/blob/master/next/src/pages/index.tsx) : `handleFileUpload()`

### GET
code: [/next/pages/api/images/[...slug].ts](https://github.com/imaimai17468/minio-sample/blob/master/next/src/pages/api/images/[...slug].ts)
- body
  - bodyはないですが、urlにクエリパラメータとしてBucket名とファイル名を入れてください
    - `ex) api/images/bucketName/FileName`
- res
  - url: string
