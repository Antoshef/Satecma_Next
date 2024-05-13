export const fetchData = async <T>(url: string, init?: RequestInit) => {
  try {
    const response = await fetch(url, {
      method: init?.method || "GET",
      headers: init?.headers || {
        "Content-Type": "application/json",
      },
      body: init?.body || undefined,
    });

    const data = await response.json();
    console.log(
      "Status Code:",
      response.status,
      "Response OK:",
      response.ok,
      "Data:",
      data
    );

    if (!response.ok) {
      const errorMessage = data.message || "Something went wrong";
      throw new Error(errorMessage + ` (Status ${response.status})`);
    }

    return { ...data, data: data.data } as { data: T };
  } catch (error) {
    throw new Error(
      `Failed to fetch data: ${
        (error as any).message || (error as any).toString()
      }`
    );
  }
};
