export const fetchJson = async <T>(
  url: string,
  req?: any
): Promise<{ data: T }> => {
  const response = await fetch(url, req);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return response.json() as Promise<{ data: T }>;
};
