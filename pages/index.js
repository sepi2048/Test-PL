import Link from "next/link";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { getAuthors } from "pages/api/api-contentful/getAuthors";
import { getBlogPosts } from "pages/api/api-contentful/getBlogPosts";
import { IconNewSection } from "@tabler/icons";
import ModalMailingList from "@/components/ModalMailingList";
import MultiStepForm from "@/components/PokerBot/MultiStepForm";
import { useState, useEffect } from "react";

export default function Home({ authors, posts }) {
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    // open newsletter modal after x seconds
    setTimeout(() => {
      setModalShow(true);
    }, 7500);
  }, []);

  return (
    <>
      <Layout>
        <section className="section overflow-hidden banner">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <MultiStepForm />
              </div>
              <div className="col-auto col-lg-6 order-first order-lg-last mx-auto">
                <h2 className="pokerbot">
                  The (legal) <br />
                  Poker Bot
                </h2>
                <p></p>
              </div>
            </div>
          </div>
        </section>
        <br />
        <br />
        <ModalMailingList show={modalShow} onHide={() => setModalShow(false)} />

        <div className="container pb-5">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="section-title">
                <span>Recent posts</span>
              </h2>
            </div>
          </div>
          <div className="row gy-5 gx-4 g-xl-5">
            {posts.map((post, i) => (
              <div key={i} className="col-lg-6">
                <Post post={post} authors={authors} />
              </div>
            ))}

            <div className="col-12 text-center">
              <Link href={`/blog`}>
                <a className="btn btn-primary mt-5" aria-label="View all posts">
                  <i className="me-2">
                    <IconNewSection size={16} />
                  </i>
                  View all posts
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row"></div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  /*   const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const blog = await client.getEntries({ content_type: "blog" });

  var posts = [];
  var len = blog.items.length;
  for (var i = 0; i < len; i++) {
    const tag_len = blog.items[i].fields.tag.length;
    const tags = [];

    for (var j = 0; j < tag_len; j++) {
      tags.push(blog.items[i].fields.tag[j].fields.tagName);
    }

    const cat_len = blog.items[i].fields.category.length;
    const cats = [];

    for (var k = 0; k < cat_len; k++) {
      cats.push(blog.items[i].fields.category[k].fields.categoryName);
    }

    posts.push({
      slug: blog.items[i].fields.slug,
      content: blog.items[i].fields.content,
      frontMatter: {
        title: blog.items[i].fields.title,
        image: "https:" + blog.items[i].fields.image.fields.file.url,
        date: blog.items[i].fields.date,
        author: blog.items[i].fields.author.fields.name,
        description: blog.items[i].fields.description,
        categories: cats,
        tags: tags,
      },
    });
  } */
  /* 
  const auth_data = await client.getEntries({ content_type: "author" });

  var authors = [];

  var auth_len = auth_data.items.length;
  for (var i = 0; i < auth_len; i++) {
    authors.push({
      authorSlug: auth_data.items[i].fields.name
        .toString()
        .replace(/ /g, "-")
        .toLowerCase(),
      authorContent: auth_data.items[i].fields.description,
      authorFrontMatter: {
        title: auth_data.items[i].fields.name,
        image: "https:" + auth_data.items[i].fields.image.fields.file.url,
      },
    });
  } */

  //console.log(JSON.stringify(getBlogPosts(), null, 2));

  return {
    props: {
      posts: getBlogPosts(),
      authors: getAuthors(),
    },
    revalidate: 1,
  };
}

// https://stackoverflow.com/questions/72474803/error-the-top-level-await-experiment-is-not-enabled-set-experiments-toplevelaw
// WORKS, BUT SLOW

// https://stackoverflow.com/questions/71059620/reusing-getstaticprops-in-next-js

//https://www.reddit.com/r/nextjs/comments/m44nap/reuse_data_fetched_from_getstaticprops_into/
