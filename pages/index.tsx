import type { NextPage } from "next";
import Head from "next/head";
import { Template } from "../components/Template";

const Home: NextPage = () => {
  return (
    <Template>
      <Head>
        <title>Home | William O’Beirne</title>
        <meta
          name="description"
          content="Software engineer and all around computer dude."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Template>
  );
};

export default Home;
