import { fetchData } from "@/utils/fetchData";
import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { Provider } from "@/create/invoice/types";
import { cookies } from "next/headers";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const userSession = cookieStore.get("userSession");

  if (!userSession) {
    return <p>Not Logged in. Please log in to view this page</p>;
  }

  const provider = await fetchData<Provider>(
    "http://localhost:3000/api/profile/get",
  )
    .then((data) => data.data)
    .catch((error) => {
      console.error(error);
      return null;
    });

  const user = JSON.parse(userSession.value);

  return (
    <Card sx={{ maxWidth: 345, margin: "auto", mt: 5 }}>
      <CardContent>
        <Avatar
          alt={user.name}
          src={user.picture || undefined}
          sx={{ width: 56, height: 56, margin: "auto" }}
        />
        <Typography variant="h5" component="div" align="center" mt={2}>
          {user.name}
        </Typography>
        {provider && (
          <>
            <Typography variant="body2" color="text.secondary" align="center">
              Company: {provider.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              EIK: {provider.eik}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              VAT: {provider.VAT}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              City: {provider.city}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Address: {provider.address}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Director: {provider.director}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Phone: {provider.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Bank Details: {provider.bankDetails.name},{" "}
              {provider.bankDetails.iban}, {provider.bankDetails.swift}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}
