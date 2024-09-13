import { Paper, Typography } from "@mui/material";

export const Intro = () => {
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
  );
};
