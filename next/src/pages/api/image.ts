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
    const fileName = req.body.fileName;
    const file = req.body.file;

    const post = await minioClient.fPutObject(bucketName, 'QR_396974', '/data', file);
  }
}
