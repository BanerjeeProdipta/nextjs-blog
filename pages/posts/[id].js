import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import useSWR from 'swr';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

//fetches nesseccery data for the page
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  console.log(params.id);
  return {
    props: {
      postData,
    },
  };
}

//array of possible values for id
export async function getStaticPaths() {
  //array of  known paths
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

// SERVER SIDE RENDERING WITH DATA
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // props for your component
//     },
//   };
// }

// CLIENT SIDE RENDERING WITH DATA
function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
