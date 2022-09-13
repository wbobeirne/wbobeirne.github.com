import type { NextPage } from "next";
import Head from "next/head";

const Bio: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Bio | William O’Beirne</title>
        <meta name="description" content="Don’t forget to fill me out dummy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut molestie
          magna tempor, gravida arcu eu, gravida purus. Integer nec nisl felis.
          Proin ut venenatis mi. Nulla sed enim quis magna pellentesque pretium.
          Sed eleifend augue et leo gravida, vitae convallis nisi aliquet.
        </p>
        <p>
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Morbi commodo sapien eu neque dictum luctus.
          Fusce at eleifend augue. Aliquam id tortor nunc. Mauris est diam,
          elementum sed mi in, gravida auctor urna. Morbi ac nisl nisl. Integer
          et libero quam. In dapibus diam velit, et tempor felis mollis vel.
        </p>
        <p>
          Vivamus scelerisque condimentum ante, id elementum sapien pharetra
          quis. Donec in nulla mauris. Etiam et massa quis dui tristique
          venenatis eu efficitur turpis.
        </p>
      </div>
    </div>
  );
};

export default Bio;
