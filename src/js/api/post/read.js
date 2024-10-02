export async function readPost(id) {}

export async function readPosts(limit = 12, page = 1, tag) {}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {}

export async function getUserPosts(username) {
  const response = await fetch(`https://v2.api.noroff.dev/social/posts/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user posts");
  }
  return response.json(); // Assuming the API returns JSON data
}
