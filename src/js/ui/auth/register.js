export async function onRegister(event) {
  event.preventDefault(); // Prevent the default form submission

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;

  const confirmPasswordInput = document.getElementById("confirmPassword");
  const confirmPasswordValue = confirmPasswordInput.value;

  // Check if passwords match
  if (password !== confirmPasswordValue) {
    alert("Oops, the passwords don't match!");
    return;
  }

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
    redirect: "follow",
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

    const result = await response.json(); // Wait for JSON response
    window.alert("Registration was successful");
    window.location.href = "/account/login.html"; // Redirect after successful registration
  } catch (error) {
    console.error(error);
    window.alert("Oops, there was an error: " + error.message);
  }
}

// Event listener for the register button
const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", onRegister);
