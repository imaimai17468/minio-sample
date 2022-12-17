import { NextApiRequest, NextApiResponse } from 'next'

const Minio = require('minio')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'nutmeg',
    secretKey: 'gidaifes',
  })

  const post = await minioClient.makeBucket('mybucket', 'us-east-1', function(err: string) {
    if (err) return console.log('Error creating bucket.', err)
    console.log('Bucket created successfully in "us-east-1".')
  })

  res.status(200).json(post)
}