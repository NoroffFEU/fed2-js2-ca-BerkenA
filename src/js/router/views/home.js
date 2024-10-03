import { API_KEY } from "../../api/constants";
import { authGuard } from "../../utilities/authGuard";

authGuard();

async function fetchAllPosts() {
  const getToken = window.localStorage.getItem("token");

  try {
    const response = await fetch("https://v2.api.noroff.dev/social/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken}`,
        "X-Noroff-API-Key": API_KEY,
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

function displayPosts(posts) {
  const postsContainer = document.getElementById("postsContainer");
  postsContainer.innerHTML = "";

  if (!posts || posts.length === 0) {
    postsContainer.innerHTML = "<p>No posts available.</p>";
    return;
  }

  posts.forEach((post) => {
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
    postElement.addEventListener("click", () => goToPost(post.id));
  });
}

function goToPost(id) {
  window.location.href = `/post/?id=${id}`;
}

fetchAllPosts().then((posts) => displayPosts(posts));
