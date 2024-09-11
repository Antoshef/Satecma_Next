export const fetchData = async <T = undefined>(
  url: string,
  init?: RequestInit,
): Promise<{ data: T }> => {
  try {
    if (url.startsWith("/api")) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (!baseUrl) {
        throw new Error("Base URL is not defined in environment variables");
      }
      url = `${baseUrl}${url}`;
    }

    const response = await fetch(url, {
      method: init?.method || "GET",
      headers: init?.headers || {
        "Content-Type": "application/json",
      },
      body: init?.body || undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "Something went wrong";
      throw new Error(errorMessage + ` (Status ${response.status})`);
    }

    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch data: ${
        (error as any).message || (error as any).toString()
      }`,
    );
  }
};
