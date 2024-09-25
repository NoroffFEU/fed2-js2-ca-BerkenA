const logButton = document.getElementById("loginButton");
const registBtn = document.getElementById("registerBtn");

export async function onLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please fill in both the email and password fields.");
    return;
  }

  const postData = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    const token = data.data.accessToken;
    localStorage.setItem("token", token);

    window.location.href = "/post/index.html";
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed: " + error.message);
  }
}

document.getElementById("password");
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    onLogin(event);
  }
});

logButton.addEventListener("click", function (event) {
  onLogin(event);
});

registBtn.onclick = function () {
  window.location.href = `/auth/register/index.html`;
};
