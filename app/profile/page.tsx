import { fetchData } from "@/utils/fetchData";
import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { Provider } from "@/create/invoice/types";
import { user } from "@/components/navbar";

export default async function ProfilePage() {
  const provider = await fetchData<Provider>(
    "http://localhost:3000/api/profile/get",
  )
    .then((data) => data.data)
    .catch((error) => {
      console.error(error);
      return null;
    });

  console.log(provider, "PROVIDER");

  return (
    provider && (
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
        </CardContent>
      </Card>
    )
  );
}
