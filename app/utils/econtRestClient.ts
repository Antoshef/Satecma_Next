const demoEndpoint = "http://demo.econt.com/ee/services";
const demoCredentials = {
  username: "iasp-dev",
  password: "1Asp-dev",
};

const productionEndpoint = "http://ee.econt.com/services";
const productionCredentials = {
  username: process.env.NEXT_PUBLIC_ECONT_USER,
  password: process.env.NEXT_PUBLIC_ECONT_PASS,
};


export class EcontRestClient {
  static async request(method: string, params = {}, timeout = 10000) {
    const endpoint = productionEndpoint;
    const credentials = productionCredentials;

    const url = `${endpoint}/${method.replace(/\/+$/, "")}`; // Trim trailing slashes from method
    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${credentials.username}:${credentials.password}`),
    };

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(params),
      timeout: timeout,
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  }
}
