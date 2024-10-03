import { API_KEY } from "../../api/constants";
import { authGuard } from "../../utilities/authGuard";

authGuard();

async function fetchSinglePost() {
  const Token = window.localStorage.getItem("token");
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const Id = url.searchParams.get("id");

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts/${Id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch posts");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function displayPost(post) {
  const postsContainer = document.getElementById("postContainer");
  postsContainer.innerHTML = "";

  if (!post) {
    postsContainer.innerHTML = "<p>No posts available.</p>";
    return;
  }

  const postElement = document.createElement("div");
  if (post.media === null) {
    return;
  }

  postElement.innerHTML = `
            <h2>${post.title}</h2>
            <img src="${post.media.url}" alt="${
    post.media.alt
  }" style="max-width: 100%; height: auto;">
            <p>${post.body}</p>
            <small>Posted on: ${new Date(
              post.created
            ).toLocaleDateString()}</small>
            <div>
              <span>Comments: ${post._count.comments}</span>
              <span>Reactions: ${post._count.reactions}</span>
            </div>
            <hr>`;
  postsContainer.appendChild(postElement);
}

fetchSinglePost().then((post) => displayPost(post));
