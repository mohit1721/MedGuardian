
"use client"; 
export const getAuthorizationHeader = () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No authentication token found.");
      return null;
    }
  
    return {
      Authorization: `Bearer ${token}`,
    };
  };
  