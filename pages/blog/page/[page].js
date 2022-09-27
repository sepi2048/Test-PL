/* import fs from "fs";
import path from "path"; */
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import PageHeaderBlock from "@/components/PageHeader";
import postConfig from "@/config/site.config.json";
import Pagination from "@/components/Pagination";

import { getBlogPosts } from "pages/api/api-contentful/getBlogPosts";
import { getAuthors } from "pages/api/api-contentful/getAuthors";
import { getPosts } from "pages/api/api-contentful/getPosts";

//import { getPosts } from "@/libs/getPosts";

export default function Blog({ authors, posts, currentPage, numberOfPages }) {
  return (
    <Layout metaTitle="All Posts">
      <PageHeaderBlock title="All posts" />
      <div className="container pb-5">
        <div className="row gy-5 gx-4 g-xl-5">
          {posts.map((post, i) => (
            <div key={i} className="col-lg-6">
              <Post post={post} authors={authors} />
            </div>
          ))}

          <Pagination currentPage={currentPage} numberOfPages={numberOfPages} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const blogs = getBlogPosts();
  const numberOfPages = Math.ceil(blogs.length / postConfig.postPerPage);

  let paths = [];

  for (let i = 1; i <= numberOfPages; i++) {
    paths.push({
      params: { page: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const blogs = getBlogPosts();

  const returnDirFiles = await getPosts();

  const page = parseInt(params && params.page) || 1;
  const numberOfPages = Math.ceil(blogs.length / postConfig.postPerPage);
  const pageIndex = page - 1;
  const orderedBlogs = returnDirFiles.slice(
    pageIndex * postConfig.postPerPage,
    (pageIndex + 1) * postConfig.postPerPage
  );

  return {
    props: {
      authors: getAuthors(),
      posts: orderedBlogs,
      currentPage: page,
      numberOfPages,
    },
  };
}
