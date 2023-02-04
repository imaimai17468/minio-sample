import { NextApiRequest, NextApiResponse } from "next";

const Minio = require("minio");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const minioClient = new Minio.Client({
    endPoint: "minio",
    port: 9000,
    useSSL: false,
    accessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    secretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
  });

  if (req.method === "POST") {
    const bucketName = req.body.bucketName;
    const post = await minioClient.makeBucket(bucketName, "us-east-1");
    res.status(200).json(post);
  }else if (req.method === "GET") {
    const get = await minioClient.listBuckets();
    res.status(200).json(get);
  }
}
