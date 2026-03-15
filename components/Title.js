import Head from "next/head";

const Title = ({ title }) => {
  return (
    <Head>
      <title>{title} | Quarta</title>
    </Head>
  );
};

export default Title;
