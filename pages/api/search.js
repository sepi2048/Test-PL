/* import fs from "fs";
import path from "path";
import matter from "gray-matter"; */

import { getBlogPosts } from "./api-contentful/getBlogPosts";

export default (req, res) => {
  let posts;

  if (process.env.NODE_ENV === "production") {
    // Fetch cache data
    posts = require("../../cache/data").posts;
  } else {
    posts = getBlogPosts();
  }

  res.status(200).json(JSON.stringify(posts));
};
