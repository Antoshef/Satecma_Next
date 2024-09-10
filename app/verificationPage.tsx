"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { Modal, Box, Typography } from "@mui/material";

export default function VerifyEmailModal() {
  const { user, isLoading } = useUser();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Open the modal if the user's email is not verified
    if (!isLoading && user && !user.email_verified) {
      setOpen(true);
    }
  }, [isLoading, user]);

  // The modal should remain open until the email is verified
  const handleClose = () => {
    if (user?.email_verified) {
      setOpen(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Modal
      component="div"
      open={open}
      onClose={handleClose}
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
      </Box>
    </Modal>
  );
}
