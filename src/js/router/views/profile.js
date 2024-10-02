import { authGuard } from "../../utilities/authGuard";
import { getUserPosts } from "../../api/post/read.js";

authGuard();

async function displayUserPosts() {
  try {
    const username = localStorage.getItem("username");
    const posts = await getUserPosts(username);

    const postsContainer = document.querySelector("#user-posts");
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.textContent = post.title;
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error fetching user posts", error);
  }
}

displayUserPosts();
