const currentUrl = window.location.href;
const url = new URL(currentUrl);
const Id = url.searchParams.get("id");

export async function readPost(id) {}

export async function readPosts(limit = 12, page = 1, tag) {}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {}

export async function getUserPosts(username) {
  const response = await fetch(`https://v2.api.noroff.dev/social/posts/${Id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user posts");
  }
  return response.json(); // Assuming the API returns JSON data
}
