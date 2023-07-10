import Head from "next/head";
import styles from "../styles/Home.module.css";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

export default function Home(props) {
  const { products } = props;
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link href={`/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  console.log("Re-generating...");
  const filePath = path.join(process.cwd(), "data", "dummy.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length == 0) {
    return {
      notFound: true, // navigates to 404 page
    };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // regenerate page after every 10 seconds (used for ISR)
  };
}
