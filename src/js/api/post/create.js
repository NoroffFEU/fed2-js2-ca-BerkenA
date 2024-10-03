import { authGuard } from "../../utilities/authGuard";
import { API_KEY } from "../constants";

authGuard();

export async function createPost({ title, body, tags, altText, imageUrl }) {
  const token = window.localStorage.getItem("token");

  try {
    const response = await fetch("https://v2.api.noroff.dev/social/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify({
        title: title,
        body: body,
        tags: tags,
        media: {
          url: imageUrl,
          alt: altText,
        },
      }),
    });

    const data = await response.json();
    window.location.href = "/";
    if (!response.ok) {
      throw new Error(data.message || "Failed to create post");
    }

    return data.data;
  } catch (error) {
    console.error("Error creating post:", error);
  }
}
