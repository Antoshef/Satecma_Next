"use client";

import { Modal, Box, Typography, Button } from "@mui/material";
import { IUserProfile } from "./page";
import { useState } from "react";

export default function VerifyEmailModal({ user }: { user: IUserProfile }) {
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
        setMessage("Verification email sent. Please check your inbox.");
      } else {
        setMessage(data.message || "Error sending verification email.");
      }
    } catch (error) {
      setMessage("Error sending verification email.");
    } finally {
      setLoading(false);
    }
  };

  console.log(user, "USER");

  return (
    <Modal
      component="div"
      open={user.email_verified}
      aria-labelledby="verify-email-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          outline: "none",
        }}
      >
        <Typography variant="h6" id="verify-email-modal">
          Please Verify Your Email
        </Typography>
        <Typography variant="body1" mt={2}>
          Hi {user?.name}, please verify your email to proceed. Check your inbox
          for a verification link.
        </Typography>
        <Typography variant="body2" mt={2}>
          Once you verify your email, this message will disappear and you can
          continue using the app.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleResendVerification}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Sending..." : "Resend Verification Email"}
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
