"use client";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { DashedLineIcon } from "./dashedLineIcon"; // Import the DashedLineIcon component

const items = [
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
];

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

  return (
    <Paper
      sx={{
        my: 12,
        borderRadius: 0,
        boxShadow: 0,
      }}
    >
      <Grid
        container
        px={16}
        sx={{
          minHeight: "50vh",
        }}
      >
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
        <Grid
          item
          xs={12}
          md={6}
          pl={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <List>
            {items.map((item, index) => (
              <ListItem
                key={index}
                ref={(el) => {
                  listItemRefs.current[index] = el;
                  return undefined;
                }}
                sx={{
                  alignItems: "flex-start",
                  gap: 2,
                  py: 0,
                }}
              >
                {/* DashedLineIcon with the isActive prop */}
                <DashedLineIcon
                  disableLine={index >= items.length - 1}
                  isActive={activeIndices.includes(index)}
                />
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
