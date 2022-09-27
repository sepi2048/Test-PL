import Link from "next/link";
import Layout from "@/components/Layout";
import PageHeaderTaxo from "@/components/PageHeaderTaxonomy";
//import { getPosts } from '@/libs/getPosts';
import { IconArchive } from "@tabler/icons";
import { getSinglePage } from "@/libs/getSinglePage";

import { createClient } from "contentful";

export default function Archive({ posts, archive: { frontMatter } }) {
  //  console.dir(posts, { depth: null }); // get cache from here

  // formatDateByYear
  let formatDateByYear = (a) => {
    const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
    });
    const date = new Date(a);
    return longEnUSFormatter.format(date);
  };

  // formatDateByMonth
  let formatDateByMonth = (a) => {
    const longEnUSFormatter = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    });
    const date = new Date(a);
    return longEnUSFormatter.format(date);
  };

  // sortByYear
  let postYear = posts.map((year) => formatDateByYear(year.frontMatter.date));
  const uniqueYear = [...new Set(postYear)];

  return (
    <Layout metaTitle={`${frontMatter.title} Posts`}>
      <PageHeaderTaxo title={frontMatter.title} />

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="archive-block pb-5">
                {uniqueYear.map((unqYear, y) => (
                  <>
                    <h2 key={y}>
                      {/* <i>
                        <IconArchive size={80} />
                      </i> */}
                      {unqYear}
                    </h2>
                    {posts.map((post, i) =>
                      formatDateByYear(post.frontMatter.date) === unqYear ? (
                        <div key={i} className="archive-post-item mb-3">
                          <span
                            className="mx-0 d-inline-block"
                            style={{ width: 68 + "px" }}
                          >
                            {formatDateByMonth(post.frontMatter.date)}
                          </span>
                          <span>•</span>
                          <Link href={`/blog/${post.slug}`}>
                            <a>{post.frontMatter.title}</a>
                          </Link>
                        </div>
                      ) : null
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const blog = await client.getEntries({ content_type: "blog" });

  var posts = [];
  var len = blog.items.length;
  for (var i = 0; i < len; i++) {
    //console.log(blog.items[i].fields.slug);
    const tag_len = blog.items[i].fields.tag.length;
    const tags = [];

    for (var j = 0; j < tag_len; j++) {
      tags.push(blog.items[i].fields.tag[j].fields.tagName);
    }

    const cat_len = blog.items[i].fields.category.length;
    const cats = [];
    //console.log(blog.items[i].fields.category.length);

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
  }

  // console.log(JSON.stringify(posts, null, 4));

  return {
    props: {
      posts: posts,
      archive: getSinglePage("content/archive.md"),
    },
  };
}
