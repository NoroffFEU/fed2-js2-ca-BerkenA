import { authGuard } from "../../utilities/authGuard";

authGuard();

export async function createPost({ title, body, tags, media }) {
  const getToken = window.localStorage.getItem("token");

  try {
    const response = await fetch("https://v2.api.noroff.dev/social/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken}`,
        "X-Noroff-API-Key": "9601e4e1-716f-4316-9a6b-5a1ee44e55df",
      },
      body: {
        title: title,
        body: body,
        tags: tags,
        media: media,
      },
    });

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch posts");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}
