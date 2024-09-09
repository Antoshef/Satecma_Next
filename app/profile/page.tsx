import { fetchData } from "@/utils/fetchData";
import { Company } from "@/create/invoice/types";
import { Container } from "@mui/material";
import ProfileDetails from "./profileDetails";
import { Suspense } from "react";
import Loading from "@/loading";
import CompanySearch from "./companySearch";

export default async function ProfilePage() {
  const companies = await fetchData<Company>(
    "http://localhost:3000/api/company",
  )
    .then((data) => data.data)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return (
    <Suspense fallback={<Loading />}>
      <Container>
        <CompanySearch />
        {companies && <ProfileDetails companies={companies} />}
      </Container>
    </Suspense>
  );
}
