import { API_KEY } from "../../api/constants";
import { authGuard } from "../../utilities/authGuard";

authGuard();

async function getSinglePost() {
  const token = window.localStorage.getItem("token");
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const id = url.searchParams.get("id");

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch post data");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

// Function to handle the form submission for updating the post
export async function onUpdatePost(event) {
  event.preventDefault();

  const token = window.localStorage.getItem("token");
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const id = url.searchParams.get("id");

  const formData = new FormData(event.target);
  const title = formData.get("title");
  const body = formData.get("body");
  const tags = formData.get("tags") ? formData.get("tags").split(",") : [];
  const altText = formData.get("altText");
  const imageUrl = formData.get("imageUrl");

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts/${id}`,
      {
        method: "PUT",
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
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update post");
    }

    console.log("Post updated successfully:", data.data);
  } catch (error) {
    console.error("Error updating post:", error);
  }
}

// Fetch the existing post data and pre-fill the form
getSinglePost().then((post) => {
  if (post) {
    document.getElementById("title").value = post.title || "";
    document.getElementById("body").value = post.body || "";
    document.getElementById("tags").value = post.tags
      ? post.tags.join(", ")
      : "";
    document.getElementById("altText").value = post.media ? post.media.alt : "";
    document.getElementById("imageUrl").value = post.media
      ? post.media.url
      : "";
  }
});

const form = document.getElementById("createPost");
form.addEventListener("submit", onUpdatePost);
