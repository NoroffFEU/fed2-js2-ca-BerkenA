const button = document.getElementById("button");

export async function onRegister(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    name: name,
    email: email,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/auth/register",
      requestOptions
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.errors[0].message);
    }
    window.alert("Registration was successful");
    window.location.href = "";
  } catch (error) {
    console.error(error);
    window.alert("Oops, there was an error: " + error.message);
  }
}

button.onclick = onRegister;
