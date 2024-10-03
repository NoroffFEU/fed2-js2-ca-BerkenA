import { createPost } from "../../api/post/create";
import { authGuard } from "../../utilities/authGuard";

authGuard();

export async function onCreatePost(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const title = formData.get("title");
  const body = formData.get("body");
  const tags = formData.get("tags") ? formData.get("tags").split(",") : [];
  const altText = formData.get("altText");
  const imageUrl = formData.get("imageUrl");

  try {
    const response = await createPost({ title, body, tags, altText, imageUrl });
    alert("Post created successfully", response);
  } catch (error) {
    console.error("Error creating post:", error);
  }
}

const form = document.getElementById("submitPost");
form.addEventListener("submit", onCreatePost);
