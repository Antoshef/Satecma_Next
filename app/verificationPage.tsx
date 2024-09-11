"use client";

import { Modal, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { User } from "./api/auth/[auth0]/types";

export default function VerifyEmailModal({ user }: { user: User }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResendVerification = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "Имейлът за потвърждение е изпратен. Моля, проверете пощата си.",
        );
      } else {
        setMessage(
          data.message || "Грешка при изпращане на имейл за потвърждение.",
        );
      }
    } catch (error) {
      setMessage("Грешка при изпращане на имейл за потвърждение.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      component="div"
      open={!user.email_verified}
      aria-labelledby="verify-email-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "calc(50% + 16rem)",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          outline: "none",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" align="center" id="verify-email-modal">
          Моля, потвърдете имейла си
        </Typography>
        <Typography variant="body1" mt={2}>
          Здравейте {user?.name}, моля, потвърдете имейла си, за да продължите.
          Проверете пощата си за връзка за потвърждение.
        </Typography>
        <Typography variant="body2" mt={2}>
          След като потвърдите имейла си, това съобщение ще изчезне и ще можете
          да продължите да използвате приложението.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleResendVerification}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Изпращане..." : "Изпрати имейл за потвърждение"}
        </Button>
        {message && (
          <Typography variant="body2" mt={2} color="error">
            {message}
          </Typography>
        )}
      </Box>
    </Modal>
  );
}
