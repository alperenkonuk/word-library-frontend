const apiUrl = process.env.REACT_APP_API_URL;


async function sendRequest(endpoint, method, urlParams = "", body) {
  let accessToken = localStorage.getItem("accessToken");
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      ...body
    })
  }

  let response = await fetch(`${apiUrl}${endpoint}`, {
    ...options,
  });

  if (response.status === 401) {
    accessToken = await refreshAccessToken();
    if (!accessToken) return; // user must log in again

    response = await fetch(`${apiUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });

  }

  return response;

}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    const response = await fetch(`${apiUrl}/auth/refreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify({refreshToken})
      }
    })


    const data = await response.json();
    const {accessToken, status} = data;

    if(status === 401 || !response.ok) throw new Error("Refresh failed.")

    localStorage.setItem("accessToken", accessToken);
    return accessToken;

  } catch (e) {
    console.error("Refresh Token Expired, logging out");
    localStorage.clear();
    window.location.href = "/login"; // Redirect to log in
  }
}