import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sortByDate } from "@/utils/sortByDate";
import { createClient } from "contentful";

//const blogDirFiles = fs.readdirSync(path.join("content/blog"));
//const blogs = blogDirFiles.filter((f) => f.includes(".md"));

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export async function getPosts() {
  const blogs = await client.getEntries({ content_type: "blog" });

  const returnDirFiles = blogs.items.map((post) => {
    const tag_len = post.fields.tag.length;
    const tags = [];

    for (var i = 0; i < tag_len; i++) {
      tags.push(post.fields.tag[i].fields.tagName);
    }

    var slug = post.fields.slug;
    var content = post.fields.content;
    var frontMatter = {
      title: post.fields.title,
      image: "https:" + post.fields.image.fields.file.url,
      date: post.fields.date,
      author: post.fields.author.fields.name,
      description: post.fields.description,
      categories: [],
      tags: tags,
    };

    return {
      slug,
      frontMatter,
      content,
    };
  });

  return returnDirFiles.sort(sortByDate);
}
