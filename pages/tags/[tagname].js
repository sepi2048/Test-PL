import Post from "@/components/Post";
import Layout from "@/components/Layout";
import PageHeaderTaxo from "@/components/PageHeaderTaxonomy";

import { getAuthors } from "pages/api/api-contentful/getAuthors";
import { getBlogPosts } from "pages/api/api-contentful/getBlogPosts";
import { createClient } from "contentful";

export default function TagSingle({ authors, posts, tag }) {
  let flatPosts = posts.flat();
  function getUniquePostsBy(flatPosts, key) {
    return [...new Map(flatPosts.map((item) => [item[key], item])).values()];
  }
  const uniquePosts = getUniquePostsBy(flatPosts, "slug");

  return (
    <Layout
      metaTitle={`Showing posts from - ${
        tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, " ")
      }`}
    >
      <div className="container pb-5">
        <PageHeaderTaxo title={tag} />

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

  const tag_data = await client.getEntries({ content_type: "tag" });

  const paths = tag_data.items.map((i) => ({
    params: {
      tagname: i.fields.tagName.toString().replace(/ /g, "-").toLowerCase(),
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

  const tag_data = await client.getEntries({ content_type: "tag" });

  const filterTagMatch = tag_data.items.filter(
    (i) =>
      i.fields.tagName.toString().replace(/ /g, "-").toLowerCase() ===
      params.tagname
  );

  const filterTag = filterTagMatch[0].fields.tagName;

  const posts = getBlogPosts();

  const tag_posts = posts.filter((e) => {
    return e.frontMatter.tags.some((a) => {
      return filterTag.indexOf(a) != -1;
    });
  });

  return {
    props: {
      authors: getAuthors(),
      posts: tag_posts,
      tag: params.tagname,
    },
  };
}
