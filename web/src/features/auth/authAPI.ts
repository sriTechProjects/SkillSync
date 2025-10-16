import apiClient from "@/lib/apiClient";

export async function loginUser(credentials: {email:string, password: string}){
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
}

export async function registerUser(credentials: {email:string, password: string}){
    const response = await apiClient.post("/auth/register", credentials);
    return response.data;
}