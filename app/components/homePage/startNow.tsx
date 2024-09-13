import { Paper, Typography, Box, List, ListItem, Button } from "@mui/material";
import Link from "next/link";

export const StartNow = () => {
  return (
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
                    transition: "transform 0.4s, background 0.3s ease-in-out",
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
  );
};
