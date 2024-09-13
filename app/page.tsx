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
        maxWidth="xl"
        sx={{ p: 6, bgcolor: "background.default", minHeight: "100vh" }}
      >
        <Paper
          sx={{
            my: 12,
            p: 8,
            borderRadius: 4,
            boxShadow: 6,
            background: "linear-gradient(135deg, #f0f4f8, #ffffff)",
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
            }}
          >
            За нашето приложение
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{
              mt: 6,
              fontSize: "1.25rem",
              color: "text.secondary",
              textAlign: "center",
              lineHeight: 1.75,
            }}
          >
            Нашето приложение е създадено, за да помогне на бизнеса да управлява
            своите операции ефективно. С функции като създаване на оферти,
            фактуриране, съхранение на продукти и управление на клиентска база
            данни, можете да се справите с всички нужди на вашия бизнес на едно
            място.
          </Typography>
        </Paper>
        <HeroBanner />

        <ScrollableText />

        <Paper
          sx={{
            my: 12,
            p: 8,
            borderRadius: 4,
            boxShadow: 6,
            background: "linear-gradient(135deg, #f0f4f8, #ffffff)",
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
            }}
          >
            Започнете сега
          </Typography>

          <Typography
            variant="body1"
            component="p"
            sx={{
              mt: 6,
              fontSize: "1.25rem",
              color: "text.secondary",
              textAlign: "center",
              lineHeight: 1.75,
            }}
          >
            Готови ли сте да оптимизирате бизнес операциите си? Разгледайте
            различните секции на нашето приложение:
          </Typography>

          <Box component="nav" sx={{ mt: 8 }}>
            <List sx={{ listStyle: "none", p: 0 }}>
              {[
                { href: "/create/offer", text: "Оферти" },
                { href: "/create/invoice", text: "Фактури" },
                { href: "/store", text: "Продуктово Съхранение" },
                { href: "/clients", text: "Клиенти" },
              ].map((item, index) => (
                <ListItem key={index} sx={{ mb: 3 }}>
                  <Link href={item.href} passHref>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        backgroundColor: "#3b82f6",
                        backgroundImage:
                          "linear-gradient(135deg, #3b82f6, #1e40af)",
                        color: "white",
                        boxShadow: 4,
                        transition:
                          "transform 0.4s, background 0.3s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.07)",
                          backgroundImage:
                            "linear-gradient(135deg, #1e40af, #3b82f6)",
                        },
                      }}
                    >
                      <Typography
                        variant="body1"
                        component="span"
                        sx={{
                          fontWeight: "medium",
                          fontSize: "1.1rem",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {item.text}
                      </Typography>
                    </Button>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>

        <Paper
          sx={{
            my: 12,
            p: 8,
            borderRadius: 4,
            boxShadow: 6,
            background: "linear-gradient(135deg, #f0f4f8, #ffffff)",
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
