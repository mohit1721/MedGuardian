
"use client"; 
export const getAuthorizationHeader = () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.log("No authentication token found.");
      return null;
    }
  
    return {
      Authorization: `Bearer ${token}`,
    };
  };
  