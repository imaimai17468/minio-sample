import { NextApiRequest, NextApiResponse } from "next";
import * as fs from 'fs';

const Minio = require("minio");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const minioClient = new Minio.Client({
    endPoint: process.env.NEXT_PUBLIC_ENDPOINT,
    port: Number(process.env.NEXT_PUBLIC_PORT),
    accessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    secretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
    useSSL: false,
  });

  if (req.method === "GET") {
    const { bucketName } = req.query;
    try{
        const stream = minioClient.extensions.listObjectsV2WithMetadata(bucketName, '', true, '');
        const get = [];
        for await (const obj of stream) {
            get.push(obj);
        }
        res.status(200).json(get);
    }catch(err){
        throw new Error("Error getting images (" + err + ")");
    }
  }
}
