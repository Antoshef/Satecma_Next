"use client";

import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
  ListItemButton,
} from "@mui/material";

export const HeroBanner = () => {
  // State for dynamic text content on the right side
  const [selectedContent, setSelectedContent] = useState(
    "Default text for the right side.",
  );

  // Array to hold the clickable options and their respective content
  const contentOptions = [
    {
      label: "Option 1",
      content: "This is the content for option 1. Explains feature 1.",
    },
    {
      label: "Option 2",
      content: "This is the content for option 2. Explains feature 2.",
    },
    {
      label: "Option 3",
      content: "This is the content for option 3. Explains feature 3.",
    },
    {
      label: "Option 4",
      content: "This is the content for option 4. Explains feature 4.",
    },
    {
      label: "Option 5",
      content: "This is the content for option 5. Explains feature 5.",
    },
  ];

  return (
    <Paper
      sx={{
        my: 12,
        borderRadius: 4,
        boxShadow: 6,
        background: "linear-gradient(135deg, #f0f4f8, #ffffff)",
      }}
    >
      <Grid container spacing={0}>
        {/* Left Side */}
        <Grid item xs={12} md={6} sx={{ p: 4 }}>
          {/* Title */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              letterSpacing: "0.05em",
              mb: 2,
            }}
          >
            Управление на Проекти
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="subtitle1"
            sx={{ color: "text.secondary", mb: 4 }}
          >
            Управлявайте вашите проекти ефективно и лесно
          </Typography>

          {/* Price */}
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}
          >
            $29 / месец
          </Typography>

          {/* CTA Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              mb: 4,
              p: 2,
              borderRadius: 3,
              backgroundColor: "#3b82f6",
              backgroundImage: "linear-gradient(135deg, #3b82f6, #1e40af)",
              color: "white",
              boxShadow: 4,
              transition: "transform 0.4s, background 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.07)",
                backgroundImage: "linear-gradient(135deg, #1e40af, #3b82f6)",
              },
            }}
          >
            Запазете демо
          </Button>

          {/* List of clickable options */}
          <List sx={{ listStyle: "none", p: 0 }}>
            {contentOptions.map((option, index) => (
              <ListItemButton
                key={index}
                onClick={() => setSelectedContent(option.content)}
              >
                <ListItemText primary={option.label} />
              </ListItemButton>
            ))}
          </List>
        </Grid>

        {/* Right Side */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            background: "#0d1328",
            color: "white",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          {/* Example image - replace with actual image */}
          <Box
            component="img"
            src="/path-to-image.png"
            alt="Project Management Image"
            sx={{ mb: 3, width: "100px", height: "auto" }}
          />

          {/* Dynamic Text */}
          <Typography variant="body1" textAlign="center">
            {selectedContent}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
