export function onLogout() {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  window.location.href = "/auth/login/";
  alert("You have been logged out");
}
