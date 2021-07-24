import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

//fetches nesseccery data for the page
export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  console.log(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
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
