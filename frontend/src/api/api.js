import axios from "axios";

const API_URL = "http://localhost:7000/api";
export const loginUser = async (email, password) => {
   try { const response = await axios.post(`${API_URL}/auth/login`, {email, password});
    return response.data;
} catch (error) {
    console.error("Login error:", error.response?.data?.message || error.message);
    throw error;
}
};


export const getAdminData = async (token) => {
    try {const response = await axios.get(`${API_URL}/admin-data`, {
        headers: {Authorization: `Bearer ${token}`}
    
    });

    return response.data;
    } catch (error) {
        console.error("Admin data error:", error.response?.data?.message || error.message);
        throw error;
    
    }
};

export const registerUser = async (username, email, password) => {
    try{
        const response = await axios.post(`${API_URL}/auth/register`, { username, email, password});
     return response.data; 
    } catch (error) {
        console.error("Register error:", error.response?.data?.message || error.message);
        throw error;
    }
};


export const getProducts = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/products`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return response.data;
    } catch (error) {
        console.error("Get products error:", error.response?.data?.message || error.message);
        throw error;
    }
        };

        export const createProduct = async (productData, token) => {
            try {
                const response = await axios.post(`${API_URL}/products`, productData, {
                    headers: {Authorization: `Bearer ${token}`}
                });
                return response.data;
            } catch (error) {
                console.error("Create product error:", error.response?.data?.message || error.message);
                throw error;
            }
        };