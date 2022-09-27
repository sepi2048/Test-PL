export const readingTime = (content) => {
  if (typeof content === "object") {
    const blog_posts = [];
    const single_blog_post = [];

    var post = content.content;

    for (var a = 0; a < post.length; a++) {
      var single_content = post[a].content;

      var text = "";

      for (var b = 0; b < single_content.length; b++) {
        text += single_content[b].value;
      }
      single_blog_post.push(text);
    }

    blog_posts.push(single_blog_post.flat().join(" "));
    content = single_blog_post.flat().join(" ");
  }

  const WPS = 275 / 60;

  var images = 0;
  const regex = /\w/;

  let words = content.split(" ").filter((word) => {
    if (word.includes("<img")) {
      images += 1;
    }
    return regex.test(word);
  }).length;

  var imageAdjust = images * 4;
  var imageSecs = 0;
  var imageFactor = 12;

  while (images) {
    imageSecs += imageFactor;
    if (imageFactor > 3) {
      imageFactor -= 1;
    }
    images -= 1;
  }

  const minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60);

  if (minutes < 9) {
    return "0" + minutes;
  } else {
    return minutes;
  }
};
