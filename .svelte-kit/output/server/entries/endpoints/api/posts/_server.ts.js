import { j as json } from "../../../../chunks/index2.js";
async function getPosts() {
  let posts = [];
  const paths = /* @__PURE__ */ Object.assign({});
  for (const path in paths) {
    const file = paths[path];
    const slug = path.split("/").at(-1)?.replace(".md", "");
    if (file && typeof file === "object" && "metadata" in file && slug) {
      const metadata = file.metadata;
      const post = { ...metadata, slug };
      let date_obj = new Date(Date.parse(post.date));
      post.date = date_obj.toLocaleDateString("en-US");
      posts.push(post);
    }
  }
  posts = posts.sort(
    (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
  );
  return posts;
}
async function GET() {
  const posts = await getPosts();
  return json(posts);
}
export {
  GET
};
