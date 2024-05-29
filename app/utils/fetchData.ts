export const fetchData = async <T = undefined>(
  url: string,
  init?: RequestInit,
): Promise<{ data: T }> => {
  try {
    const response = await fetch(url, {
      method: init?.method || "GET",
      headers: init?.headers || {
        "Content-Type": "application/json",
      },
      body: init?.body || undefined,
      cache: "default",
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
