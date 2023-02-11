import { NextApiRequest, NextApiResponse } from "next";
import { formidable } from "formidable";

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
    endPoint: "minio",
    port: 9000,
    useSSL: false,
    accessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    secretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
  });

  if (req.method === "POST") {
    console.log("POST")

    const form = formidable();
    const fs = require("fs");

    form.parse(req, async (err, fields, files: any) => {
      if (err) {
        console.error("Error", err);
        throw err;
      }

      const bucketName = fields.bucketName;
      const fileName = fields.fileName;
      const metaData = {
        "Content-Type": "image/png",
      };

      console.log("bucketName", bucketName)
      console.log("fileName", fileName)
      console.log("metaData", metaData)

      try {
        const res = await minioClient.putObject(
          bucketName,
          fileName,
          fs.createReadStream(files.file.filepath),
          metaData
        );
      } catch (err) {
        console.log(err);
      }
    });
  }
}
