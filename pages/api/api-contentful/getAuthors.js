import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

const auth_data = await client.getEntries({ content_type: "author" });

export function getAuthors() {
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
  }
  return authors;
}
