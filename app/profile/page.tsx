import { fetchData } from "@/utils/fetchData";
import { Provider } from "@/create/invoice/types";
import { Container } from "@mui/material";
import ProfileDetails from "./profileDetails";
import { Suspense } from "react";
import Loading from "@/loading";

export default async function ProfilePage() {
  const provider = await fetchData<Provider>(
    "http://localhost:3000/api/profile/get",
  )
    .then((data) => data.data)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return (
    <Suspense fallback={<Loading />}>
      <Container>
        {provider && <ProfileDetails provider={provider} />}
      </Container>
    </Suspense>
  );
}
