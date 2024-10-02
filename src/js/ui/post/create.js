import { createPost } from "../../api/post/create";

export async function onCreatePost(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const title = formData.get("title");
  const body = formData.get("body");
  const tags = formData.get("tags") ? formData.get("tags").split(",") : [];
  const media = formData.get("media");

  createPost({ title, body, tags, media });
}
