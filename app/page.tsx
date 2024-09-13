import Link from "next/link";
import VerifyEmailModal from "./verificationPage";
import { getSession } from "@auth0/nextjs-auth0";
import { User } from "./api/auth/[auth0]/types";
import { fetchData } from "./utils/fetchData";
import { SEOAccordion } from "./components/seoAccordion";
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
} from "@mui/material";
import { Header } from "./components/homePage/header";
import { ScrollableText } from "./components/homePage/scrollableText";
import { HeroBanner } from "./components/homePage/heroBanner";
import { Intro } from "./components/homePage/intro";
import { StartNow } from "./components/homePage/startNow";

export default async function HomePage() {
  const session = await getSession();

  let user: User | null = null;
  if (session) {
    const { accessToken } = session;

    try {
      const response = await fetch(
        `https://${process.env.AUTH0_DOMAIN}/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.ok) {
        user = await response.json();

        if (user?.email_verified) {
          // Check if user already exists
          const userExistsResponse = await fetchData(
            `/api/profile?sub=${user.sub}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (!userExistsResponse.data) {
            // User does not exist, proceed with POST request
            await fetchData("/api/profile", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user info or checking existence:", error);
    }
  }

  return (
    <Container
      maxWidth={false}
      sx={{ bgcolor: "background.default", minHeight: "100vh" }}
      disableGutters
    >
      {user && user.email_verified && <VerifyEmailModal user={user} />}

      {/* Header section with full-width image */}
      <Header />

      <Container
        maxWidth={false}
        sx={{ p: 6, bgcolor: "background.default", minHeight: "100vh" }}
      >
        <Intro />
        <HeroBanner />
        <ScrollableText />
        <StartNow />

        <Paper
          sx={{
            my: 12,
            p: 8,
            borderRadius: 4,
            boxShadow: 6,
            background: "linear-gradient(135deg, #f0f4f8, #ffffff)",
            maxWidth: "1440px",
            mx: "auto",
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              letterSpacing: "0.05em",
              textAlign: "center",
              mb: 6,
            }}
          >
            Защо да изберете нашето приложение?
          </Typography>
          <SEOAccordion />
        </Paper>
      </Container>
    </Container>
  );
}
