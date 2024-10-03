import { API_KEY } from "../../api/constants";
import { onLogout } from "../../ui/auth/logout";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const logBtn = document.getElementById("logoutButton");
const pageIndicator = document.getElementById("pageIndicator");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
let blogListData = [];
let currentPage = 1;
const postsPerPage = 12;

// Logout event listener
logBtn.addEventListener("click", onLogout);

// Fetch posts from the API
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

// Display the posts for the current page
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

// Go to post detail page
function goToPost(id) {
  window.location.href = `/post/?id=${id}`;
}

// Update pagination buttons and page indicator
function updatePagination() {
  pageIndicator.textContent = `Page ${currentPage} of ${Math.ceil(
    blogListData.length / postsPerPage
  )}`;
  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled =
    currentPage === Math.ceil(blogListData.length / postsPerPage);
}

// Load posts for the current page
function loadCurrentPage() {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = blogListData.slice(startIndex, endIndex);
  displayPosts(currentPosts);
  updatePagination();
  window.scrollTo(0, 0);
}

// Next page button click handler
nextPageButton.addEventListener("click", () => {
  currentPage++;
  loadCurrentPage();
});

// Previous page button click handler
prevPageButton.addEventListener("click", () => {
  currentPage--;
  loadCurrentPage();
});

// Initial fetch and load
fetchAllPosts().then((posts) => {
  blogListData = posts || [];
  loadCurrentPage(); // Load the first page
});
