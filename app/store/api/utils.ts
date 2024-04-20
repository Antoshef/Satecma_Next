export const fetchStorageData = async () => {
  console.log("Fetching storage data");
  const response = await fetch("/get-product-storage");
  return await response.json();
};
