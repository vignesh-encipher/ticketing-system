import { requestPortal } from "@/util/network";
import Cookies from "js-cookie";

export async function login(credentials: any): Promise<any> {
  const response = await requestPortal("/api/auth/login", { 
    method: "POST",
    body: JSON.stringify(credentials)
  });
  
  // Assuming the API returns a JWT token
  if (response && response.token) {
    Cookies.set("jwt_token", response.token, { expires: 7 }); // 7 days expiration
    localStorage.setItem("token", response.token);
  }
  
  return response;
}

export async function logout(): Promise<any> {
  Cookies.remove("jwt_token");
  localStorage.removeItem("token");
  return { success: true };
}
