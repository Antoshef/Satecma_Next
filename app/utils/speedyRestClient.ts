import { RequestInit } from "next/dist/server/web/spec-extension/request";

const SPEEDY_API_USERNAME = "989476";
const SPEEDY_API_PASSWORD = "233337";
const SPEEDY_API_BASE_URL = "https://api.speedy.bg/v1/";
const LANGUAGE = "EN";

export async function apiRequest(apiURL: string, params = {}) {
  const headers = {
    Authorization:
      "Basic " + btoa(`${SPEEDY_API_USERNAME}:${SPEEDY_API_PASSWORD}`),
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(params),
  };

  try {
    const response = await fetch(`${SPEEDY_API_BASE_URL}${apiURL}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    // Handle error
    if (error.response) {
      console.error(
        "Server responded with a status code that falls out of the range of 2xx:",
        error.response.status
      );
    } else if (error.request) {
      console.error(
        "The request was made but no response was received",
        error.request
      );
    } else {
      console.error("Error setting up the request:", error.message);
    }

    return null;
  }
}
