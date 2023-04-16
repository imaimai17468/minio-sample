import { NextApiRequest, NextApiResponse } from "next";

const Minio = require("minio");

export const config = {
  api: {
    bodyParser: false,
  },
};

const minioClient = new Minio.Client({
  endPoint: process.env.NEXT_PUBLIC_ENDPOINT,
  port: Number(process.env.NEXT_PUBLIC_PORT),
  accessKey: 'RhoumbfIXi0K2k1Q',
  secretKey: '10JXXuBzZYlvqqQSR7QpVZGNkTlblRJB',
  useSSL: false,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { slug } = req.query;
    const [bucketName, objectName] = slug as string;
    try {
      const imageUrl = await minioClient.presignedUrl(
        "GET",
        bucketName,
        objectName,
      );
      res.status(200).json({ imageUrl });
    } catch (err) {
      throw new Error("Error getting images (" + err + ")");
    }
  }
}
