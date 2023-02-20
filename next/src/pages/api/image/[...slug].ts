import { NextApiRequest, NextApiResponse } from "next";

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
    
  const { slug } = req.query;

  if(req.method === "GET"){
    if(!slug) throw new Error("No slug provided");

    const bucketName = slug[0];
    const fileName = slug[1];

    try {
      const response = await minioClient.getObject(bucketName, fileName);
      res.status(200).json({ response });
    } catch (err) {
      throw new Error("Error get image (" + err + ") / " + bucketName + " / " + fileName);
    }
  }
}
