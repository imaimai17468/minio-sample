import Head from "next/head";
import { useState, useEffect } from "react";

interface Bucket {
  name: string;
  creationDate: string;
}

export default function Home() {
  const [file, setFile] = useState<File>();
  const [fileURL, setFileURL] = useState<string>();
  const [bucketName, setBucketName] = useState<string>("");
  const [uploadBucketName, setUploadBucketName] = useState<string>("");
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [bucketError, setBucketError] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!;
    setFile(file);
    setFileURL(URL.createObjectURL(file));
  };

  const handleFileUpload = async () => {
    if (!file) {
      setImageError("ファイルを選択してください");
      return;
    }

    console.log(uploadBucketName, file.name, file);

    const res = await fetch(`/api/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bucketName: uploadBucketName,
        fileName: file.name,
        file: file,
      }),
    });
  };

  const handleMakeBucket = async () => {
    setBucketName("");
    if (!bucketName) {
      setBucketError("バケット名を入力してください");
      return;
    }
    if (buckets.find((bucket) => bucket.name === bucketName)) {
      setBucketError("既に存在するバケット名です");
      return;
    }
    const post = await fetch("/api/bucket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bucketName: bucketName,
      }),
    });
  };

  useEffect(() => {
    const getBuckets = async () => {
      const res = await fetch("/api/bucket", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setBuckets(data);
    };
    getBuckets();
  }, [handleMakeBucket, buckets]);

  useEffect(() => {
    if (buckets.length > 0) {
      setUploadBucketName(buckets[0].name);
    }
  }, [buckets]);

  return (
    <div>
      <Head>
        <title>Minio Sample</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-black text-white shadow-md h-16 flex items-center justify-center">
        <h1 className="text-3xl font-bold">Minio Sample!</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex flex-col items-center justify-center my-5 gap-10 bg-gray-100 p-5 rounded-md shadow-md w-4/5">
          <h2 className="text-2xl font-bold">File Uploader</h2>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              handleChangeFile(e);
            }}
          ></input>
          <div className="flex flex-col items-center justify-center gap-5 bg-gray-200 p-2 rounded-md shadow-md w-3/5">
            <p>プレビュー</p>
            <img src={fileURL}></img>
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <p>バケット一覧</p>
            <select
              name="buckets"
              id="buckets"
              className="border-2 border-gray-300 p-2 rounded-md"
              onChange={(e) => {
                setUploadBucketName(e.target.value);
              }}
            >
              {buckets.map((bucket) => {
                return (
                  <option value={bucket.name} key={bucket.name}>
                    {bucket.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <button
              onClick={handleFileUpload}
              className="bg-blue-500 text-white font-bold p-2 rounded-md hover:bg-blue-700"
            >
              Image upload
            </button>
            <p className="text-red-500">{imageError}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center my-5 gap-10 bg-gray-100 p-5 rounded-md shadow-md w-4/5">
          <h2 className="text-2xl font-bold">Make Bucket</h2>
          <input
            type="text"
            id="bucketName"
            name="bucketName"
            placeholder="Bucket Name"
            className="border-2 border-gray-300 p-2 rounded-md"
            value={bucketName}
            onChange={(e) => {
              setBucketName(e.target.value);
            }}
          ></input>
          <div className="flex flex-col justify-center gap-3">
            <button
              onClick={handleMakeBucket}
              className="bg-blue-500 text-white font-bold p-2 rounded-md hover:bg-blue-700 w-full"
            >
              Make Bucket
            </button>
            <p className="text-red-500">{bucketError}</p>
          </div>
        </div>
      </div>
    </div>
  );
}