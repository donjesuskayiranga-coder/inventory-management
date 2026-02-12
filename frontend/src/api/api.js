
const AUTH_URL = "http://localhost:7000/api/auth";
const PRODUCT_URL = "http://localhost:7000/api/products";
export const loginUser = async (email, password) => {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
};

export const registerUser = async (username, email, password) => {
  const response = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  return response.json();
};
export const getProducts = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(PRODUCT_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const createProduct = async (productData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(PRODUCT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  return response.json();
};
