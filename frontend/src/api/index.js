// Fix 1: Use environment variable instead of hardcoded localhost
// Create a .env file in your frontend folder with:
// REACT_APP_API_URL=http://localhost:7000/api (for dev)
// REACT_APP_API_URL=https://your-backend.com/api (for production)

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:7000/api";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...options,
    });
  } catch (err) {
    // Fix 9: Surface network errors properly instead of swallowing them
    throw new Error("Network error — is the server running?");
  }

  // Fix 6: Handle 401 Unauthorized globally (expired token)
  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
    return;
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}