/* import fs from "fs";
import path from "path";
import matter from "gray-matter"; */
import { marked } from "marked";

import Image from "next/image";
import Post from "@/components/Post";
import Layout from "@/components/Layout";

import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents as renderRichText } from "@contentful/rich-text-react-renderer";

import { getAuthors } from "pages/api/api-contentful/getAuthors";
import { getBlogPosts } from "pages/api/api-contentful/getBlogPosts";
import { createClient } from "contentful";

const options = {
  // bug fix: https://github.com/contentful/rich-text/issues/126
  renderNode: {
    [BLOCKS.LIST_ITEM]: (node) => {
      return <li>{node.content[0].content[0].value}</li>;
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <Image
          src={`https:${node.data.target.fields.file.url}`}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
        />
      );
    },
    [INLINES.HYPERLINK]: (node) => {
      if (node.data.uri.includes("player.vimeo.com/video")) {
        return (
          <div class="ratio ratio-16x9">
            <iframe
              title="Unique Title 001"
              src={node.data.uri}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        );
      } else if (node.data.uri.includes("youtube.com/embed")) {
        return (
          <div class="ratio ratio-16x9">
            <iframe
              title="Unique Title 002"
              src={node.data.uri}
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        );
      }
    },
  },
};

export default function AuthorSingle({
  content,
  frontMatter: { title, image },
  authors,
  posts,
}) {
  const allAuthor = posts.map((author) => author.frontMatter.author);
  const postCount = [];
  allAuthor.forEach((x) => {
    postCount[x] = (postCount[x] || 0) + 1;
  });

  return (
    <Layout>
      <section className="page-header section-sm">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row g-4 g-lg-5 text-center text-lg-start justify-content-center justify-content-lg-start">
                <div className="col-lg-3 col-md-4 col-sm-5 col-6">
                  <Image
                    className="rounded"
                    src={image}
                    alt={title}
                    width={`250`}
                    height={`250`}
                    layout="responsive"
                    placeholder="blur"
                    blurDataURL={image}
                  />
                </div>
                <div className="col-lg-9 col-md-12">
                  <p className="mb-2">
                    <span className="fw-bold text-black">
                      {postCount[title] < 9
                        ? `0${postCount[title]}`
                        : postCount[title]}
                    </span>{" "}
                    Published posts
                  </p>
                  <h1 className="h3 text-dark mb-3">{title}</h1>
                  <div className="content">
                    <div
                    /*         dangerouslySetInnerHTML={{
                        __html: marked.parse(content),
                      }} */
                    >
                      {renderRichText(content, options)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container pb-5">
        <div className="row gy-5 gx-4 g-xl-5">
          {posts.map((post, i) =>
            post.frontMatter.author === title ? (
              <div key={i} className="col-lg-6">
                <Post post={post} authors={authors} />
              </div>
            ) : null
          )}
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

  const auth_data = await client.getEntries({ content_type: "author" });

  const paths = auth_data.items.map((i) => ({
    params: {
      author_slug: i.fields.name.toString().replace(/ /g, "-").toLowerCase(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { author_slug } }) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const auth_data = await client.getEntries({ content_type: "author" });

  const filterCategoryMatch = auth_data.items.filter(
    (i) =>
      i.fields.name.toString().replace(/ /g, "-").toLowerCase() === author_slug
  );

  var frontMatter, content;

  auth_data.items.filter((i) => {
    if (
      i.fields.name.toString().replace(/ /g, "-").toLowerCase() === author_slug
    ) {
      content = i.fields.description;
      frontMatter = {
        title: i.fields.name,
        image: "https:" + i.fields.image.fields.file.url,
      };
    }
  });

  const filterCategory = filterCategoryMatch[0].fields.name;

  const posts = getBlogPosts();

  const authors_posts = posts.filter((e) => {
    if (filterCategory === e.frontMatter.author) {
      return e;
    }
  });

  return {
    props: {
      author_slug, // url
      frontMatter, // single author data
      content, // single author description
      authors: getAuthors(), // all authors posts
      posts: authors_posts, // all single author posts
    },
  };
}
