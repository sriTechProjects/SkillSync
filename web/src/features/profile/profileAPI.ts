import apiClient from "@/lib/apiClient";

export async function complete_profile(userData: FormData){
    const response = await apiClient.put("/users/me",userData);
    return response;
}