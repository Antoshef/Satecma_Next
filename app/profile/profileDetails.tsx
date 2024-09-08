"use client";

import React, { useState } from "react";
import { Provider } from "@/create/invoice/types";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Container,
} from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";

interface ProfileDetailsProps {
  provider: Provider;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ provider }) => {
  const { user, isLoading } = useUser();
  const [formData, setFormData] = useState<Provider>(provider);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/profile/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      console.error("Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <Container className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Paper elevation={3} className="p-6 max-w-4xl mx-auto mt-5">
      <Grid container spacing={4}>
        {/* User Data Column */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            User Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                <strong>Profile Image</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Avatar
                src={user?.picture || ""}
                alt={user?.name || ""}
                sx={{ width: 100, height: 100 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                <strong>Name:</strong> {user?.name || ""}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                <strong>Email:</strong> {user?.email || ""}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                <strong>Nickname:</strong> {user?.nickname || ""}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                <strong>Email Verified:</strong>{" "}
                {user?.email_verified ? "Yes" : "No"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Provider Data Column */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Company Information
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="EIK"
                  name="eik"
                  value={formData.eik}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="VAT"
                  name="VAT"
                  value={formData.VAT}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Director"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  name="bankDetails.name"
                  value={formData.bankDetails.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="IBAN"
                  name="bankDetails.iban"
                  value={formData.bankDetails.iban}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="SWIFT"
                  name="bankDetails.swift"
                  value={formData.bankDetails.swift}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileDetails;
