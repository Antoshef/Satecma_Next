"use client";

import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  ListItemText,
  Grid,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

export const ScrollableText = () => {
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const middleOfScreen = window.innerHeight / 2;
      const newActiveIndices: number[] = [];

      listItemRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          // Check if the item's top is above the middle of the screen
          if (rect.top < middleOfScreen) {
            newActiveIndices.push(index);
          }
        }
      });

      setActiveIndices(newActiveIndices);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // SVG Email Icon Component with two variations
  const EmailIcon = ({ isActive }: { isActive: boolean }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 100 100"
      id="emailIcon"
    >
      {/* Outer Circle */}
      <circle
        cx="50"
        cy="50"
        r="48"
        stroke={isActive ? "darkgreen" : "black"}
        strokeWidth="2"
        fill="none"
        id="outerCircle"
      />

      {/* Inner Circle (changes when active) */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill={isActive ? "darkgreen" : "none"}
        id="innerCircle"
      />

      {/* Email Icon (Envelope) */}
      <path
        d="M30 35 L50 50 L70 35 V65 H30 Z M30 35 H70 L50 50 Z"
        stroke={isActive ? "white" : "black"}
        strokeWidth="2"
        fill="none"
        id="envelope"
      />
    </svg>
  );

  return (
    <Paper
      sx={{
        my: 12,
        p: 8,
        borderRadius: 4,
        boxShadow: 6,
        background: "linear-gradient(135deg, #f0f4f8, #ffffff)",
      }}
    >
      <Grid container spacing={8}>
        {/* Left Column: Large Title */}
        <Grid item xs={12} md={6}>
          <div
            style={{
              position: "sticky",
              top: "40%",
              zIndex: 1,
              transform: "translateY(-10%)",
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                letterSpacing: "0.05em",
              }}
            >
              Процес на управление на проекти
            </Typography>
          </div>
        </Grid>

        {/* Right Column: Icons with Titles/Subtitles */}
        <Grid item xs={12} md={6}>
          <List>
            {[
              {
                primary: "Регистрация на екип",
                secondary: "Добавяне на членове към проекта",
              },
              {
                primary: "Подписване на договор",
                secondary: "Използвайте готови или персонализирани договори",
              },
              {
                primary: "Изпращане на фактура",
                secondary: "Екипът изпраща фактури за одобрение",
              },
              {
                primary: "Одобряване на фактура",
                secondary: "Извършете плащане по фактурата",
              },
              {
                primary: "Получаване на плащане",
                secondary: "Екипът получава заплащането в избраната валута",
              },
            ].map((item, index) => (
              <ListItem
                key={index}
                ref={(el) => {
                  listItemRefs.current[index] = el;
                  return undefined;
                }}
              >
                <ListItemIcon>
                  <IconButton>
                    {/* Use the inline SVG icon */}
                    <EmailIcon isActive={activeIndices.includes(index)} />
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={item.primary}
                  secondary={item.secondary}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};
