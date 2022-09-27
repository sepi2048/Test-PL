// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";

import Post from "@/components/Post";
import Layout from "@/components/Layout";
import PageHeaderTaxo from "@/components/PageHeaderTaxonomy";

import { getAuthors } from "pages/api/api-contentful/getAuthors";
import { getBlogPosts } from "pages/api/api-contentful/getBlogPosts";
import { createClient } from "contentful";

export default function TagSingle({ authors, posts, category }) {
  let flatPosts = posts.flat();
  function getUniquePostsBy(flatPosts, key) {
    return [...new Map(flatPosts.map((item) => [item[key], item])).values()];
  }
  const uniquePosts = getUniquePostsBy(flatPosts, "slug");

  return (
    <Layout
      metaTitle={`Showing posts from - ${
        category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ")
      }`}
    >
      <div className="container pb-5">
        <PageHeaderTaxo title={category} />

        <div className="row gy-5 gx-4 g-xl-5">
          {uniquePosts.map((post, i) => (
            <div key={i} className="col-lg-6">
              <Post post={post} authors={authors} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const cat_data = await client.getEntries({ content_type: "category" });

  const paths = cat_data.items.map((i) => ({
    params: {
      categoriesname: i.fields.categoryName
        .toString()
        .replace(/ /g, "-")
        .toLowerCase(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const cat_data = await client.getEntries({ content_type: "category" });

  const filterCategoryMatch = cat_data.items.filter(
    (i) =>
      i.fields.categoryName.toString().replace(/ /g, "-").toLowerCase() ===
      params.categoriesname
  );

  const filterCategory = filterCategoryMatch[0].fields.categoryName;

  const posts = getBlogPosts();

  const cat_posts = posts.filter((e) => {
    return e.frontMatter.categories.some((singel_cat) => {
      return filterCategory.indexOf(singel_cat) != -1;
    });
  });

  return {
    props: {
      authors: getAuthors(),
      posts: cat_posts,
      category: params.categoriesname,
    },
  };
}
