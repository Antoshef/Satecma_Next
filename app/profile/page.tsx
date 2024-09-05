import { fetchData } from "@/utils/fetchData";
import { Provider } from "@/create/invoice/types";
import { getSession } from "@/utils/getSession";

export default async function ProfilePage() {
  const { user } = await getSession();

  const provider = await fetchData<Provider>(
    "http://localhost:3000/api/profile/get",
  )
    .then((data) => data.data)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return (
    <div className="max-w-sm mx-auto mt-5 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-center">
          <img
            className="w-14 h-14 rounded-full"
            src={user.picture || undefined}
            alt={user.name}
          />
        </div>
        <h2 className="mt-4 text-center text-2xl font-bold">{user.name}</h2>
        {provider && (
          <div className="mt-4 text-center text-gray-600">
            <p>Company: {provider.name}</p>
            <p>EIK: {provider.eik}</p>
            <p>VAT: {provider.VAT}</p>
            <p>City: {provider.city}</p>
            <p>Address: {provider.address}</p>
            <p>Director: {provider.director}</p>
            <p>Phone: {provider.phone}</p>
            <p>
              Bank Details: {provider.bankDetails.name},{" "}
              {provider.bankDetails.iban}, {provider.bankDetails.swift}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
