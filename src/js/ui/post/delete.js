import { API_KEY } from "../../api/constants";

export async function onDeletePost(postId) {
  if (!postId) {
    console.error("No post ID provided.");
    return;
  }

  const token = window.localStorage.getItem("token");

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
    alert("Post deleted successfully.");
    window.location.href = "/profile/";
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}
