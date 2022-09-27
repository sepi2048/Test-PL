import { createClient } from "contentful";

export async function getBlogPosts() {
  const client = createClient({
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

  return posts;
}
