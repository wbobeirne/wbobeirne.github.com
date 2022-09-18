import type { NextPage } from "next";
import Head from "next/head";
import { Template } from "../components/Template";

const Home: NextPage = () => {
  return (
    <Template>
      <Head>
        <title>Home | William O’Beirne</title>
        <meta name="description" content="Don’t forget to fill me out dummy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Template>
  );
};

export default Home;
