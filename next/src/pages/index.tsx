import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    console.log(file);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Minio Sample</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>画像を選択</p>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
        ></input>
        <button onClick={handleFileUpload}>アップロード</button>
      </main>
    </div>
  );
}
