import api from "../apiRequest";

export const login = async () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
};

export const exchangeToken = async (code: string | null) => {
    try {
        const response = await api.post("/auth/exchange", { code });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const logout = async () => {
    try {
        const response = await api.post("/auth/logout");
        return response.data;
        
    } catch (error) {
        console.error(error);
    }
};